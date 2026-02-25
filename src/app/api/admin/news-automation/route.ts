export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Simple authentication middleware
function authenticate(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
  
  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'Nivaran2024!Secure';
  
  return username === validUsername && password === validPassword;
}

// GET: Get automation status and statistics
export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { 
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Portal"' }
      }
    );
  }
  
  try {
    const repoRoot = process.cwd();
    const statusFile = path.join(repoRoot, 'logs', 'automation', 'status.json');
    const envFile = path.join(repoRoot, '.env.automation');
    
    // Read current status
    let status = {
      status: 'unknown',
      message: 'No status available',
      timestamp: new Date().toISOString(),
    };
    
    try {
      const statusContent = await fs.readFile(statusFile, 'utf-8');
      status = JSON.parse(statusContent);
    } catch {
      // Status file doesn't exist yet
    }
    
    // Check if automation is enabled
    let enabled = true;
    try {
      const envContent = await fs.readFile(envFile, 'utf-8');
      const match = envContent.match(/NEWS_AUTOMATION_ENABLED=(\w+)/);
      enabled = match ? match[1] === 'true' : true;
    } catch {
      // Env file doesn't exist
    }
    
    // Get cron status
    let cronInstalled = false;
    try {
      const { stdout } = await execAsync('crontab -l 2>/dev/null || echo ""');
      cronInstalled = stdout.includes('run_automation.sh');
    } catch {
      // Cron not available
    }
    
    // Get recent articles count
    const blogsDir = path.join(repoRoot, 'src', 'blogs', 'global');
    let recentArticles = 0;
    let totalArticles = 0;
    
    try {
      const files = await fs.readdir(blogsDir);
      const mdxFiles = files.filter(f => f.endsWith('.mdx'));
      totalArticles = mdxFiles.length;
      
      // Count articles from last 24 hours
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      for (const file of mdxFiles) {
        const stats = await fs.stat(path.join(blogsDir, file));
        if (stats.mtimeMs > oneDayAgo) {
          recentArticles++;
        }
      }
    } catch {
      // Directory might not exist
    }
    
    return NextResponse.json({
      ...status,
      enabled,
      cronInstalled,
      statistics: {
        recentArticles24h: recentArticles,
        totalArticles,
      },
    });
  } catch (error) {
    console.error('Error getting status:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}

// POST: Control automation (enable/disable, trigger manually)
export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { 
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Portal"' }
      }
    );
  }
  
  try {
    const body = await request.json();
    const { action } = body;
    
    const repoRoot = process.cwd();
    const scriptsDir = path.join(repoRoot, 'scripts');
    const envFile = path.join(repoRoot, '.env.automation');
    
    switch (action) {
      case 'enable':
        // Update .env.automation to enable
        try {
          let envContent = await fs.readFile(envFile, 'utf-8');
          envContent = envContent.replace(
            /NEWS_AUTOMATION_ENABLED=\w+/,
            'NEWS_AUTOMATION_ENABLED=true'
          );
          await fs.writeFile(envFile, envContent);
          return NextResponse.json({ success: true, message: 'Automation enabled' });
        } catch {
          return NextResponse.json(
            { error: 'Failed to enable automation' },
            { status: 500 }
          );
        }
      
      case 'disable':
        // Update .env.automation to disable
        try {
          let envContent = await fs.readFile(envFile, 'utf-8');
          envContent = envContent.replace(
            /NEWS_AUTOMATION_ENABLED=\w+/,
            'NEWS_AUTOMATION_ENABLED=false'
          );
          await fs.writeFile(envFile, envContent);
          return NextResponse.json({ success: true, message: 'Automation disabled' });
        } catch {
          return NextResponse.json(
            { error: 'Failed to disable automation' },
            { status: 500 }
          );
        }
      
      case 'trigger':
        // Manually trigger automation
        try {
          // Run in background
          exec(`cd ${repoRoot} && ${scriptsDir}/run_automation.sh >> ${repoRoot}/logs/automation/manual.log 2>&1 &`);
          return NextResponse.json({ 
            success: true, 
            message: 'Automation triggered manually. Check logs for progress.' 
          });
        } catch {
          return NextResponse.json(
            { error: 'Failed to trigger automation' },
            { status: 500 }
          );
        }
      
      case 'install_cron':
        // Install cron job
        try {
          const { stdout, stderr } = await execAsync(`bash ${scriptsDir}/setup_cron.sh`);
          return NextResponse.json({ 
            success: true, 
            message: 'Cron job installed successfully',
            output: stdout + stderr 
          });
        } catch {
          return NextResponse.json(
            { error: 'Failed to install cron job' },
            { status: 500 }
          );
        }
      
      case 'remove_cron':
        // Remove cron job
        try {
          const { stdout, stderr } = await execAsync(`bash ${scriptsDir}/remove_cron.sh`);
          return NextResponse.json({ 
            success: true, 
            message: 'Cron job removed successfully',
            output: stdout + stderr 
          });
        } catch {
          return NextResponse.json(
            { error: 'Failed to remove cron job' },
            { status: 500 }
          );
        }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing action:', error);
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}

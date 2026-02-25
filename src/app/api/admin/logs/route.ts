export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

// GET: Fetch logs
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
    const { searchParams } = new URL(request.url);
    const logType = searchParams.get('type') || 'latest';
    const limit = parseInt(searchParams.get('limit') || '1000');
    
    const repoRoot = process.cwd();
    const logDir = path.join(repoRoot, 'logs', 'automation');
    
    let logFile: string;
    
    if (logType === 'latest') {
      logFile = path.join(logDir, 'latest.log');
    } else if (logType === 'cron') {
      logFile = path.join(logDir, 'cron.log');
    } else {
      logFile = path.join(logDir, `${logType}.log`);
    }
    
    try {
      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.split('\n');
      const limitedLines = lines.slice(-limit).join('\n');
      
      return NextResponse.json({
        success: true,
        content: limitedLines,
        totalLines: lines.length,
        file: path.basename(logFile),
      });
    } catch (error) {
      return NextResponse.json({
        success: true,
        content: 'No logs available yet.',
        totalLines: 0,
        file: path.basename(logFile),
      });
    }
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}

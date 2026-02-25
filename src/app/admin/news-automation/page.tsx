'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Play, Pause, Terminal, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';

interface AutomationStatus {
  status: string;
  message: string;
  timestamp: string;
  enabled: boolean;
  cronInstalled: boolean;
  statistics: {
    recentArticles24h: number;
    totalArticles: number;
  };
}

export default function NewsAutomationAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<AutomationStatus | null>(null);
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const authHeader = username && password 
    ? `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    : '';

  const fetchStatus = useCallback(async () => {
    if (!authHeader) return;
    
    try {
      const response = await fetch('/api/admin/news-automation', {
        headers: {
          'Authorization': authHeader,
        },
      });
      
      if (response.status === 401) {
        setAuthenticated(false);
        setMessage('Authentication failed');
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }, [authHeader]);

  const fetchLogs = useCallback(async () => {
    if (!authHeader) return;
    
    try {
      const response = await fetch('/api/admin/logs?type=latest&limit=500', {
        headers: {
          'Authorization': authHeader,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLogs(data.content);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }, [authHeader]);

  useEffect(() => {
    if (authenticated) {
      fetchStatus();
      fetchLogs();
      
      if (autoRefresh) {
        const interval = setInterval(() => {
          fetchStatus();
          fetchLogs();
        }, 10000); // Refresh every 10 seconds
        
        return () => clearInterval(interval);
      }
    }
  }, [authenticated, autoRefresh, fetchStatus, fetchLogs]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchStatus().finally(() => setLoading(false));
  };

  const performAction = async (action: string) => {
    setActionLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin/news-automation', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || 'Action completed successfully');
        await fetchStatus();
      } else {
        setMessage(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">News Automation Admin</h1>
            <p className="text-sm text-gray-600 mt-2">Enter credentials to access</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
            
            {message && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'running':
        return <Activity className="w-5 h-5 animate-pulse" />;
      case 'failed':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">News Automation Control</h1>
              <p className="text-sm text-gray-600 mt-1">Manage hourly global news automation</p>
            </div>
            <button
              onClick={() => {
                setAuthenticated(false);
                setUsername('');
                setPassword('');
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-blue-800">
            {message}
          </div>
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Current Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Current Status</h3>
              {status && getStatusIcon(status.status)}
            </div>
            {status && (
              <div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status.status)}`}>
                  {status.status.toUpperCase()}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(status.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Statistics</h3>
            {status && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last 24h:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {status.statistics.recentArticles24h}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {status.statistics.totalArticles}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">System</h3>
            {status && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Automation:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${status.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cron Job:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${status.cronInstalled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {status.cronInstalled ? 'Installed' : 'Not Installed'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Controls</h3>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              Auto-refresh
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => performAction('trigger')}
              disabled={actionLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Run Now</span>
            </button>

            <button
              onClick={() => performAction(status?.enabled ? 'disable' : 'enable')}
              disabled={actionLoading}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                status?.enabled 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {status?.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">{status?.enabled ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => performAction(status?.cronInstalled ? 'remove_cron' : 'install_cron')}
              disabled={actionLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {status?.cronInstalled ? 'Remove Cron' : 'Install Cron'}
              </span>
            </button>

            <button
              onClick={() => {
                fetchStatus();
                fetchLogs();
              }}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Logs</h3>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
              {logs || 'No logs available yet...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

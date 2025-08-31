import React, { useState, useEffect } from 'react';
import { 
  Server, Globe, Database, Shield, Activity, 
  CheckCircle, AlertTriangle, XCircle, RefreshCw 
} from 'lucide-react';

interface SystemService {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  responseTime: number;
  uptime: number;
  lastChecked: string;
  icon: React.ElementType;
}

export function SystemStatus() {
  const [services, setServices] = useState<SystemService[]>([
    {
      id: '1',
      name: 'Main Server',
      status: 'online',
      responseTime: 45,
      uptime: 99.9,
      lastChecked: new Date().toISOString(),
      icon: Server
    },
    {
      id: '2',
      name: 'Domain Service',
      status: 'online',
      responseTime: 32,
      uptime: 99.8,
      lastChecked: new Date().toISOString(),
      icon: Globe
    },
    {
      id: '3',
      name: 'Database',
      status: 'warning',
      responseTime: 120,
      uptime: 99.5,
      lastChecked: new Date().toISOString(),
      icon: Database
    },
    {
      id: '4',
      name: 'Security Service',
      status: 'online',
      responseTime: 28,
      uptime: 100,
      lastChecked: new Date().toISOString(),
      icon: Shield
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshStatus = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setServices(prev => prev.map(service => ({
      ...service,
      responseTime: Math.floor(Math.random() * 100) + 20,
      lastChecked: new Date().toISOString(),
      status: Math.random() > 0.8 ? 'warning' : 'online'
    })));
    
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'border-emerald-500/30 bg-emerald-500/10';
      case 'warning':
        return 'border-amber-500/30 bg-amber-500/10';
      case 'offline':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  const overallStatus = services.every(s => s.status === 'online') ? 'online' : 
                       services.some(s => s.status === 'offline') ? 'offline' : 'warning';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overall Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border ${getStatusColor(overallStatus)}`}>
              {getStatusIcon(overallStatus)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white">System Status</h2>
              <p className="text-blue-200 text-sm sm:text-base">Real-time monitoring dashboard</p>
            </div>
          </div>
          
          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base touch-manipulation flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        <div className={`p-4 rounded-lg border ${getStatusColor(overallStatus)}`}>
          <p className="text-white font-medium text-sm sm:text-base">
            System Status: <span className={`${
              overallStatus === 'online' ? 'text-emerald-300' :
              overallStatus === 'warning' ? 'text-amber-300' : 'text-red-300'
            }`}>
              {overallStatus === 'online' ? 'All Systems Operational' :
               overallStatus === 'warning' ? 'Some Issues Detected' : 'Critical Issues'}
            </span>
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <div key={service.id} className={`rounded-xl p-4 sm:p-6 border transition-all duration-300 ${getStatusColor(service.status)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                <h3 className="text-white font-semibold text-sm sm:text-base">{service.name}</h3>
              </div>
              {getStatusIcon(service.status)}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-xs sm:text-sm">Response Time</span>
                <span className="text-white font-medium text-xs sm:text-sm">{service.responseTime}ms</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-xs sm:text-sm">Uptime</span>
                <span className="text-white font-medium text-xs sm:text-sm">{service.uptime}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-xs sm:text-sm">Last Checked</span>
                <span className="text-white font-medium text-xs">
                  {new Date(service.lastChecked).toLocaleTimeString()}
                </span>
              </div>

              {/* Uptime Bar */}
              <div className="mt-3 sm:mt-4">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      service.uptime >= 99 ? 'bg-emerald-500' :
                      service.uptime >= 95 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${service.uptime}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
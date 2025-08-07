'use client';

import React from 'react';
import { 
  Server, 
  Database, 
  Network, 
  Brain, 
  IndianRupee, 
  Clock,
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  CheckCircle,
  Settings
} from 'lucide-react';
import { DeploymentConfig } from '../../data/mockAIResponses';
import { usePrototypeStore } from '../../store/prototypeStore';

interface ConfigPreviewProps {
  config: DeploymentConfig;
}

const getConfigIcon = (type: string) => {
  switch (type) {
    case 'vm': return Server;
    case 'storage': return Database;
    case 'network': return Network;
    case 'ai-pod': return Brain;
    default: return Server;
  }
};

const getConfigColor = (type: string) => {
  switch (type) {
    case 'vm': return 'blue';
    case 'storage': return 'purple';
    case 'network': return 'orange';
    case 'ai-pod': return 'green';
    default: return 'gray';
  }
};

export default function ConfigPreview({ config }: ConfigPreviewProps) {
  const { simulateDeployment, handleAction } = usePrototypeStore();
  
  const IconComponent = getConfigIcon(config.type);
  const color = getConfigColor(config.type);
  
  const handleDeploy = () => {
    simulateDeployment(config.type);
  };

  const handleModify = () => {
    handleAction('modify', config);
  };

  const formatResourceType = (type: string) => {
    switch (type) {
      case 'vm': return 'Virtual Machine';
      case 'storage': return 'Storage Volume';
      case 'network': return 'Network Configuration';
      case 'ai-pod': return 'AI Pod';
      default: return 'Resource';
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 space-y-4 shadow-sm animate-slideIn">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <IconComponent className={`text-${color}-600`} size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">
            {formatResourceType(config.type)}
          </h4>
          <p className="text-sm text-gray-600">
            {config.name}
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-700 flex items-center space-x-1">
          <Settings size={14} />
          <span>Configuration</span>
        </h5>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
          {Object.entries(config.specs).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-600 capitalize flex items-center space-x-1">
                {key === 'cpu' && <Cpu size={12} />}
                {key === 'memory' && <MemoryStick size={12} />}
                {key === 'storage' && <HardDrive size={12} />}
                {key === 'gpu' && <Zap size={12} />}
                <span>{key === 'cpu' ? 'vCPU' : key}:</span>
              </span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <h5 className="text-sm font-medium text-gray-700 flex items-center space-x-1">
          <IndianRupee size={14} />
          <span>Cost Estimate</span>
        </h5>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Hourly:</span>
            <div className="font-semibold text-gray-800">
              ₹{config.estimatedCost.hourly.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Monthly:</span>
            <div className="font-semibold text-gray-800">
              ₹{config.estimatedCost.monthly.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Time */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Clock size={14} />
        <span>Estimated deployment time: ~{Math.floor(config.deploymentTime / 1000)} seconds</span>
      </div>

      {/* Clean Action - Just show configuration */}
      <div className="pt-2">
        <p className="text-xs text-gray-500">Configuration ready for deployment</p>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        /* Tailwind dynamic classes fallback */
        .bg-blue-100 { background-color: #dbeafe; }
        .bg-purple-100 { background-color: #f3e8ff; }
        .bg-orange-100 { background-color: #fed7aa; }
        .bg-green-100 { background-color: #dcfce7; }
        .bg-gray-100 { background-color: #f3f4f6; }
        
        .text-blue-600 { color: #2563eb; }
        .text-purple-600 { color: #9333ea; }
        .text-orange-600 { color: #ea580c; }
        .text-green-600 { color: #16a34a; }
        .text-gray-600 { color: #4b5563; }
      `}</style>
    </div>
  );
}
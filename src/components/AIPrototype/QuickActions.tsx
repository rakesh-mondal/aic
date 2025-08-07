'use client'

import React from 'react'
import { 
  Zap, Database, Network, Brain, Server, HardDrive, 
  Shield, DollarSign, Users, BarChart3, Settings, 
  Cloud, Monitor, Cpu, Gauge, Sparkles 
} from 'lucide-react'
import { usePrototypeStore } from '../../store/prototypeStore'
import { usePrototypeChat } from './hooks/usePrototypeChat'
import { Button } from '../../../components/ui/button'

// Dynamic quick actions based on page context
const getQuickActionsForPage = (pageTitle: string, quickActions: string[]) => {
  const iconMap: Record<string, any> = {
    'Deploy VM': Zap,
    'Create VM': Server,
    'Setup Storage': Database,
    'Create Volume': HardDrive,
    'Create Bucket': Cloud,
    'View Analytics': BarChart3,
    'Manage Resources': Settings,
    'Configure Network': Network,
    'Setup Security': Shield,
    'View Costs': DollarSign,
    'Add User': Users,
    'Deploy Model': Brain,
    'Monitor Performance': Gauge,
    'Deploy AI Pod': Cpu,
    'Load Model': Brain,
    'Setup Training': Monitor,
    'Monitor GPU': Gauge,
    'Create Security Group': Shield,
    'Setup Firewall': Shield,
    'Monitor Traffic': Monitor,
    'Audit Access': Users,
    'Optimize Spending': DollarSign,
    'Setup Alerts': BarChart3,
    'Generate Report': BarChart3
  }

  const colorMap: Record<string, string> = {
    'Deploy VM': 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600',
    'Create VM': 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600',
    'Setup Storage': 'bg-green-50 border-green-200 hover:bg-green-100 text-green-600',
    'Create Volume': 'bg-green-50 border-green-200 hover:bg-green-100 text-green-600',
    'Create Bucket': 'bg-green-50 border-green-200 hover:bg-green-100 text-green-600',
    'View Analytics': 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-600',
    'Manage Resources': 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600',
    'Configure Network': 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-600',
    'Setup Security': 'bg-red-50 border-red-200 hover:bg-red-100 text-red-600',
    'View Costs': 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-600',
    'Add User': 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100 text-cyan-600',
    'Deploy Model': 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600',
    'Monitor Performance': 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-600',
    'Deploy AI Pod': 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600',
    'Load Model': 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600',
    'Setup Training': 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600',
    'Monitor GPU': 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600',
    'Create Security Group': 'bg-red-50 border-red-200 hover:bg-red-100 text-red-600',
    'Setup Firewall': 'bg-red-50 border-red-200 hover:bg-red-100 text-red-600',
    'Monitor Traffic': 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-600',
    'Audit Access': 'bg-red-50 border-red-200 hover:bg-red-100 text-red-600',
    'Optimize Spending': 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-600',
    'Setup Alerts': 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-600',
    'Generate Report': 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-600'
  }

  const subtitleMap: Record<string, string> = {
    'Deploy VM': 'Virtual Machine',
    'Create VM': 'Virtual Machine',
    'Setup Storage': 'Block & Object Storage',
    'Create Volume': 'Block Storage',
    'Create Bucket': 'Object Storage',
    'View Analytics': 'Dashboard Insights',
    'Manage Resources': 'Resource Management',
    'Configure Network': 'VPC & Subnets',
    'Setup Security': 'Security Groups',
    'View Costs': 'Billing Analysis',
    'Add User': 'User Management',
    'Deploy Model': 'AI Model',
    'Monitor Performance': 'System Metrics',
    'Deploy AI Pod': 'GPU Instance',
    'Load Model': 'Model Loading',
    'Setup Training': 'ML Training',
    'Monitor GPU': 'GPU Metrics',
    'Create Security Group': 'Network Security',
    'Setup Firewall': 'Firewall Rules',
    'Monitor Traffic': 'Network Monitoring',
    'Audit Access': 'Access Logs',
    'Optimize Spending': 'Cost Optimization',
    'Setup Alerts': 'Monitoring Alerts',
    'Generate Report': 'Usage Reports'
  }

  return quickActions.slice(0, 4).map(action => ({
    id: action.toLowerCase().replace(/\s+/g, '_'),
    title: action,
    subtitle: subtitleMap[action] || 'Quick Action',
    icon: iconMap[action] || Zap,
    message: `Help me ${action.toLowerCase()}`,
    color: colorMap[action] || 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600'
  }))
}

export function QuickActions() {
  const { handleConversation } = usePrototypeChat()
  const { pageContext, setShowSuggestions } = usePrototypeStore()

  const handleQuickAction = async (message: string) => {
    setShowSuggestions(false)
    await handleConversation(message)
  }

  // Get contextual quick actions for current page
  const contextualActions = getQuickActionsForPage(pageContext.title, pageContext.quickActions)

  return (
    <div className="space-y-3">
      {/* Quick Action Buttons - Using main app design system */}
      <div className="grid grid-cols-1 gap-2">
        {contextualActions.slice(0, 4).map((action, index) => (
          <Button
            key={action.id}
            onClick={() => handleQuickAction(action.message)}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className="h-auto py-3 px-4 text-left justify-start"
          >
            <div className="flex flex-col items-start">
              <div className="font-medium text-sm">
                {action.title}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {action.subtitle}
              </div>
            </div>
          </Button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        button:hover {
          transform: scale(1.05);
        }
        
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  )
}

export default QuickActions
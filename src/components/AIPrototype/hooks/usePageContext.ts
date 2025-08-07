'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { usePrototypeStore } from '../../../store/prototypeStore'

// Page context mappings for Copilot experience
const PAGE_CONTEXTS = {
  '/dashboard': {
    title: 'Dashboard',
    capabilities: ['overview', 'quick-deploy', 'monitoring', 'analytics'],
    quickActions: ['Deploy VM', 'Setup Storage', 'View Analytics', 'Manage Resources']
  },
  '/compute/vms': {
    title: 'Virtual Machines',
    capabilities: ['vm-management', 'deployment', 'scaling', 'monitoring'],
    quickActions: ['Create VM', 'Clone VM', 'Schedule VMs', 'Performance Tuning']
  },
  '/compute/pods': {
    title: 'AI Pods',
    capabilities: ['ai-deployment', 'gpu-management', 'model-training', 'inference'],
    quickActions: ['Deploy AI Pod', 'Load Model', 'Setup Training', 'Monitor GPU']
  },
  '/storage/block': {
    title: 'Block Storage',
    capabilities: ['storage-management', 'backup', 'snapshots', 'performance'],
    quickActions: ['Create Volume', 'Attach Storage', 'Create Snapshot', 'Optimize Performance']
  },
  '/storage/object': {
    title: 'Object Storage',
    capabilities: ['file-management', 'cdn', 'backup', 'static-hosting'],
    quickActions: ['Create Bucket', 'Upload Files', 'Setup CDN', 'Configure Backup']
  },
  '/networking/vpc': {
    title: 'Virtual Private Cloud',
    capabilities: ['network-design', 'security', 'routing', 'connectivity'],
    quickActions: ['Create VPC', 'Setup Subnets', 'Configure Security Groups', 'Add Load Balancer']
  },
  '/networking/security': {
    title: 'Network Security',
    capabilities: ['firewall', 'access-control', 'monitoring', 'compliance'],
    quickActions: ['Create Security Group', 'Setup Firewall', 'Monitor Traffic', 'Audit Access']
  },
  '/billing': {
    title: 'Billing & Usage',
    capabilities: ['cost-analysis', 'billing', 'optimization', 'reporting'],
    quickActions: ['View Costs', 'Optimize Spending', 'Setup Alerts', 'Generate Report']
  },
  '/iam': {
    title: 'Identity & Access',
    capabilities: ['user-management', 'permissions', 'roles', 'security'],
    quickActions: ['Add User', 'Create Role', 'Manage Permissions', 'Setup MFA']
  },
  '/models': {
    title: 'AI Models',
    capabilities: ['model-management', 'training', 'inference', 'deployment'],
    quickActions: ['Deploy Model', 'Start Training', 'Setup Inference', 'Monitor Performance']
  },
  '/data': {
    title: 'Data Management',
    capabilities: ['data-processing', 'pipelines', 'governance', 'analytics'],
    quickActions: ['Create Pipeline', 'Process Data', 'Setup Governance', 'Run Analytics']
  }
}

// Default context for unknown pages
const DEFAULT_CONTEXT = {
  title: 'Krutrim Cloud',
  capabilities: ['general-help', 'navigation', 'support'],
  quickActions: ['Get Help', 'Navigate Dashboard', 'Contact Support', 'View Documentation']
}

export function usePageContext() {
  const pathname = usePathname()
  const { setPageContext, pageContext, clearMessages } = usePrototypeStore()

  useEffect(() => {
    // Find the best matching context
    let matchedContext = DEFAULT_CONTEXT
    let matchedRoute = '/'

    // Exact match first
    if (PAGE_CONTEXTS[pathname as keyof typeof PAGE_CONTEXTS]) {
      matchedContext = PAGE_CONTEXTS[pathname as keyof typeof PAGE_CONTEXTS]
      matchedRoute = pathname
    } else {
      // Partial match (e.g., /compute/vms/instance-123 matches /compute/vms)
      const routeKeys = Object.keys(PAGE_CONTEXTS).sort((a, b) => b.length - a.length) // Longest first
      
      for (const route of routeKeys) {
        if (pathname.startsWith(route)) {
          matchedContext = PAGE_CONTEXTS[route as keyof typeof PAGE_CONTEXTS]
          matchedRoute = route
          break
        }
      }
    }

    // Update store only if context changed
    if (pageContext.route !== matchedRoute) {
      // Clear previous chat messages and reset context when page changes
      clearMessages()
      setPageContext(
        matchedRoute,
        matchedContext.title,
        matchedContext.capabilities,
        matchedContext.quickActions
      )
    }
  }, [pathname, setPageContext, pageContext.route])

  return {
    currentRoute: pathname,
    pageContext,
    isContextualPage: pathname !== '/' && PAGE_CONTEXTS[pathname as keyof typeof PAGE_CONTEXTS] !== undefined
  }
}

// Helper function to get contextual welcome message
export function getContextualWelcome(pageTitle: string, capabilities: string[]): string {
  const capabilityText = capabilities.slice(0, 3).join(', ')
  
  const welcomeMessages = [
    `Hi! I can help you with ${pageTitle.toLowerCase()}. I specialize in ${capabilityText} and more.`,
    `Welcome to ${pageTitle}! I'm here to assist with ${capabilityText} and other tasks.`,
    `Hello! Ready to help you with ${pageTitle.toLowerCase()}. My expertise includes ${capabilityText}.`,
    `Hey there! I can guide you through ${pageTitle.toLowerCase()}, especially ${capabilityText}.`
  ]
  
  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
}

// Helper function to get contextual suggestions based on current page
export function getContextualSuggestions(pageTitle: string, capabilities: string[]): string[] {
  const contextualSuggestions: Record<string, string[]> = {
    'Dashboard': [
      'Show me my resource overview',
      'What are my top cost centers?',
      'Deploy a quick VM for testing',
      'Check system health status'
    ],
    'Virtual Machines': [
      'Create a high-performance VM',
      'Show me VM performance metrics',
      'Help me resize an existing VM',
      'Setup auto-scaling for my VMs'
    ],
    'AI Pods': [
      'Deploy a PyTorch training pod',
      'Setup GPU cluster for inference',
      'Monitor my model training progress',
      'Optimize AI workload costs'
    ],
    'Block Storage': [
      'Create high-performance storage',
      'Setup automated backups',
      'Monitor storage performance',
      'Optimize storage costs'
    ],
    'Object Storage': [
      'Create a new storage bucket',
      'Setup CDN for static files',
      'Configure backup policies',
      'Analyze storage usage patterns'
    ],
    'Virtual Private Cloud': [
      'Design a secure VPC architecture',
      'Setup multi-tier network',
      'Configure load balancers',
      'Implement network security'
    ],
    'Network Security': [
      'Create security groups',
      'Setup firewall rules',
      'Monitor network traffic',
      'Audit access logs'
    ],
    'Billing & Usage': [
      'Show my current spending',
      'Find cost optimization opportunities',
      'Setup billing alerts',
      'Generate usage report'
    ],
    'Identity & Access': [
      'Add new team member',
      'Create custom roles',
      'Setup MFA policies',
      'Review user permissions'
    ],
    'AI Models': [
      'Deploy a language model',
      'Start model training',
      'Setup inference endpoint',
      'Monitor model performance'
    ],
    'Data Management': [
      'Create data pipeline',
      'Process large datasets',
      'Setup data governance',
      'Run analytics workload'
    ],
    'Krutrim Cloud': [
      'Show me what I can do here',
      'Help me get started',
      'Navigate to resources',
      'Contact support team'
    ]
  }
  
  return contextualSuggestions[pageTitle] || [
    `Help me with ${pageTitle.toLowerCase()}`,
    'Show me what I can do here',
    'Give me a quick overview',
    'What are the best practices?'
  ]
}
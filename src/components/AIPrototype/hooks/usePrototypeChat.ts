import { useCallback } from 'react';
import { usePrototypeStore } from '../../../store/prototypeStore';
import { aiResponses, vmConfigurations, aiPodConfigurations, storageConfigurations } from '../../../data/aiResponses';
import { ChatMessage, DeploymentConfig } from '../../../data/mockAIResponses';
import { getContextualWelcome, getContextualSuggestions } from './usePageContext';

// Conversation paths and flows
export interface ConversationFlow {
  id: string;
  trigger: string[];
  steps: ConversationStep[];
}

export interface ConversationStep {
  type: 'response' | 'config' | 'deploy' | 'success' | 'error';
  content: string;
  config?: DeploymentConfig;
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'primary' | 'secondary' | 'destructive';
  }>;
  delay?: number;
}

export const usePrototypeChat = () => {
  const { 
    addMessage, 
    setTyping, 
    simulateDeployment, 
    setConfiguration,
    userContext,
    pageContext,
    currentPage 
  } = usePrototypeStore();

  // Keyword detection patterns
  const detectIntent = useCallback((message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // VM-related keywords
    if (lowerMessage.includes('vm') || 
        lowerMessage.includes('virtual machine') || 
        lowerMessage.includes('server') ||
        lowerMessage.includes('compute instance')) {
      return 'vm';
    }
    
    // Storage-related keywords
    if (lowerMessage.includes('storage') || 
        lowerMessage.includes('disk') || 
        lowerMessage.includes('volume') ||
        lowerMessage.includes('backup') ||
        lowerMessage.includes('bucket')) {
      return 'storage';
    }
    
    // AI/GPU-related keywords
    if (lowerMessage.includes('gpu') || 
        lowerMessage.includes('ai') || 
        lowerMessage.includes('machine learning') ||
        lowerMessage.includes('training') ||
        lowerMessage.includes('model') ||
        lowerMessage.includes('nvidia')) {
      return 'ai-pod';
    }
    
    // Network-related keywords
    if (lowerMessage.includes('network') || 
        lowerMessage.includes('vpc') || 
        lowerMessage.includes('subnet') ||
        lowerMessage.includes('security group')) {
      return 'network';
    }
    
    // Cost/billing keywords
    if (lowerMessage.includes('cost') || 
        lowerMessage.includes('price') || 
        lowerMessage.includes('cheap') ||
        lowerMessage.includes('budget') ||
        lowerMessage.includes('billing')) {
      return 'cost';
    }
    
    // Resource management
    if (lowerMessage.includes('list') || 
        lowerMessage.includes('show') || 
        lowerMessage.includes('current') ||
        lowerMessage.includes('resources')) {
      return 'resources';
    }
    
    return 'general';
  }, []);

  // Detect specific requirements from message
  const detectRequirements = useCallback((message: string) => {
    const lowerMessage = message.toLowerCase();
    const requirements: any = {};
    
    // Memory requirements
    const memoryMatch = lowerMessage.match(/(\d+)\s*gb\s*(ram|memory)/);
    if (memoryMatch) {
      requirements.memory = parseInt(memoryMatch[1]);
    }
    
    // CPU requirements
    const cpuMatch = lowerMessage.match(/(\d+)\s*(cpu|core|vcpu)/);
    if (cpuMatch) {
      requirements.cpu = parseInt(cpuMatch[1]);
    }
    
    // Budget requirements
    const budgetMatch = lowerMessage.match(/₹?\s*(\d+)\s*(hour|hr|month)/);
    if (budgetMatch) {
      requirements.budget = parseInt(budgetMatch[1]);
    }
    
    // Performance level
    if (lowerMessage.includes('powerful') || lowerMessage.includes('high performance')) {
      requirements.performance = 'high';
    } else if (lowerMessage.includes('basic') || lowerMessage.includes('simple')) {
      requirements.performance = 'basic';
    } else if (lowerMessage.includes('cheap') || lowerMessage.includes('minimal')) {
      requirements.performance = 'minimal';
    }
    
    return requirements;
  }, []);

  // Get appropriate configuration based on requirements
  const getConfiguration = useCallback((intent: string, requirements: any) => {
    switch (intent) {
      case 'vm':
        if (requirements.memory >= 16 || requirements.cpu >= 8 || requirements.performance === 'high') {
          return vmConfigurations.large;
        } else if (requirements.memory >= 8 || requirements.cpu >= 4 || requirements.performance === 'basic') {
          return vmConfigurations.medium;
        } else if (requirements.performance === 'minimal' || requirements.budget && requirements.budget < 100) {
          return vmConfigurations.small;
        } else {
          return vmConfigurations.medium; // Default
        }
      
      case 'ai-pod':
        return aiPodConfigurations.gpu;
      
      case 'storage':
        if (requirements.performance === 'high') {
          return storageConfigurations.large;
        } else if (requirements.performance === 'minimal') {
          return storageConfigurations.small;
        } else {
          return storageConfigurations.medium;
        }
      
      default:
        return vmConfigurations.medium;
    }
  }, []);

  // Generate contextual response based on current page
  const generateResponse = useCallback((intent: string, requirements: any, config?: DeploymentConfig) => {
    const responses = aiResponses[intent] || aiResponses.general;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add page context to responses
    const contextPrefix = getPageContextPrefix(intent, currentPage, pageContext.title);
    
    // Customize response based on requirements
    if (requirements.performance === 'minimal' && intent === 'vm') {
      return contextPrefix + "I'll find you a cost-effective option! Here's a budget-friendly VM configuration:";
    } else if (requirements.performance === 'high' && intent === 'vm') {
      return contextPrefix + "I'll configure a high-performance setup for you! Here's a powerful VM configuration:";
    } else if (requirements.memory || requirements.cpu) {
      return contextPrefix + `Perfect! I'll set up a VM with ${requirements.memory ? requirements.memory + 'GB RAM' : ''} ${requirements.cpu ? requirements.cpu + ' vCPUs' : ''}. Here's the configuration:`;
    }
    
    return contextPrefix + randomResponse;
  }, [currentPage, pageContext.title]);

  // Helper function to add page context to responses
  const getPageContextPrefix = (intent: string, currentPage: string, pageTitle: string): string => {
    // Don't add context prefix for general responses
    if (intent === 'general') {
      return '';
    }

    // Add contextual prefix based on current page
    const contextPrefixes: Record<string, string> = {
      'dashboard': '📊 From your dashboard, I can see ',
      'virtual machines': '🖥️ Perfect for VM management! ',
      'ai pods': '🤖 Great choice for AI workloads! ',
      'block storage': '💾 For your storage needs, ',
      'object storage': '🗂️ For object storage, ',
      'billing & usage': '💰 Looking at your billing, ',
      'network security': '🔒 For secure networking, ',
      'virtual private cloud': '🌐 For your VPC setup, '
    };

    const prefix = contextPrefixes[currentPage.toLowerCase()];
    return prefix ? prefix : `🔧 For ${pageTitle.toLowerCase()}, `;
  };

  // Main conversation handler
  const handleConversation = useCallback(async (userMessage: string) => {
    // Add user message
    addMessage({
      type: 'user',
      content: userMessage,
      status: 'sent'
    });

    // Show typing indicator
    setTyping(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    setTyping(false);

    // Detect intent and requirements
    const intent = detectIntent(userMessage);
    const requirements = detectRequirements(userMessage);
    
    // Handle different intents
    switch (intent) {
      case 'vm':
      case 'ai-pod':
      case 'storage':
        const config = getConfiguration(intent, requirements);
        const response = generateResponse(intent, requirements, config);
        
        addMessage({
          type: 'assistant',
          content: response,
          config: config,
          actions: [
            { label: 'Deploy Now', action: 'deploy', variant: 'primary' },
            { label: 'Modify Config', action: 'modify', variant: 'secondary' }
          ],
          status: 'sent'
        });
        
        setConfiguration(config);
        break;
        
      case 'cost':
        addMessage({
          type: 'assistant',
          content: `💰 **Current Account Status:**\n• Balance: ₹${userContext.balance.toLocaleString()}\n• This month's usage: ₹2,340\n• Available credit: ₹${(userContext.balance - 2340).toLocaleString()}\n\n💡 **Budget-friendly options:**\n• Small VM: ₹50/hour\n• Medium VM: ₹150/hour\n• Object Storage: ₹1.44/GB/month\n\nWhat would you like to deploy?`,
          actions: [
            { label: 'Deploy Small VM', action: 'deploy_small_vm', variant: 'primary' },
            { label: 'Add More Credits', action: 'add_credits', variant: 'secondary' }
          ],
          status: 'sent'
        });
        break;
        
      case 'resources':
        const resourceList = userContext.existingResources.map(resource => 
          `• ${resource.name} (${resource.type}) - ${resource.status} - ₹${resource.cost}/hr`
        ).join('\n');
        
        addMessage({
          type: 'assistant',
          content: `📋 **Your Current Resources:**\n\n${resourceList}\n\n📊 **Summary:**\n• Total resources: ${userContext.existingResources.length}\n• Monthly cost: ₹${userContext.existingResources.reduce((sum, r) => sum + r.cost, 0) * 24 * 30}\n\nNeed help managing any of these resources?`,
          actions: [
            { label: 'Deploy New Resource', action: 'deploy_new', variant: 'primary' },
            { label: 'Optimize Costs', action: 'optimize', variant: 'secondary' }
          ],
          status: 'sent'
        });
        break;
        
      case 'network':
        addMessage({
          type: 'assistant',
          content: "I'll help you set up secure networking! 🌐\n\n**Network Configuration Options:**\n• **Simple Setup**: Basic VPC with public/private subnets\n• **Multi-tier**: Web, app, and database tiers\n• **Enterprise**: Advanced security and compliance\n\nWhat type of application are you building?",
          actions: [
            { label: 'Simple Setup', action: 'network_simple', variant: 'primary' },
            { label: 'Multi-tier App', action: 'network_complex', variant: 'secondary' }
          ],
          status: 'sent'
        });
        break;
        
      default:
        // Generate contextual welcome message and suggestions
        const contextualWelcome = getContextualWelcome(pageContext.title, pageContext.capabilities);
        const contextualSuggestions = getContextualSuggestions(pageContext.title, pageContext.capabilities);
        
        addMessage({
          type: 'assistant',
          content: contextualWelcome + "\n\n💡 **I can help you with:**\n" + 
                   contextualSuggestions.slice(0, 3).map(s => `• ${s}`).join('\n'),
          actions: pageContext.quickActions.slice(0, 3).map((action, index) => ({
            label: action,
            action: `quick_${action.toLowerCase().replace(/\s+/g, '_')}`,
            variant: index === 0 ? 'primary' as const : 'secondary' as const
          })),
          status: 'sent'
        });
        break;
    }
  }, [addMessage, setTyping, detectIntent, detectRequirements, getConfiguration, generateResponse, setConfiguration, userContext, pageContext]);

  // Handle deployment success
  const handleDeploymentSuccess = useCallback((resourceType: string) => {
    const successMessages = aiResponses.success;
    const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    addMessage({
      type: 'assistant',
      content: `${randomSuccess}\n\n🎉 Your ${resourceType} has been deployed successfully!\n\n**What's Next?**\n• Configure monitoring alerts\n• Set up automated backups\n• Review security settings`,
      actions: [
        { label: 'Deploy Another', action: 'deploy_another', variant: 'primary' },
        { label: 'View Dashboard', action: 'view_dashboard', variant: 'secondary' }
      ],
      status: 'deployed'
    });
  }, [addMessage]);

  return {
    handleConversation,
    handleDeploymentSuccess,
    detectIntent,
    detectRequirements
  };
};
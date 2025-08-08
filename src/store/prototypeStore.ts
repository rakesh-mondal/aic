// Prototype State Store for Krutrim Cloud AI Assistant
// Using Zustand for simple state management

import { create } from 'zustand'
import { getContextualSuggestions } from '../components/AIPrototype/hooks/usePageContext';
import { subscribeWithSelector } from 'zustand/middleware';
import { 
  ChatMessage, 
  DeploymentConfig, 
  MOCK_RESPONSES, 
  CONVERSATION_FLOWS,
  DEPLOYMENT_SCENARIOS,
  generateResourceId 
} from '../data/mockAIResponses';

interface UserContext {
  name: string;
  balance: number;
  region: string;
  permissionLevel: 'user' | 'admin' | 'billing';
  existingResources: Array<{
    id: string;
    type: string;
    name: string;
    status: string;
    cost: number;
  }>;
}

interface PrototypeState {
  // UI State - Copilot Panel
  isAIAssistantOpen: boolean;
  isTyping: boolean;
  showSuggestions: boolean;
  
  // Chat State
  messages: ChatMessage[];
  currentInput: string;
  suggestions: string[];
  
  // Deployment State
  currentConfig: DeploymentConfig | null;
  deploymentStatus: 'idle' | 'configuring' | 'deploying' | 'success' | 'error';
  deploymentProgress: number;
  deploymentStep: string;
  
  // Page Context for Copilot Experience
  currentPage: string;
  pageContext: {
    route: string;
    title: string;
    capabilities: string[];
    quickActions: string[];
  };
  
  // User Context
  userContext: UserContext;
  
  // Demo State
  demoScenario: string | null;
  conversationFlow: any[] | null;
  flowStep: number;
}

interface PrototypeActions {
  // UI Actions
  toggleAssistant: () => void;
  setTyping: (typing: boolean) => void;
  setShowSuggestions: (show: boolean) => void;
  
  // Chat Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setCurrentInput: (input: string) => void;
  clearMessages: () => void;
  
  // AI Response Actions
  selectSuggestion: (suggestion: string) => void;
  handleAction: (action: string, config?: any) => void;
  
  // Deployment Actions
  setConfiguration: (config: DeploymentConfig) => void;
  simulateDeployment: (type: string) => Promise<void>;
  resetDeployment: () => void;
  
  // Page Context Actions (Copilot)
  setPageContext: (route: string, title: string, capabilities: string[], quickActions: string[]) => void;
  updateCurrentPage: (page: string) => void;
  updateSuggestions: (pageTitle: string, capabilities: string[]) => void;
  
  // Demo Actions
  startDemoScenario: (scenario: string) => void;
  nextDemoStep: () => void;
  resetDemo: () => void;
  
  // Utility Actions
  updateUserContext: (updates: Partial<UserContext>) => void;
}

type PrototypeStore = PrototypeState & PrototypeActions;

// Initial user context with mock data
const initialUserContext: UserContext = {
  name: 'Rakesh Mondal',
  balance: 15750,
  region: 'ap-south-1 (Mumbai)',
  permissionLevel: 'admin',
  existingResources: [
    { id: 'i-0abc123def456', type: 'vm', name: 'web-server-01', status: 'running', cost: 16.80 },
    { id: 'i-0def456ghi789', type: 'vm', name: 'api-server-01', status: 'running', cost: 8.50 },
    { id: 'i-0ghi789jkl012', type: 'vm', name: 'dev-server-01', status: 'stopped', cost: 0 },
    { id: 'vol-0abc123def456', type: 'storage', name: 'app-data-storage', status: 'attached', cost: 1800 },
    { id: 'vol-0def456ghi789', type: 'storage', name: 'backup-bucket', status: 'available', cost: 720 },
  ]
};

export const usePrototypeStore = create<PrototypeStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    isAIAssistantOpen: false,
    isTyping: false,
    showSuggestions: true,
    messages: [],
    currentInput: '',
    suggestions: getContextualSuggestions('Dashboard', ['overview', 'quick-deploy', 'monitoring', 'analytics']),
    currentConfig: null,
    deploymentStatus: 'idle',
    deploymentProgress: 0,
    deploymentStep: '',
    
    // Page Context (Copilot)
    currentPage: 'dashboard',
    pageContext: {
      route: '/dashboard',
      title: 'Dashboard',
      capabilities: ['overview', 'quick-deploy', 'monitoring'],
      quickActions: ['Deploy VM', 'Setup Storage', 'View Analytics', 'Manage Resources']
    },
    
    userContext: initialUserContext,
    demoScenario: null,
    conversationFlow: null,
    flowStep: 0,

    // UI Actions
    toggleAssistant: () => set((state) => ({ 
      isAIAssistantOpen: !state.isAIAssistantOpen,
      showSuggestions: !state.isAIAssistantOpen && state.messages.length === 0
    })),

    setTyping: (typing: boolean) => set({ isTyping: typing }),
    
    setShowSuggestions: (show: boolean) => set({ showSuggestions: show }),

    // Chat Actions
    addMessage: (message) => {
      const newMessage: ChatMessage = {
        ...message,
        id: Math.random().toString(36).substring(7),
        timestamp: new Date(),
      };
      
      set((state) => ({
        messages: [...state.messages, newMessage],
        showSuggestions: false
      }));
    },

    setCurrentInput: (input: string) => set({ currentInput: input }),

    clearMessages: () => set({ 
      messages: [], 
      showSuggestions: true,
      deploymentStatus: 'idle',
      currentConfig: null 
    }),

    selectSuggestion: (suggestion: string) => {
      const { setCurrentInput } = get();
      setCurrentInput(suggestion);
      set({ showSuggestions: false });
    },

    handleAction: (action: string, config?: any) => {
      const { addMessage, simulateDeployment, setConfiguration } = get();
      
      switch (action) {
        case 'deploy':
        case 'deploy_pytorch':
        case 'deploy_tf':
          if (config) {
            setConfiguration(config);
            simulateDeployment(config.type);
          }
          break;
          
        case 'modify':
          addMessage({
            type: 'assistant',
            content: "I'd be happy to modify the configuration! What would you like to change?\n\n🔧 **Modifiable Options:**\n• Instance size (CPU/Memory)\n• Storage capacity\n• Operating System\n• Security settings\n• Network configuration\n\nJust tell me what you'd like to adjust.",
            status: 'sent'
          });
          break;
          
        case 'advanced':
          addMessage({
            type: 'assistant',
            content: "🔧 **Advanced Configuration Options:**\n\n**Performance:**\n• Custom CPU allocation\n• Memory optimization\n• Storage IOPS configuration\n• Network bandwidth limits\n\n**Security:**\n• Custom security groups\n• SSH key management\n• IAM role assignment\n• Encryption settings\n\n**Monitoring:**\n• CloudWatch integration\n• Custom metrics\n• Alert configurations\n• Log aggregation\n\nWhich area would you like to configure?",
            status: 'sent'
          });
          break;
          
        case 'schedule_vms':
          addMessage({
            type: 'assistant',
            content: "⏰ **VM Scheduling Configured!**\n\nI've set up automatic start/stop schedules for your development VMs:\n\n📅 **Schedule:**\n• Start: Monday-Friday 9:00 AM IST\n• Stop: Monday-Friday 7:00 PM IST\n• Weekend: Stopped\n\n💰 **Estimated Savings:** ₹1,200/month (60% reduction)\n\n✅ **Applied to:**\n• dev-server-01\n• staging-server-02\n\nYou can modify these schedules anytime in the dashboard.",
            status: 'sent'
          });
          break;
          
        default:
          addMessage({
            type: 'assistant',
            content: "I'm working on that feature! In the meantime, I can help you with:\n• Deploying new resources\n• Modifying configurations\n• Checking costs and usage\n• Setting up monitoring\n\nWhat would you like to do?",
            status: 'sent'
          });
      }
    },

    // Deployment Actions
    setConfiguration: (config: DeploymentConfig) => set({ 
      currentConfig: config,
      deploymentStatus: 'configuring'
    }),

    simulateDeployment: async (type: string) => {
      const { addMessage } = get();
      const scenario = DEPLOYMENT_SCENARIOS[type as keyof typeof DEPLOYMENT_SCENARIOS];
      
      if (!scenario) {
        set({ deploymentStatus: 'error' });
        return;
      }

      set({ deploymentStatus: 'deploying', deploymentProgress: 0 });

      // Show deployment starting message
      addMessage({
        type: 'assistant',
        content: `🚀 **Starting ${type.toUpperCase()} Deployment...**\n\nI'll keep you updated on the progress. This usually takes ${Math.floor(scenario.totalTime / 1000)} seconds.`,
        status: 'sent'
      });

      // Simulate deployment steps
      let progress = 0;
      const totalSteps = scenario.steps.length;

      for (let i = 0; i < scenario.steps.length; i++) {
        const step = scenario.steps[i];
        
        set({ 
          deploymentStep: step.step,
          deploymentProgress: Math.floor((i / totalSteps) * 100)
        });

        await new Promise(resolve => setTimeout(resolve, step.duration));
        progress += (1 / totalSteps) * 100;
      }

      // Deployment complete
      set({ 
        deploymentStatus: 'success',
        deploymentProgress: 100,
        deploymentStep: 'Deployment complete!'
      });

      // Add success message
      addMessage({
        type: 'assistant',
        content: scenario.success,
        status: 'deployed',
        actions: [
          { label: 'View', action: 'view_instance', variant: 'primary' },
          { label: 'Deploy Another', action: 'deploy_another', variant: 'secondary' }
        ]
      });

      // Update user resources (simulate)
      const newResource = {
        id: generateResourceId(type),
        type,
        name: `${type}-${Date.now()}`,
        status: 'running',
        cost: type === 'vm' ? 16.80 : type === 'ai-pod' ? 125.00 : 0
      };

      set((state) => ({
        userContext: {
          ...state.userContext,
          existingResources: [...state.userContext.existingResources, newResource]
        }
      }));
    },

    resetDeployment: () => set({
      deploymentStatus: 'idle',
      deploymentProgress: 0,
      deploymentStep: '',
      currentConfig: null
    }),

    // Demo Actions
    startDemoScenario: (scenario: string) => {
      const flow = CONVERSATION_FLOWS[scenario as keyof typeof CONVERSATION_FLOWS];
      if (flow) {
        set({
          demoScenario: scenario,
          conversationFlow: flow,
          flowStep: 0,
          messages: []
        });
      }
    },

    nextDemoStep: () => {
      const { conversationFlow, flowStep } = get();
      if (conversationFlow && flowStep < conversationFlow.length) {
        set({ flowStep: flowStep + 1 });
      }
    },

    resetDemo: () => set({
      demoScenario: null,
      conversationFlow: null,
      flowStep: 0
    }),

    // Page Context Actions (Copilot)
    setPageContext: (route: string, title: string, capabilities: string[], quickActions: string[]) => {
      const contextualSuggestions = getContextualSuggestions(title, capabilities);
      set({
        currentPage: title.toLowerCase(),
        pageContext: { route, title, capabilities, quickActions },
        suggestions: contextualSuggestions
      });
    },
    
    updateCurrentPage: (page: string) => set({ currentPage: page }),
    
    updateSuggestions: (pageTitle: string, capabilities: string[]) => {
      const contextualSuggestions = getContextualSuggestions(pageTitle, capabilities);
      set({ suggestions: contextualSuggestions });
    },

    // Utility Actions
    updateUserContext: (updates: Partial<UserContext>) => set((state) => ({
      userContext: { ...state.userContext, ...updates }
    })),
  }))
);

// Helper function to find the best response for user input
function findBestResponse(input: string): {
  content: string;
  actions?: any[];
  config?: any;
  suggestions?: string[];
} {
  // Check for exact matches first
  if (MOCK_RESPONSES[input]) {
    return {
      content: MOCK_RESPONSES[input].response,
      actions: MOCK_RESPONSES[input].actions,
      suggestions: MOCK_RESPONSES[input].suggestions
    };
  }

  // Check for keyword matches
  const keywords: Record<string, string[]> = {
    'hello': ['hello', 'hi', 'hey', 'greetings'],
    'help': ['help', 'what can you do', 'assistance', 'support'],
    'cost': ['cost', 'price', 'billing', 'money', 'budget', 'expensive'],
    'list resources': ['resources', 'list', 'show', 'current', 'existing', 'my'],
  };

  for (const [responseKey, keywordList] of Object.entries(keywords)) {
    if (keywordList.some(keyword => input.includes(keyword))) {
      const response = MOCK_RESPONSES[responseKey];
      return {
        content: response.response,
        actions: response.actions,
        suggestions: response.suggestions
      };
    }
  }

  // Check for deployment-related keywords
  if (input.includes('vm') || input.includes('virtual machine') || input.includes('server')) {
    return {
      content: "I can help you deploy a virtual machine! Let me know:\n\n• What will you use it for? (web server, database, development)\n• Expected traffic or workload\n• Operating system preference\n• Any specific requirements\n\nBased on your needs, I'll recommend the perfect configuration with cost estimates.",
      suggestions: [
        "Web application server",
        "Database server",
        "Development environment",
        "High-traffic website"
      ]
    };
  }

  if (input.includes('storage') || input.includes('backup') || input.includes('data')) {
    return {
      content: "I'll help you set up the right storage solution!\n\n🗂️ **What type of data?**\n• Application files and databases\n• Backup and archival data\n• User uploads and media files\n• Static website assets\n\n💡 I can recommend object storage for files/backups or block storage for databases based on your needs.",
      suggestions: [
        "Database storage",
        "File backups",
        "User uploads",
        "Static assets"
      ]
    };
  }

  if (input.includes('network') || input.includes('vpc') || input.includes('security')) {
    return {
      content: "I'll design a secure network architecture for you!\n\n🏗️ **What are you building?**\n• Simple web application\n• Multi-tier application\n• Microservices architecture\n• Secure enterprise setup\n\nI'll create the VPC, subnets, and security groups based on your architecture needs.",
      suggestions: [
        "Simple web app",
        "Multi-tier application", 
        "Microservices setup",
        "Enterprise network"
      ]
    };
  }

  if (input.includes('ai') || input.includes('model') || input.includes('machine learning') || input.includes('gpu')) {
    return {
      content: "Perfect! I can help you deploy AI infrastructure.\n\n🤖 **What's your AI use case?**\n• Training machine learning models\n• Running inference/predictions\n• Natural language processing\n• Computer vision tasks\n\nI'll recommend the right GPU configuration and pre-install the frameworks you need.",
      suggestions: [
        "Train ML models",
        "Run inference",
        "NLP tasks",
        "Image recognition"
      ]
    };
  }

  // Default response for unrecognized input
  return {
    content: MOCK_RESPONSES.error_generic.response,
    suggestions: MOCK_RESPONSES.error_generic.suggestions
  };
}

export default usePrototypeStore;
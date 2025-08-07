// Demo scenario scripts for the Krutrim Cloud AI Assistant
// These scenarios guide the prototype behavior for different demo flows

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  steps: ScenarioStep[];
  estimatedDuration: number; // in seconds
}

export interface ScenarioStep {
  id: string;
  type: 'user_input' | 'ai_response' | 'user_action' | 'system_event';
  content: string;
  delay?: number; // delay before this step in ms
  config?: any;
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'primary' | 'secondary' | 'destructive';
  }>;
}

// Scenario 1: Quick VM Deploy
export const quickVMDeploy: DemoScenario = {
  id: 'quick-vm-deploy',
  name: 'Quick VM Deployment',
  description: 'User deploys a standard VM using quick actions',
  estimatedDuration: 25,
  steps: [
    {
      id: 'step-1',
      type: 'user_action',
      content: 'User clicks "Deploy a VM" quick action',
      delay: 0
    },
    {
      id: 'step-2',
      type: 'ai_response',
      content: 'Perfect! Let me set up a virtual machine for you. Here\'s a popular configuration that works great for most applications:',
      delay: 1500,
      config: {
        type: 'vm',
        name: 'Standard-4x16-Medium',
        specs: {
          cpu: '4 vCPUs',
          memory: '16 GB RAM',
          storage: '40 GB SSD',
          network: '2 Gbps'
        },
        estimatedCost: {
          hourly: 150,
          monthly: 108000,
          currency: 'INR'
        },
        deploymentTime: 10000
      },
      actions: [
        { label: 'Deploy Now', action: 'deploy', variant: 'primary' },
        { label: 'Modify Config', action: 'modify', variant: 'secondary' }
      ]
    },
    {
      id: 'step-3',
      type: 'user_action',
      content: 'User clicks "Deploy Now"',
      delay: 2000
    },
    {
      id: 'step-4',
      type: 'ai_response',
      content: '🚀 Deploying your VM... This will take about 10 seconds.',
      delay: 500
    },
    {
      id: 'step-5',
      type: 'system_event',
      content: 'Deployment simulation runs for 10 seconds',
      delay: 10000
    },
    {
      id: 'step-6',
      type: 'ai_response',
      content: '🎉 Successfully deployed!\n\n**VM Details:**\n• Instance ID: i-0abc123def456\n• Public IP: 203.0.113.42\n• Status: Running\n\n**Access:**\n• SSH: `ssh ubuntu@203.0.113.42`\n• Console access available in dashboard',
      delay: 1000,
      actions: [
        { label: 'View in Dashboard', action: 'view_dashboard', variant: 'primary' },
        { label: 'Deploy Another', action: 'deploy_another', variant: 'secondary' }
      ]
    }
  ]
};

// Scenario 2: Custom AI Requirements
export const customAIRequirements: DemoScenario = {
  id: 'custom-ai-requirements',
  name: 'Custom AI Requirements',
  description: 'User requests a powerful GPU server and customizes the configuration',
  estimatedDuration: 35,
  steps: [
    {
      id: 'step-1',
      type: 'user_input',
      content: 'I need a powerful GPU server for AI training',
      delay: 0
    },
    {
      id: 'step-2',
      type: 'ai_response',
      content: 'Excellent! AI training requires serious compute power. I\'ll configure a GPU-enabled AI Pod with high-performance specifications:',
      delay: 2000,
      config: {
        type: 'ai-pod',
        name: 'AI-Pod-GPU-T4',
        specs: {
          cpu: '8 vCPUs',
          memory: '32 GB RAM',
          storage: '100 GB SSD',
          gpu: 'NVIDIA T4 (16GB VRAM)',
          network: '10 Gbps'
        },
        estimatedCost: {
          hourly: 500,
          monthly: 360000,
          currency: 'INR'
        },
        deploymentTime: 15000
      },
      actions: [
        { label: 'Deploy Now', action: 'deploy', variant: 'primary' },
        { label: 'Modify Config', action: 'modify', variant: 'secondary' }
      ]
    },
    {
      id: 'step-3',
      type: 'user_action',
      content: 'User clicks "Modify Config"',
      delay: 3000
    },
    {
      id: 'step-4',
      type: 'ai_response',
      content: 'What would you like to modify? I can adjust:\n\n• **Memory**: Increase to 64GB or 128GB\n• **Storage**: Add more SSD or switch to NVMe\n• **GPU**: Upgrade to V100 or A100\n• **CPU**: Scale up to 16 or 32 vCPUs\n\nWhat changes would you like to make?',
      delay: 1500
    },
    {
      id: 'step-5',
      type: 'user_input',
      content: 'Increase memory to 64GB',
      delay: 2000
    },
    {
      id: 'step-6',
      type: 'ai_response',
      content: 'Perfect! I\'ve updated the configuration with 64GB RAM. This will give you plenty of memory for large model training:',
      delay: 1500,
      config: {
        type: 'ai-pod',
        name: 'AI-Pod-GPU-T4-Enhanced',
        specs: {
          cpu: '8 vCPUs',
          memory: '64 GB RAM',
          storage: '100 GB SSD',
          gpu: 'NVIDIA T4 (16GB VRAM)',
          network: '10 Gbps'
        },
        estimatedCost: {
          hourly: 650,
          monthly: 468000,
          currency: 'INR'
        },
        deploymentTime: 15000
      },
      actions: [
        { label: 'Deploy Enhanced Pod', action: 'deploy', variant: 'primary' },
        { label: 'More Changes', action: 'modify', variant: 'secondary' }
      ]
    },
    {
      id: 'step-7',
      type: 'user_action',
      content: 'User clicks "Deploy Enhanced Pod"',
      delay: 2000
    },
    {
      id: 'step-8',
      type: 'system_event',
      content: 'Deployment simulation with enhanced specs',
      delay: 15000
    },
    {
      id: 'step-9',
      type: 'ai_response',
      content: '🚀 AI Pod deployed successfully!\n\n**Ready for AI Training:**\n• PyTorch 2.0.1 pre-installed\n• CUDA 11.8 configured\n• Jupyter Lab available\n• 64GB RAM for large models\n\nYour training environment is ready to go!',
      delay: 1000
    }
  ]
};

// Scenario 3: Cost-Conscious User
export const costConsciousUser: DemoScenario = {
  id: 'cost-conscious',
  name: 'Cost-Conscious Deployment',
  description: 'User seeks the most economical option and learns about cost optimization',
  estimatedDuration: 20,
  steps: [
    {
      id: 'step-1',
      type: 'user_input',
      content: 'I need the cheapest VM option available',
      delay: 0
    },
    {
      id: 'step-2',
      type: 'ai_response',
      content: 'Smart to optimize costs! 💰 Here\'s our most economical VM that still delivers solid performance:',
      delay: 1800,
      config: {
        type: 'vm',
        name: 'Standard-2x4-Small',
        specs: {
          cpu: '2 vCPUs',
          memory: '4 GB RAM',
          storage: '20 GB SSD',
          network: '1 Gbps'
        },
        estimatedCost: {
          hourly: 50,
          monthly: 36000,
          currency: 'INR'
        },
        deploymentTime: 8000
      }
    },
    {
      id: 'step-3',
      type: 'ai_response',
      content: '💡 **Cost Optimization Tips:**\n\n• **Scheduled Start/Stop**: Save 60% by stopping during off-hours\n• **Reserved Instances**: Save up to 30% with 1-year commitment\n• **Right-sizing**: Monitor usage and downsize if needed\n• **Spot Instances**: Save 70% for fault-tolerant workloads\n\nWould you like me to set up any of these optimizations?',
      delay: 2500,
      actions: [
        { label: 'Deploy Cheapest VM', action: 'deploy', variant: 'primary' },
        { label: 'Setup Auto-Schedule', action: 'schedule', variant: 'secondary' },
        { label: 'Learn More', action: 'learn_optimization', variant: 'secondary' }
      ]
    },
    {
      id: 'step-4',
      type: 'user_action',
      content: 'User clicks "Setup Auto-Schedule"',
      delay: 3000
    },
    {
      id: 'step-5',
      type: 'ai_response',
      content: '⏰ **Auto-Schedule Configuration:**\n\n• **Start**: Monday-Friday 9:00 AM IST\n• **Stop**: Monday-Friday 7:00 PM IST\n• **Weekend**: Completely stopped\n• **Estimated Savings**: 60% (₹21,600/month)\n\nThis will deploy the VM and automatically manage its lifecycle to minimize costs.',
      delay: 2000,
      actions: [
        { label: 'Deploy with Schedule', action: 'deploy_scheduled', variant: 'primary' },
        { label: 'Customize Schedule', action: 'custom_schedule', variant: 'secondary' }
      ]
    }
  ]
};

// Scenario 4: Error Handling
export const errorHandlingScenario: DemoScenario = {
  id: 'error-handling',
  name: 'Error Handling Demo',
  description: 'Demonstrates error scenarios and recovery suggestions',
  estimatedDuration: 25,
  steps: [
    {
      id: 'step-1',
      type: 'user_input',
      content: 'Deploy a large VM with 32GB RAM',
      delay: 0
    },
    {
      id: 'step-2',
      type: 'ai_response',
      content: 'Great choice! Here\'s a powerful VM configuration:',
      delay: 1500,
      config: {
        type: 'vm',
        name: 'Standard-8x32-Large',
        specs: {
          cpu: '8 vCPUs',
          memory: '32 GB RAM',
          storage: '80 GB SSD',
          network: '5 Gbps'
        },
        estimatedCost: {
          hourly: 300,
          monthly: 216000,
          currency: 'INR'
        },
        deploymentTime: 12000
      },
      actions: [
        { label: 'Deploy Now', action: 'deploy', variant: 'primary' }
      ]
    },
    {
      id: 'step-3',
      type: 'user_action',
      content: 'User clicks "Deploy Now"',
      delay: 2000
    },
    {
      id: 'step-4',
      type: 'ai_response',
      content: '🚀 Starting deployment...',
      delay: 1000
    },
    {
      id: 'step-5',
      type: 'system_event',
      content: 'Simulated deployment failure after 3 seconds',
      delay: 3000
    },
    {
      id: 'step-6',
      type: 'ai_response',
      content: '❌ **Deployment Failed**\n\n**Issue**: Insufficient account balance\n• Required: ₹300/hour\n• Available: ₹150/hour\n• Shortfall: ₹150/hour\n\n**Solutions:**',
      delay: 1500,
      actions: [
        { label: 'Add Credits', action: 'add_credits', variant: 'primary' },
        { label: 'Choose Smaller VM', action: 'downsize', variant: 'secondary' },
        { label: 'Setup Payment Method', action: 'payment', variant: 'secondary' }
      ]
    },
    {
      id: 'step-7',
      type: 'user_action',
      content: 'User clicks "Choose Smaller VM"',
      delay: 2000
    },
    {
      id: 'step-8',
      type: 'ai_response',
      content: 'Smart choice! Let me suggest a VM that fits your current budget:',
      delay: 1500,
      config: {
        type: 'vm',
        name: 'Standard-4x16-Medium',
        specs: {
          cpu: '4 vCPUs',
          memory: '16 GB RAM',
          storage: '40 GB SSD',
          network: '2 Gbps'
        },
        estimatedCost: {
          hourly: 150,
          monthly: 108000,
          currency: 'INR'
        },
        deploymentTime: 10000
      },
      actions: [
        { label: 'Deploy Medium VM', action: 'deploy', variant: 'primary' },
        { label: 'Even Smaller', action: 'smaller', variant: 'secondary' }
      ]
    },
    {
      id: 'step-9',
      type: 'user_action',
      content: 'User clicks "Deploy Medium VM"',
      delay: 1500
    },
    {
      id: 'step-10',
      type: 'system_event',
      content: 'Successful deployment',
      delay: 10000
    },
    {
      id: 'step-11',
      type: 'ai_response',
      content: '✅ **Success!** VM deployed within budget.\n\n💡 **Pro Tip**: You can always upgrade your VM later when you add more credits. The infrastructure scales with your needs!',
      delay: 1000
    }
  ]
};

// Scenario 5: Multi-Service Setup
export const multiServiceSetup: DemoScenario = {
  id: 'multi-service-setup',
  name: 'Multi-Service Application',
  description: 'User sets up a complete application stack with VM, storage, and networking',
  estimatedDuration: 45,
  steps: [
    {
      id: 'step-1',
      type: 'user_input',
      content: 'I need to set up a complete web application with database',
      delay: 0
    },
    {
      id: 'step-2',
      type: 'ai_response',
      content: 'Excellent! A full web application stack. I\'ll help you set up:\n\n🖥️ **Web Server VM**\n💾 **Database Storage**\n🌐 **Secure Networking**\n📊 **Monitoring Setup**\n\nLet\'s start with the web server:',
      delay: 2000,
      config: {
        type: 'vm',
        name: 'Web-Server-Standard',
        specs: {
          cpu: '4 vCPUs',
          memory: '8 GB RAM',
          storage: '40 GB SSD',
          network: '2 Gbps'
        },
        estimatedCost: {
          hourly: 120,
          monthly: 86400,
          currency: 'INR'
        },
        deploymentTime: 10000
      },
      actions: [
        { label: 'Deploy Web Server', action: 'deploy', variant: 'primary' },
        { label: 'Customize Specs', action: 'modify', variant: 'secondary' }
      ]
    },
    {
      id: 'step-3',
      type: 'user_action',
      content: 'User clicks "Deploy Web Server"',
      delay: 2000
    },
    {
      id: 'step-4',
      type: 'system_event',
      content: 'Web server deployment',
      delay: 10000
    },
    {
      id: 'step-5',
      type: 'ai_response',
      content: '✅ Web server deployed! Now let\'s add database storage:',
      delay: 1000,
      config: {
        type: 'storage',
        name: 'Database-Storage',
        specs: {
          size: '200 GB',
          type: 'High-Performance SSD',
          iops: '6,000 IOPS',
          backup: 'Daily automated backups'
        },
        estimatedCost: {
          hourly: 25,
          monthly: 18000,
          currency: 'INR'
        },
        deploymentTime: 6000
      },
      actions: [
        { label: 'Add Database Storage', action: 'deploy', variant: 'primary' }
      ]
    },
    {
      id: 'step-6',
      type: 'user_action',
      content: 'User clicks "Add Database Storage"',
      delay: 1500
    },
    {
      id: 'step-7',
      type: 'system_event',
      content: 'Storage deployment',
      delay: 6000
    },
    {
      id: 'step-8',
      type: 'ai_response',
      content: '🎉 **Complete Stack Deployed!**\n\n**Your Application Infrastructure:**\n• Web Server: 203.0.113.42\n• Database Storage: 200GB attached\n• Total Cost: ₹145/hour\n\n**Next Steps:**\n• Configure your web application\n• Set up SSL certificates\n• Configure database connections\n• Set up monitoring alerts',
      delay: 1500,
      actions: [
        { label: 'View Complete Setup', action: 'view_stack', variant: 'primary' },
        { label: 'Add Load Balancer', action: 'add_lb', variant: 'secondary' }
      ]
    }
  ]
};

// All scenarios collection
export const demoScenarios: DemoScenario[] = [
  quickVMDeploy,
  customAIRequirements,
  costConsciousUser,
  errorHandlingScenario,
  multiServiceSetup
];

// Scenario execution helper
export const executeScenario = (scenarioId: string): DemoScenario | null => {
  return demoScenarios.find(scenario => scenario.id === scenarioId) || null;
};

export default {
  demoScenarios,
  quickVMDeploy,
  customAIRequirements,
  costConsciousUser,
  errorHandlingScenario,
  multiServiceSetup,
  executeScenario
};
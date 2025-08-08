// Mock AI Assistant Responses for Krutrim Cloud AI Assistant Prototype
// This file contains predefined conversation flows and responses for demo purposes

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  config?: any;
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'primary' | 'secondary' | 'destructive';
  }>;
  status?: 'typing' | 'sent' | 'deployed' | 'error';
}

export interface DeploymentConfig {
  type: 'vm' | 'storage' | 'network' | 'ai-pod';
  name: string;
  specs: Record<string, any>;
  estimatedCost: {
    hourly: number;
    monthly: number;
    currency: 'INR';
  };
  deploymentTime: number; // in seconds
}

// Predefined VM configurations
export const VM_PRESETS = {
  small: {
    name: 'Standard-2x4',
    cpu: 2,
    memory: '4 GB',
    storage: '20 GB SSD',
    hourly: 8.50,
    monthly: 6120,
  },
  medium: {
    name: 'Standard-4x8',
    cpu: 4,
    memory: '8 GB',
    storage: '40 GB SSD',
    hourly: 16.80,
    monthly: 12096,
  },
  large: {
    name: 'Standard-8x16',
    cpu: 8,
    memory: '16 GB',
    storage: '80 GB SSD',
    hourly: 33.60,
    monthly: 24192,
  },
  gpu: {
    name: 'GPU-4x16-T4',
    cpu: 4,
    memory: '16 GB',
    storage: '50 GB SSD',
    gpu: 'NVIDIA T4',
    hourly: 125.00,
    monthly: 90000,
  }
};

// Storage configurations
export const STORAGE_PRESETS = {
  object: {
    small: { size: '100 GB', monthly: 150, type: 'Object Storage' },
    medium: { size: '1 TB', monthly: 1440, type: 'Object Storage' },
    large: { size: '10 TB', monthly: 14400, type: 'Object Storage' },
  },
  block: {
    small: { size: '50 GB', monthly: 450, type: 'Block Storage', iops: 3000 },
    medium: { size: '200 GB', monthly: 1800, type: 'Block Storage', iops: 6000 },
    large: { size: '1 TB', monthly: 9000, type: 'Block Storage', iops: 15000 },
  }
};

// Mock conversation flows
export const CONVERSATION_FLOWS = {
  vm_deployment: [
    {
      user: "I need to deploy a virtual machine for my web application",
      assistant: "I'd be happy to help you deploy a VM for your web application! Let me gather some details:\n\n**Quick Questions:**\n• What's the expected traffic/load?\n• Do you need a database on the same VM?\n• Any specific OS preference?\n\n**Recommendation:** For most web apps, I'd suggest starting with our **Standard-4x8** configuration (4 vCPU, 8GB RAM) for ₹16.80/hour.",
      config: {
        type: 'vm',
        preset: 'medium'
      }
    },
    {
      user: "Medium traffic, yes database, Ubuntu preferred",
      assistant: "Perfect! Here's what I recommend for your setup:\n\n📋 **VM Configuration:**\n• **Instance Type:** Standard-4x8\n• **OS:** Ubuntu 22.04 LTS\n• **vCPU:** 4 cores\n• **Memory:** 8 GB\n• **Storage:** 40 GB SSD (expandable)\n• **Network:** 1 Gbps\n\n💰 **Cost Estimate:**\n• Hourly: ₹16.80\n• Monthly: ₹12,096\n\n🔧 **Included:** Auto-backups, monitoring, security groups\n\nShall I proceed with this configuration?",
      actions: [
        { label: "Deploy Now", action: "deploy", variant: "primary" },
        { label: "Modify Config", action: "modify", variant: "secondary" },
        { label: "Show Advanced Options", action: "advanced", variant: "secondary" }
      ]
    }
  ],

  storage_setup: [
    {
      user: "I need storage for my application data and backups",
      assistant: "Great! Let me help you set up the right storage solution. \n\n🗂️ **Storage Types Available:**\n• **Object Storage** - For files, backups, static assets\n• **Block Storage** - For databases, high-performance apps\n\n❓ **What type of data will you be storing?**\n• Application files and user uploads\n• Database files\n• Backup and archival data\n• Static website assets",
      config: {
        type: 'storage'
      }
    },
    {
      user: "Database files and application backups",
      assistant: "Perfect! For database files and backups, I recommend a hybrid approach:\n\n💾 **Recommended Setup:**\n\n**1. Block Storage (Database)**\n• Size: 200 GB\n• IOPS: 6,000\n• Monthly: ₹1,800\n\n**2. Object Storage (Backups)**\n• Size: 1 TB\n• Monthly: ₹1,440\n\n📊 **Total Monthly Cost:** ₹3,240\n\n✨ **Features:**\n• Automatic encryption\n• Daily snapshots\n• 99.99% durability\n• Cross-region replication available\n\nShall I create both storage volumes?",
      actions: [
        { label: "Create Storage", action: "deploy", variant: "primary" },
        { label: "Adjust Sizes", action: "modify", variant: "secondary" }
      ]
    }
  ],

  network_config: [
    {
      user: "Set up networking for my multi-tier application",
      assistant: "I'll help you design a secure network architecture for your multi-tier app!\n\n🏗️ **Recommended Architecture:**\n\n**VPC Setup:**\n• Private VPC with CIDR: 10.0.0.0/16\n• Region: Mumbai (ap-south-1)\n\n**Subnets:**\n• Public subnet (Web tier): 10.0.1.0/24\n• Private subnet (App tier): 10.0.2.0/24\n• Database subnet: 10.0.3.0/24\n\n**Security Groups:**\n• Web-SG: HTTP/HTTPS (80, 443)\n• App-SG: Custom ports from Web-SG\n• DB-SG: Database ports from App-SG only\n\n💰 **Cost:** ₹450/month for VPC + Security Groups\n\nShall I create this network setup?",
      actions: [
        { label: "Create Network", action: "deploy", variant: "primary" },
        { label: "Customize Subnets", action: "modify", variant: "secondary" }
      ]
    }
  ],

  ai_pod_deployment: [
    {
      user: "I want to deploy an AI model for image recognition",
      assistant: "Excellent! I'll help you deploy an AI Pod optimized for image recognition models.\n\n🤖 **AI Pod Configuration:**\n\n**Hardware:**\n• GPU: NVIDIA T4 (16GB VRAM)\n• vCPU: 4 cores\n• Memory: 16 GB RAM\n• Storage: 50 GB SSD\n\n**Pre-installed:**\n• PyTorch, TensorFlow\n• CUDA drivers\n• Jupyter Notebook\n• Model serving frameworks\n\n💰 **Pricing:**\n• Hourly: ₹125.00\n• Monthly: ₹90,000\n\n⚡ **Deployment Time:** ~3 minutes\n\nWhich framework would you prefer for your model?",
      config: {
        type: 'ai-pod',
        preset: 'gpu'
      },
      actions: [
        { label: "Deploy with PyTorch", action: "deploy_pytorch", variant: "primary" },
        { label: "Deploy with TensorFlow", action: "deploy_tf", variant: "primary" },
        { label: "Custom Setup", action: "custom", variant: "secondary" }
      ]
    }
  ]
};

// Mock responses for common user inputs
export const MOCK_RESPONSES: Record<string, any> = {
  // Greetings and general
  "hello": {
    response: "Hello! I'm your StackSense Cloud Assistant. I can help you deploy and manage cloud infrastructure through simple conversations.\n\n**What can I help you with today?**\n• Deploy Virtual Machines\n• Set up Storage solutions\n• Configure Networks\n• Launch AI Pods\n• Monitor resources\n• Optimize costs\n\nJust describe what you need in natural language!",
    suggestions: [
      "Deploy a VM for my web app",
      "Set up storage for my database",
      "Create a secure network",
      "Launch an AI model"
    ]
  },

  "help": {
    response: "I'm here to help! Here's what I can do for you:\n\n**Compute Services:**\n• Deploy VMs with custom specs\n• Launch GPU-powered AI Pods\n• Set up auto-scaling groups\n\n**Storage Solutions:**\n• Create object storage buckets\n• Provision block storage volumes\n• Set up backup strategies\n\n**Networking:**\n• Design VPC architectures\n• Configure security groups\n• Set up load balancers\n\n**Monitoring & Optimization:**\n• Cost analysis and recommendations\n• Performance monitoring\n• Resource utilization reports\n\nWhat would you like to start with?",
  },

  "cost": {
    response: "**Current Account Status:**\n• Balance: ₹15,750\n• This month's usage: ₹2,340\n• Projected monthly bill: ₹8,500\n\n**Cost Breakdown:**\n• Compute: ₹1,680 (72%)\n• Storage: ₹480 (20%)\n• Network: ₹180 (8%)\n\n**Optimization Suggestions:**\n• Switch 2 idle VMs to scheduled start/stop: Save ₹1,200/month\n• Use reserved instances: Save up to 30%\n• Archive old backups: Save ₹200/month\n\nWould you like me to implement any of these optimizations?",
    actions: [
      { label: "Schedule VMs", action: "schedule_vms", variant: "primary" },
      { label: "Show Reserved Pricing", action: "reserved_pricing", variant: "secondary" }
    ]
  },

  "list resources": {
    response: "📋 **Your Current Resources:**\n\n**🖥️ Virtual Machines (3)**\n• web-server-01 - Running (₹16.80/hr)\n• api-server-01 - Running (₹8.50/hr)\n• dev-server-01 - Stopped\n\n**💾 Storage (2)**\n• app-data-storage - 200GB Block (₹1,800/month)\n• backup-bucket - 500GB Object (₹720/month)\n\n**🌐 Network**\n• prod-vpc - Mumbai region\n• 3 Security Groups configured\n\n**📊 Usage:**\n• Total monthly cost: ₹8,500\n• 85% of compute quota used\n\nNeed help with any of these resources?",
    actions: [
      { label: "Monitor Performance", action: "monitor", variant: "secondary" },
      { label: "Optimize Costs", action: "optimize", variant: "primary" }
    ]
  },

  // Error handling
  "error_generic": {
    response: "I apologize, but I didn't quite understand that. Could you please rephrase your request?\n\n💡 **Try asking me to:**\n• \"Deploy a VM for my application\"\n• \"Set up storage for my database\"\n• \"Show my current resources\"\n• \"Help me optimize costs\"\n\nOr use the suggestions below to get started!",
    suggestions: [
      "Deploy a new VM",
      "Check my billing",
      "List my resources",
      "Set up storage"
    ]
  }
};

// Sample deployment scenarios with realistic timing
export const DEPLOYMENT_SCENARIOS = {
  vm: {
    steps: [
      { step: "Validating configuration...", duration: 1000 },
      { step: "Allocating resources...", duration: 2000 },
      { step: "Installing OS (Ubuntu 22.04)...", duration: 3000 },
      { step: "Configuring network...", duration: 1500 },
      { step: "Setting up security groups...", duration: 1000 },
      { step: "Starting instance...", duration: 1500 },
    ],
    success: "🎉 **VM Deployed Successfully!**\n\n📋 **Instance Details:**\n• Instance ID: i-0abc123def456\n• Public IP: 203.0.113.42\n• Private IP: 10.0.1.15\n• Status: Running\n\n🔐 **Access:**\n• SSH: `ssh ubuntu@203.0.113.42`\n• Console access available in dashboard\n\n⚡ **Next Steps:**\n• Configure your application\n• Set up monitoring alerts\n• Create backup schedule",
    totalTime: 10000
  },

  storage: {
    steps: [
      { step: "Creating storage volumes...", duration: 1000 },
      { step: "Configuring encryption...", duration: 1500 },
      { step: "Setting up access policies...", duration: 1000 },
      { step: "Enabling backups...", duration: 2000 },
    ],
    success: "🎉 **Storage Created Successfully!**\n\n📦 **Volume Details:**\n• Volume ID: vol-0xyz789abc123\n• Size: 200 GB\n• Type: gp3 (High Performance)\n• Encryption: Enabled\n\n📊 **Performance:**\n• IOPS: 6,000\n• Throughput: 250 MB/s\n• Availability: 99.99%\n\n🔧 **Mount Instructions:**\n```bash\nsudo mount /dev/xvdf /mnt/data\n```",
    totalTime: 5500
  },

  network: {
    steps: [
      { step: "Creating VPC...", duration: 1000 },
      { step: "Setting up subnets...", duration: 1500 },
      { step: "Configuring route tables...", duration: 1000 },
      { step: "Creating security groups...", duration: 1500 },
      { step: "Setting up internet gateway...", duration: 1000 },
    ],
    success: "🎉 **Network Configuration Complete!**\n\n🌐 **VPC Details:**\n• VPC ID: vpc-0abc123def456\n• CIDR: 10.0.0.0/16\n• Region: ap-south-1 (Mumbai)\n\n🏗️ **Subnets Created:**\n• Public: 10.0.1.0/24\n• Private: 10.0.2.0/24\n• Database: 10.0.3.0/24\n\n🔒 **Security Groups:**\n• Web-tier, App-tier, DB-tier configured\n• Best practices applied automatically",
    totalTime: 7000
  },

  'ai-pod': {
    steps: [
      { step: "Allocating GPU resources...", duration: 2000 },
      { step: "Installing ML frameworks...", duration: 4000 },
      { step: "Configuring CUDA drivers...", duration: 2000 },
      { step: "Setting up Jupyter environment...", duration: 1500 },
      { step: "Loading model libraries...", duration: 2500 },
    ],
    success: "🎉 **AI Pod Deployed Successfully!**\n\n🤖 **Pod Details:**\n• Pod ID: ai-pod-0abc123\n• GPU: NVIDIA T4 (16GB)\n• Jupyter URL: https://ai-pod-0abc123.krutrim.cloud\n• SSH Access: Enabled\n\n📚 **Pre-installed:**\n• PyTorch 2.0.1\n• TensorFlow 2.13\n• Transformers library\n• OpenCV, NumPy, Pandas\n\n🚀 **Ready for:**\n• Model training\n• Inference serving\n• Data processing",
    totalTime: 12000
  }
};

// Cost calculation utilities
export const calculateCost = (resourceType: string, size: string, duration: 'hourly' | 'monthly' = 'monthly') => {
  const costs: Record<string, Record<string, any>> = {
    vm: VM_PRESETS,
    storage: STORAGE_PRESETS.block,
    object_storage: STORAGE_PRESETS.object,
  };

  const resource = costs[resourceType]?.[size];
  if (!resource) return { amount: 0, currency: 'INR' };

  return {
    amount: duration === 'hourly' ? resource.hourly : resource.monthly,
    currency: 'INR'
  };
};

// Generate random resource IDs
export const generateResourceId = (type: string): string => {
  const prefixes: Record<string, string> = {
    vm: 'i-',
    storage: 'vol-',
    network: 'vpc-',
    'ai-pod': 'ai-pod-',
    subnet: 'subnet-',
    sg: 'sg-'
  };
  
  const prefix = prefixes[type] || 'res-';
  const randomId = Math.random().toString(36).substring(2, 15);
  return `${prefix}${randomId}`;
};

export default {
  CONVERSATION_FLOWS,
  MOCK_RESPONSES,
  DEPLOYMENT_SCENARIOS,
  VM_PRESETS,
  STORAGE_PRESETS,
  calculateCost,
  generateResourceId
};
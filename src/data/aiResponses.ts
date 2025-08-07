// Mock AI response data for the Krutrim Cloud AI Assistant
// Contains welcome messages, configurations, and contextual responses

export const aiResponses = {
  general: [
    "Hello! I can help you deploy cloud resources. What would you like to create today? 🚀",
    "Hi there! Need help setting up VMs, storage, or AI workloads? I'm here to assist! 💻",
    "Welcome to Krutrim Cloud! I can help you provision virtual machines, configure storage, or deploy AI infrastructure. What's your goal today?",
    "Hey! Ready to build something amazing? I can help you with VMs, storage, networking, or AI workloads. What do you need?",
    "Greetings! I'm your cloud assistant. Whether you need compute power, storage solutions, or AI infrastructure, I've got you covered! ⚡",
    "Hello! Let's get your cloud infrastructure set up. I can deploy VMs, configure storage, or help with AI workloads. What would you like to start with?"
  ],
  
  vm: [
    "Great choice! I'll help you set up a virtual machine. Let me configure the perfect VM for your needs.",
    "Perfect! Let's get your VM deployed. I'll recommend a configuration based on your requirements.",
    "Excellent! Virtual machines coming right up. I'll set up an optimized configuration for you.",
    "Awesome! Let me create a VM that matches your workload requirements.",
    "Nice! I'll configure a virtual machine with the right specs for your use case."
  ],
  
  storage: [
    "Perfect! I'll help you set up the right storage solution. Let me configure something that fits your data needs.",
    "Great! Storage is crucial for any application. I'll set up a reliable storage configuration for you.",
    "Excellent choice! Let me configure the optimal storage solution for your requirements.",
    "Smart thinking! I'll get your storage infrastructure ready with the right performance and capacity.",
    "Good call! Let's set up storage that's both performant and cost-effective for your needs."
  ],
  
  'ai-pod': [
    "Exciting! AI workloads need special attention. I'll configure a GPU-powered pod for your machine learning tasks.",
    "Perfect for AI! Let me set up a high-performance pod with GPU acceleration for your models.",
    "Great choice! AI Pods are perfect for training and inference. I'll configure the optimal setup.",
    "Awesome! Machine learning requires serious compute power. I'll get you a GPU-enabled pod.",
    "Excellent! Let's deploy an AI Pod with the right GPU configuration for your workload."
  ],
  
  network: [
    "Smart! Network security is fundamental. I'll design a secure and scalable network architecture.",
    "Great thinking! Let me set up a robust network configuration with proper security groups.",
    "Perfect! Network planning is crucial. I'll configure VPCs, subnets, and security for you.",
    "Excellent! I'll design a network that's both secure and optimized for your applications.",
    "Good call! Let's build a network infrastructure that scales with your needs."
  ],
  
  cost: [
    "I'll help you optimize costs! Let me show you budget-friendly options that don't compromise on performance.",
    "Smart to think about costs! I'll find you the most cost-effective solution for your needs.",
    "Great question! Let me break down pricing and show you how to get the best value.",
    "Budget-conscious approach! I'll help you maximize your cloud spending efficiency.",
    "Wise thinking! Let me show you cost-effective options and optimization strategies."
  ],
  
  resources: [
    "Let me show you all your current resources and their status. Here's your infrastructure overview:",
    "Good idea to check! Here's a complete view of your deployed resources and their performance:",
    "Smart monitoring! Let me give you a comprehensive overview of your cloud infrastructure:",
    "Great practice! Here's your current resource utilization and status dashboard:",
    "Perfect timing! Let me show you what's running and how everything is performing:"
  ],
  
  success: [
    "🎉 Deployment successful!",
    "✅ All done! Your resource is now live.",
    "🚀 Successfully deployed!",
    "✨ Great! Everything is up and running.",
    "🎯 Perfect! Your infrastructure is ready.",
    "💪 Excellent! Deployment completed successfully.",
    "🌟 Fantastic! Your resource is now available.",
    "⚡ Boom! Successfully provisioned and ready to use."
  ],
  
  error: [
    "❌ Oops! Something went wrong. Let me help you troubleshoot this.",
    "⚠️ Deployment failed. Don't worry, let's try a different approach.",
    "💥 Hit a snag! Let me check what happened and suggest a solution.",
    "🔧 Error encountered. I'll help you resolve this quickly.",
    "⛔ Something's not right. Let me diagnose and fix this for you.",
    "🚨 Deployment issue detected. Let's get this sorted out."
  ]
};

// VM Configuration presets
export const vmConfigurations = {
  small: {
    type: 'vm' as const,
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
      currency: 'INR' as const
    },
    deploymentTime: 8000
  },
  
  medium: {
    type: 'vm' as const,
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
      currency: 'INR' as const
    },
    deploymentTime: 10000
  },
  
  large: {
    type: 'vm' as const,
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
      currency: 'INR' as const
    },
    deploymentTime: 12000
  }
};

// AI Pod configurations
export const aiPodConfigurations = {
  gpu: {
    type: 'ai-pod' as const,
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
      currency: 'INR' as const
    },
    deploymentTime: 15000
  }
};

// Storage configurations
export const storageConfigurations = {
  small: {
    type: 'storage' as const,
    name: 'Block-Storage-Small',
    specs: {
      size: '100 GB',
      type: 'SSD Block Storage',
      iops: '3,000 IOPS',
      throughput: '125 MB/s'
    },
    estimatedCost: {
      hourly: 6,
      monthly: 4320,
      currency: 'INR' as const
    },
    deploymentTime: 5000
  },
  
  medium: {
    type: 'storage' as const,
    name: 'Block-Storage-Medium',
    specs: {
      size: '500 GB',
      type: 'SSD Block Storage',
      iops: '6,000 IOPS',
      throughput: '250 MB/s'
    },
    estimatedCost: {
      hourly: 25,
      monthly: 18000,
      currency: 'INR' as const
    },
    deploymentTime: 6000
  },
  
  large: {
    type: 'storage' as const,
    name: 'Block-Storage-Large',
    specs: {
      size: '2 TB',
      type: 'High-Performance SSD',
      iops: '15,000 IOPS',
      throughput: '500 MB/s'
    },
    estimatedCost: {
      hourly: 84,
      monthly: 60480,
      currency: 'INR' as const
    },
    deploymentTime: 8000
  }
};

// Contextual response modifiers
export const responseModifiers = {
  budget: {
    vm: "I'll find you a cost-effective option! Here's a budget-friendly VM that still delivers great performance:",
    storage: "Let's go with an economical storage solution that gives you good value for money:",
    'ai-pod': "For budget-conscious AI workloads, I recommend starting with shared GPU resources:"
  },
  
  performance: {
    vm: "I'll configure a high-performance setup for you! Here's a powerful VM configuration:",
    storage: "You need speed! Let me set up high-performance storage with maximum IOPS:",
    'ai-pod': "For demanding AI workloads, here's a premium GPU configuration:"
  },
  
  quick: {
    vm: "Let me set up a standard configuration that covers most use cases:",
    storage: "I'll configure a balanced storage solution that's ready to use:",
    'ai-pod': "Here's a popular AI Pod configuration that works great for most ML tasks:"
  }
};

// Welcome messages for different contexts
export const welcomeMessages = {
  firstTime: [
    "Welcome to Krutrim Cloud! 🎉 I'm your AI assistant, ready to help you deploy your first cloud resources. What would you like to build?",
    "Hello and welcome! 👋 I'm here to make cloud deployment simple. Whether you need VMs, storage, or AI infrastructure, I'll guide you through it!",
    "Great to meet you! 🚀 I'm your cloud companion. Let's start by deploying your first resource - what do you have in mind?"
  ],
  
  returning: [
    "Welcome back! 😊 Ready to deploy more amazing infrastructure? I can see your current setup and help you expand it.",
    "Hello again! 👋 I see you've been busy building. What would you like to add to your cloud setup today?",
    "Good to see you! 🌟 Your infrastructure is looking good. What's the next piece of the puzzle?"
  ],
  
  powerUser: [
    "Hey there, cloud architect! 💪 I can see you know your way around. What advanced setup can I help you deploy today?",
    "Welcome back, expert! 🎯 Ready for another sophisticated deployment? I'm here to handle the heavy lifting.",
    "Hello, cloud master! ⚡ What complex infrastructure challenge shall we tackle together today?"
  ]
};

export default {
  aiResponses,
  vmConfigurations,
  aiPodConfigurations,
  storageConfigurations,
  responseModifiers,
  welcomeMessages
};
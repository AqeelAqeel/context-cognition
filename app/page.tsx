'use client';

import { useState, useEffect } from 'react';
import { MachineState, PersistentState, DerivedVars, ContextPack } from '@/lib/contracts';
import { Message, ceTurn } from '@/lib/ce';
import { oaRun } from '@/lib/oa';
import { buildContextPack, compileSystemPrompt } from '@/lib/co';
import { bus } from '@/lib/eventBus';
import { seededPersistent, seededMachineSlack, seededMachinePitch, seededMachineMedicare } from '@/lib/mockData';
import { StatePanel } from '@/components/StatePanel';
import { EventFeed } from '@/components/EventFeed';
import { ModalStack, useModals } from '@/components/ModalStack';
import { UseCaseTabs } from '@/components/UseCaseTabs';
import { ChatCanvas } from '@/components/ChatCanvas';
import { ConversionStrip, generateConversionActions } from '@/components/ConversionStrip';
import { LayerPanel } from '@/components/LayerPanel';

export default function ACFDemo() {
  // Core state
  const [persistentState] = useState<PersistentState>(seededPersistent);
  const [machineState, setMachineState] = useState<MachineState>(seededMachineSlack);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Derived state
  const [derivedVars, setDerivedVars] = useState<DerivedVars>(() => oaRun(machineState, persistentState));
  const [contextPack, setContextPack] = useState<ContextPack>(() => buildContextPack(machineState, persistentState, derivedVars));
  const [compiledPrompt, setCompiledPrompt] = useState<string>(() => compileSystemPrompt(contextPack));
  
  // UI state
  const { modals, showModal, dismissModal } = useModals();

  // Update derived state when machine state changes
  useEffect(() => {
    const newDerivedVars = oaRun(machineState, persistentState);
    setDerivedVars(newDerivedVars);
    
    const newContextPack = buildContextPack(machineState, persistentState, newDerivedVars);
    setContextPack(newContextPack);
    
    const newCompiledPrompt = compileSystemPrompt(newContextPack);
    setCompiledPrompt(newCompiledPrompt);
  }, [machineState.route, machineState.ui.panel, machineState.featureFlags]);

  // Separate effect for modal triggers to avoid infinite loops
  useEffect(() => {
    if (persistentState.budgets.tokensLeft < 2000) {
      showModal({
        type: 'budget',
        layer: 'co',
        title: 'Low Budget Warning',
        message: `Only ${persistentState.budgets.tokensLeft} tokens remaining. Heavy tools will be disabled.`
      });
    }
    
    if (derivedVars.riskFlags.includes('cognitive_load')) {
      showModal({
        type: 'risk',
        layer: 'oa',
        title: 'Cognitive Load Risk',
        message: 'This interface may be complex for older users. Consider simplifying interactions.'
      });
    }
  }, [derivedVars.riskFlags, persistentState.budgets.tokensLeft, showModal]);

  const handleRouteChange = (route: string) => {
    let newMachineState: MachineState;
    
    if (route.startsWith('/slack')) {
      newMachineState = { ...seededMachineSlack, timeISO: new Date().toISOString() };
    } else if (route.startsWith('/pitch')) {
      newMachineState = { ...seededMachinePitch, timeISO: new Date().toISOString() };
    } else {
      newMachineState = { ...seededMachineMedicare, timeISO: new Date().toISOString() };
    }
    
    setMachineState(newMachineState);
    setMessages([]); // Clear chat when switching tabs
    
    bus.emit('state_changed', {
      key: 'route',
      oldValue: machineState.route,
      newValue: route
    });
  };

  const handleFeatureFlagToggle = (flag: string, value: boolean) => {
    const newMachineState = {
      ...machineState,
      featureFlags: { ...machineState.featureFlags, [flag]: value },
      timeISO: new Date().toISOString()
    };
    
    setMachineState(newMachineState);
    
    bus.emit('state_changed', {
      key: `featureFlags.${flag}`,
      oldValue: machineState.featureFlags[flag],
      newValue: value
    });
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    bus.emit('message_submitted', {
      text,
      sender: 'user'
    });

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Generate AI response using CE
    const aiMessage = ceTurn(text, contextPack);
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
    
    bus.emit('message_submitted', {
      text: aiMessage.text,
      sender: 'assistant'
    });
  };

  const handleConversionAction = (intent: string) => {
    // Convert intent to user message
    const intentMessages: Record<string, string> = {
      'create_checklist': 'Please create a rollout checklist for our feature deployment',
      'generate_outline': 'Generate a pitch outline for investors',
      'prefill_form': 'Help me pre-fill the Medicare Part B form',
      'validate_bindings': 'Validate our message templates',
      'extract_proof_points': 'Extract key proof points from our data',
      'refine_narrative': 'Help refine our fundraising narrative',
      'call_script': 'Generate a script for calling Medicare support'
    };
    
    const message = intentMessages[intent] || `Please help with: ${intent}`;
    handleSendMessage(message);
  };

  const conversionActions = generateConversionActions(
    derivedVars.affordances,
    contextPack.objectives,
    machineState.route,
    persistentState.budgets
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto">
        {/* Modern Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Adaptive Context Framework
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                3-Layer LLM Architecture Visualization Platform
              </p>
              <p className="text-sm text-gray-500 mt-1 font-mono">
                CE → OA → CO Pipeline
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Active Session</div>
                <div className="text-lg font-semibold text-green-600">Live</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar: System Monitoring */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  System Monitor
                </h2>
                
                {/* Modals */}
                <div className="mb-6">
                  <ModalStack modals={modals} onDismiss={dismissModal} />
                </div>
                
                {/* State Panel */}
                <StatePanel
                  machineState={machineState}
                  persistentState={persistentState}
                  onFeatureFlagToggle={handleFeatureFlagToggle}
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Activity Log
                </h3>
                <EventFeed />
              </div>
            </div>

            {/* Main Content: Chat Experience */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Interactive Experience
                  </h2>
                </div>
                
                {/* Use Case Tabs */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <UseCaseTabs
                    activeRoute={machineState.route}
                    onRouteChange={handleRouteChange}
                  />
                </div>
                
                {/* Chat Canvas */}
                <div className="p-6">
                  <ChatCanvas
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isTyping={isTyping}
                  />
                </div>
              </div>
              
              {/* Conversion Strip */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <ConversionStrip
                  actions={conversionActions}
                  onActionClick={handleConversionAction}
                />
              </div>
            </div>
          </div>
        
          {/* Layer Architecture Section - Clean & Spacious */}
          <div className="mt-12 space-y-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Architecture Layers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real-time visibility into the 3-layer intelligent system processing your requests
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Layer B: Observer/Analyst */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-1">
                <LayerPanel 
                  type="oa"
                  derivedVars={derivedVars}
                />
              </div>
              
              {/* Layer C: Conductor/Orchestrator */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-1">
                <LayerPanel
                  type="co" 
                  contextPack={contextPack}
                  compiledPrompt={compiledPrompt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
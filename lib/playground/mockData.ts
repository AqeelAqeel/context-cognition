// ============================================
// Infinite Canvas Playground - Mock Data
// ============================================

import {
  HumanStatesData,
  HumanStateId,
  DatabaseData,
  InterfaceLayerData,
  PromptChainData,
  DataSourcesData,
  KnowledgeBaseData,
  LivingDocumentsData,
  CoreFunctionsData
} from './types';

// ----- Human States Mock Data -----

export const humanStatesData: HumanStatesData = {
  selectedState: 'state_1',
  states: [
    {
      id: 'state_1',
      name: 'State One',
      metaDescription: 'Initial awareness state - baseline cognition',
      color: '#3B82F6',
      characteristics: ['Receptive', 'Open', 'Scanning'],
      triggeredBy: ['session_start', 'context_reset', 'new_input'],
      leadsTo: ['state_2', 'state_3'],
      activePrompts: ['base_context', 'greeting_handler'],
      cognitiveLoad: 20,
      attentionFocus: 'broad'
    },
    {
      id: 'state_2',
      name: 'State Two',
      metaDescription: 'Engaged attention - focused processing',
      color: '#8B5CF6',
      characteristics: ['Focused', 'Attentive', 'Processing'],
      triggeredBy: ['user_input', 'task_assignment'],
      leadsTo: ['state_3', 'state_4'],
      activePrompts: ['focus_handler', 'task_analyzer'],
      cognitiveLoad: 45,
      attentionFocus: 'narrow'
    },
    {
      id: 'state_3',
      name: 'State Three',
      metaDescription: 'Deep analysis - pattern recognition active',
      color: '#EC4899',
      characteristics: ['Analytical', 'Pattern-seeking', 'Deep'],
      triggeredBy: ['complex_query', 'analysis_request'],
      leadsTo: ['state_4', 'state_5'],
      activePrompts: ['analysis_deep', 'pattern_match'],
      cognitiveLoad: 75,
      attentionFocus: 'narrow'
    },
    {
      id: 'state_4',
      name: 'State Four',
      metaDescription: 'Creative synthesis - novel connections',
      color: '#F59E0B',
      characteristics: ['Creative', 'Synthesizing', 'Connecting'],
      triggeredBy: ['synthesis_needed', 'creative_task'],
      leadsTo: ['state_5', 'state_6'],
      activePrompts: ['creative_mode', 'synthesis_engine'],
      cognitiveLoad: 65,
      attentionFocus: 'diffuse'
    },
    {
      id: 'state_5',
      name: 'State Five',
      metaDescription: 'Decision crystallization - choice formation',
      color: '#10B981',
      characteristics: ['Decisive', 'Crystallizing', 'Converging'],
      triggeredBy: ['decision_point', 'options_ready'],
      leadsTo: ['state_6'],
      activePrompts: ['decision_maker', 'option_evaluator'],
      cognitiveLoad: 55,
      attentionFocus: 'narrow'
    },
    {
      id: 'state_6',
      name: 'State Six',
      metaDescription: 'Action execution - implementation mode',
      color: '#EF4444',
      characteristics: ['Active', 'Executing', 'Implementing'],
      triggeredBy: ['decision_made', 'action_trigger'],
      leadsTo: ['state_7', 'state_1'],
      activePrompts: ['action_executor', 'implementation_guide'],
      cognitiveLoad: 80,
      attentionFocus: 'narrow'
    },
    {
      id: 'state_7',
      name: 'State Seven',
      metaDescription: 'Reflection integration - learning consolidation',
      color: '#6366F1',
      characteristics: ['Reflective', 'Integrating', 'Learning'],
      triggeredBy: ['task_complete', 'reflection_trigger'],
      leadsTo: ['state_1', 'state_2'],
      activePrompts: ['reflection_mode', 'learning_consolidator'],
      cognitiveLoad: 35,
      attentionFocus: 'diffuse'
    }
  ]
};

// ----- Database Mock Data -----

export const databaseData: DatabaseData = {
  bars: [
    { id: 'db_1', category: 'user_context', label: 'user_context', color: '#06B6D4', fillLevel: 78, status: 'partial', lastUpdated: '2s ago', recordCount: 1247, isActive: true },
    { id: 'db_2', category: 'session_memory', label: 'session_memory', color: '#A855F7', fillLevel: 42, status: 'partial', lastUpdated: '5s ago', recordCount: 523, isActive: true },
    { id: 'db_3', category: 'persistent_goals', label: 'persistent_goals', color: '#22C55E', fillLevel: 100, status: 'full', lastUpdated: '1m ago', recordCount: 89, isActive: true },
    { id: 'db_4', category: 'interaction_history', label: 'interaction_history', color: '#3B82F6', fillLevel: 56, status: 'partial', lastUpdated: '10s ago', recordCount: 3421, isActive: false },
    { id: 'db_5', category: 'derived_insights', label: 'derived_insights', color: '#EC4899', fillLevel: 15, status: 'partial', lastUpdated: '30s ago', recordCount: 156, isActive: true },
    { id: 'db_6', category: 'system_config', label: 'system_config', color: '#6B7280', fillLevel: 100, status: 'full', lastUpdated: '5m ago', recordCount: 42, isActive: true },
    { id: 'db_7', category: 'prompt_templates', label: 'prompt_templates', color: '#F59E0B', fillLevel: 72, status: 'partial', lastUpdated: '2m ago', recordCount: 287, isActive: false },
    { id: 'db_8', category: 'knowledge_graph', label: 'knowledge_graph', color: '#6366F1', fillLevel: 89, status: 'partial', lastUpdated: '15s ago', recordCount: 4562, isActive: true }
  ],
  totalSize: 24.5,
  maxSize: 50
};

// ----- Interface Layer Mock Data -----

export const interfaceLayerData: InterfaceLayerData = {
  localStorage: {
    items: [
      { key: 'user_preferences', value: {}, type: 'object', size: 1024, createdAt: '2024-01-01', updatedAt: '2024-01-15', accessCount: 342 },
      { key: 'cached_responses', value: [], type: 'array', size: 2048, createdAt: '2024-01-10', updatedAt: '2024-01-15', accessCount: 128 }
    ],
    totalSize: 3.4,
    maxSize: 5
  },
  sessionStorage: {
    items: [
      { key: 'current_context', value: {}, type: 'object', size: 512, createdAt: '2024-01-15', updatedAt: '2024-01-15', accessCount: 45 },
      { key: 'temp_state', value: {}, type: 'object', size: 256, createdAt: '2024-01-15', updatedAt: '2024-01-15', accessCount: 12 }
    ],
    totalSize: 1.7,
    maxSize: 5
  },
  interSessionStorage: {
    items: [
      { key: 'user_profile', value: {}, type: 'object', size: 2048, createdAt: '2024-01-01', updatedAt: '2024-01-15', accessCount: 89 }
    ],
    totalSize: 4.1,
    maxSize: 5,
    syncStatus: 'synced',
    lastSync: '5s ago'
  },
  associatedPrompts: [
    { id: 'p1', name: 'context_loader', trigger: { type: 'variable_filled', condition: 'user_id EXISTS', variables: ['user_id'] }, template: '...', priority: 1, isActive: true },
    { id: 'p2', name: 'session_init', trigger: { type: 'event', condition: 'session_start', variables: [] }, template: '...', priority: 2, isActive: true },
    { id: 'p3', name: 'data_persist', trigger: { type: 'threshold', condition: 'items > 10', variables: ['items'] }, template: '...', priority: 3, isActive: false }
  ]
};

// ----- Prompt Chain Mock Data -----

export const promptChainData: PromptChainData = {
  prompts: [
    { id: 'ctx_builder', name: 'Context Builder', category: 'interface_layer', template: '...', variables: [{ name: 'user_id', type: 'input', required: true, currentValue: 'u123', isFilled: true }], conditions: ['user_id EXISTS'], priority: 1, dependsOn: [], outputs: ['context'], isActive: true },
    { id: 'analysis_eng', name: 'Analysis Engine', category: 'analysis_layer', template: '...', variables: [{ name: 'context', type: 'input', required: true, currentValue: {}, isFilled: true }], conditions: ['context.length > 100'], priority: 2, dependsOn: ['ctx_builder'], outputs: ['analysis'], isActive: true },
    { id: 'insight_ext', name: 'Insight Extractor', category: 'analysis_layer', template: '...', variables: [{ name: 'taskHypothesis', type: 'input', required: true, currentValue: 'test', isFilled: true }], conditions: ['taskHypothesis FILLED'], priority: 3, dependsOn: ['analysis_eng'], outputs: ['insights'], isActive: true },
    { id: 'risk_assess', name: 'Risk Assessor', category: 'analysis_layer', template: '...', variables: [{ name: 'riskFlags', type: 'input', required: false, currentValue: [], isFilled: false }], conditions: ['riskFlags.length > 0'], priority: 3, dependsOn: ['analysis_eng'], outputs: ['riskScore'], isActive: false },
    { id: 'resp_former', name: 'Response Former', category: 'response_layer', template: '...', variables: [{ name: 'analysisComplete', type: 'input', required: true, currentValue: false, isFilled: false }], conditions: ['analysisComplete == true'], priority: 4, dependsOn: ['insight_ext', 'risk_assess'], outputs: ['response'], isActive: false }
  ],
  activeChain: ['ctx_builder', 'analysis_eng', 'insight_ext'],
  conditions: [
    { id: 'c1', promptId: 'ctx_builder', type: 'variable_exists', variable: 'user_id', operator: 'exists', value: null, isMet: true },
    { id: 'c2', promptId: 'analysis_eng', type: 'variable_threshold', variable: 'context.length', operator: '>', value: 100, isMet: true },
    { id: 'c3', promptId: 'insight_ext', type: 'variable_exists', variable: 'taskHypothesis', operator: 'exists', value: null, isMet: true },
    { id: 'c4', promptId: 'risk_assess', type: 'variable_threshold', variable: 'riskFlags.length', operator: '>', value: 0, isMet: false },
    { id: 'c5', promptId: 'resp_former', type: 'variable_equals', variable: 'analysisComplete', operator: '==', value: true, isMet: false }
  ],
  executionHistory: []
};

// ----- Data Sources Mock Data -----

export const dataSourcesData: DataSourcesData = {
  sources: [
    { id: 'src_1', type: 'meetings', name: 'Meetings', icon: '📅', status: 'active', lastInput: '2m ago', inputCount: 47 },
    { id: 'src_2', type: 'brain_dumps', name: 'Brain Dumps', icon: '🧠', status: 'active', lastInput: '30s ago', inputCount: 124 },
    { id: 'src_3', type: 'consciousness_stream', name: 'Consciousness', icon: '💭', status: 'processing', lastInput: 'now', inputCount: 892 },
    { id: 'src_4', type: 'documents', name: 'Documents', icon: '📄', status: 'active', lastInput: '5m ago', inputCount: 89 },
    { id: 'src_5', type: 'conversations', name: 'Conversations', icon: '💬', status: 'idle', lastInput: '15m ago', inputCount: 234 },
    { id: 'src_6', type: 'external_apis', name: 'External APIs', icon: '🔌', status: 'active', lastInput: '1m ago', inputCount: 12 },
    { id: 'src_7', type: 'manual_input', name: 'Manual Input', icon: '✏️', status: 'idle', lastInput: '1h ago', inputCount: 8 }
  ],
  pipeline: {
    id: 'main_pipeline',
    stages: [
      { id: 'stg_1', name: 'INGEST', type: 'ingest', status: 'complete', itemsProcessed: 42, totalItems: 42 },
      { id: 'stg_2', name: 'TRANSFORM', type: 'transform', status: 'processing', itemsProcessed: 18, totalItems: 42 },
      { id: 'stg_3', name: 'ENRICH', type: 'enrich', status: 'idle', itemsProcessed: 0, totalItems: 42 },
      { id: 'stg_4', name: 'STORE', type: 'store', status: 'idle', itemsProcessed: 0, totalItems: 42 }
    ],
    currentStage: 1
  },
  throughput: 12.4,
  backlog: 24
};

// ----- Knowledge Base Mock Data -----

export const knowledgeBaseData: KnowledgeBaseData = {
  hierarchy: [
    {
      id: 'l1',
      level: 1,
      name: 'General Goals',
      type: 'general_goals',
      color: '#22C55E',
      items: [
        { id: 'g1', content: 'Product Launch', type: 'goal', priority: 1, linkedItems: ['c1', 'c2'], createdAt: '2024-01-01', relevanceScore: 95 },
        { id: 'g2', content: 'User Growth', type: 'goal', priority: 2, linkedItems: ['c3'], createdAt: '2024-01-01', relevanceScore: 88 },
        { id: 'g3', content: 'Revenue Target', type: 'goal', priority: 3, linkedItems: [], createdAt: '2024-01-01', relevanceScore: 100 }
      ]
    },
    {
      id: 'l2',
      level: 2,
      name: 'Strategic Context',
      type: 'strategic_context',
      color: '#3B82F6',
      items: [
        { id: 'c1', content: 'Market Analysis', type: 'context', priority: 1, linkedItems: ['g1'], createdAt: '2024-01-05', relevanceScore: 82 },
        { id: 'c2', content: 'Competitor Intel', type: 'context', priority: 2, linkedItems: ['g1'], createdAt: '2024-01-05', relevanceScore: 75 },
        { id: 'c3', content: 'Resource Plan', type: 'context', priority: 3, linkedItems: ['g2'], createdAt: '2024-01-05', relevanceScore: 70 }
      ]
    },
    {
      id: 'l3',
      level: 3,
      name: 'Real-time Updates',
      type: 'realtime_updates',
      color: '#F59E0B',
      items: [
        { id: 'r1', content: 'New data point 1', type: 'data', priority: 1, linkedItems: [], createdAt: '2024-01-15', relevanceScore: 60 },
        { id: 'r2', content: 'New data point 2', type: 'data', priority: 2, linkedItems: [], createdAt: '2024-01-15', relevanceScore: 55 },
        { id: 'r3', content: 'New data point 3', type: 'data', priority: 3, linkedItems: [], createdAt: '2024-01-15', relevanceScore: 50 }
      ]
    }
  ],
  mappings: [
    { sourceItemId: 'r1', targetItemId: 'g1', mappingType: 'supports', confidence: 0.85 },
    { sourceItemId: 'c1', targetItemId: 'g1', mappingType: 'relates_to', confidence: 0.92 }
  ],
  goalProgress: [
    { goalId: 'g1', goalName: 'Product Launch', progress: 78, supportingItems: ['c1', 'c2'], blockers: [], clarity: 85 },
    { goalId: 'g2', goalName: 'User Growth', progress: 54, supportingItems: ['c3'], blockers: ['resource_constraint'], clarity: 72 },
    { goalId: 'g3', goalName: 'Revenue Target', progress: 100, supportingItems: [], blockers: [], clarity: 100 }
  ],
  recentActivity: 12,
  unmappedItems: 3
};

// ----- Living Documents Mock Data -----

export const livingDocumentsData: LivingDocumentsData = {
  documents: [
    { id: 'd1', name: 'Goal Tracker', type: 'goal_tracker', status: 'live', lastUpdated: '5s ago', sections: [{ id: 's1', title: 'Q1 Goals', isDefined: true, isBeingDone: true }], clarityScore: 85 },
    { id: 'd2', name: 'Project: Alpha', type: 'project_status', status: 'live', lastUpdated: '1m ago', sections: [{ id: 's2', title: 'Milestones', isDefined: true, isBeingDone: true }], clarityScore: 78 },
    { id: 'd3', name: 'Sprint Status', type: 'progress_report', status: 'syncing', lastUpdated: '5m ago', sections: [{ id: 's3', title: 'Current Sprint', isDefined: true, isBeingDone: false }], clarityScore: 65 }
  ],
  statusTrackers: [
    { id: 't1', entityType: 'goal', entityName: 'Goal A Criteria', isDefined: true, isBeingDone: true },
    { id: 't2', entityType: 'project', entityName: 'Project Scope', isDefined: true, isBeingDone: false },
    { id: 't3', entityType: 'variable', entityName: 'Success Metrics', isDefined: false, isBeingDone: false },
    { id: 't4', entityType: 'submission', entityName: 'Timeline', isDefined: true, isBeingDone: true }
  ],
  actionPropagation: [
    { actionId: 'a1', actionName: 'Complete API', sourceLevel: 'Task', targetGoal: 'Goal A', progress: 78, status: 'propagating' }
  ],
  clarityScore: 72,
  definedItems: 8,
  totalItems: 11
};

// ----- Core Functions Mock Data -----

export const coreFunctionsData: CoreFunctionsData = {
  functions: [
    {
      id: 'f1',
      name: 'Retention & Engagement',
      type: 'retention_engagement',
      description: 'Deepening infinite circle for engagement',
      visualType: 'loop',
      intensity: 75,
      relatedStates: ['state_2', 'state_3', 'state_7'],
      metrics: [
        { name: 'Engagement Depth', value: 4, maxValue: 10, trend: 'up', unit: 'levels' },
        { name: 'Session Duration', value: 12, maxValue: 60, trend: 'up', unit: 'min' },
        { name: 'Return Rate', value: 78, maxValue: 100, trend: 'stable', unit: '%' }
      ],
      isActive: true
    },
    {
      id: 'f2',
      name: 'Conversion & Transaction',
      type: 'conversion_transaction',
      description: 'Move toward specific action and transaction',
      visualType: 'arrow',
      intensity: 58,
      relatedStates: ['state_5', 'state_6'],
      metrics: [
        { name: 'Conversion Progress', value: 58, maxValue: 100, trend: 'up', unit: '%' },
        { name: 'Steps to Action', value: 3, maxValue: 10, trend: 'down', unit: 'steps' },
        { name: 'Intent Clarity', value: 82, maxValue: 100, trend: 'up', unit: '%' }
      ],
      isActive: true
    },
    {
      id: 'f3',
      name: 'Abstraction → Clarity',
      type: 'abstraction_clarity',
      description: 'Transform vague concepts into concrete elements',
      visualType: 'funnel',
      intensity: 82,
      relatedStates: ['state_3', 'state_4', 'state_5'],
      metrics: [
        { name: 'Definition Level', value: 82, maxValue: 100, trend: 'up', unit: '%' },
        { name: 'Ambiguity Score', value: 18, maxValue: 100, trend: 'down', unit: 'pts' },
        { name: 'Actionability', value: 75, maxValue: 100, trend: 'up', unit: '%' }
      ],
      isActive: true
    },
    {
      id: 'f4',
      name: 'Exploration & Analysis',
      type: 'exploration_analysis',
      description: 'Understanding, summarizing, feedback, insights',
      visualType: 'web',
      intensity: 64,
      relatedStates: ['state_1', 'state_3', 'state_7'],
      metrics: [
        { name: 'Coverage', value: 64, maxValue: 100, trend: 'up', unit: '%' },
        { name: 'Insights Generated', value: 7, maxValue: 20, trend: 'up', unit: 'count' },
        { name: 'Understanding', value: 3, maxValue: 5, trend: 'stable', unit: 'level' }
      ],
      isActive: true
    }
  ]
};

// ----- Helper to get state color -----

export function getStateColor(stateId: HumanStateId): string {
  const state = humanStatesData.states.find(s => s.id === stateId);
  return state?.color ?? '#6B7280';
}

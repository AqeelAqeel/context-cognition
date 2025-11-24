// ============================================
// Infinite Canvas Playground - Type Definitions
// ============================================

// ----- Canvas Types -----

export interface CanvasState {
  viewport: Viewport;
  components: CanvasComponent[];
  connections: Connection[];
  selectedComponentId: string | null;
  isDragging: boolean;
  isPanning: boolean;
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: Position;
  size: Size;
  zIndex: number;
  isExpanded: boolean;
  isMinimized: boolean;
}

export type ComponentType =
  | 'human_states'
  | 'database'
  | 'interface_layer'
  | 'prompt_chain'
  | 'data_sources'
  | 'knowledge_base'
  | 'living_documents'
  | 'core_functions';

// ----- Connection Types -----

export interface Connection {
  id: string;
  fromComponentId: string;
  fromPort: string;
  toComponentId: string;
  toPort: string;
  type: ConnectionType;
  isActive: boolean;
}

export type ConnectionType = 'data' | 'control' | 'feedback' | 'state';

// ----- Human States Types -----

export type HumanStateId = 'state_1' | 'state_2' | 'state_3' | 'state_4' | 'state_5' | 'state_6' | 'state_7';

export interface HumanWorkflowState {
  id: HumanStateId;
  name: string;
  metaDescription: string;
  color: string;
  characteristics: string[];
  triggeredBy: string[];
  leadsTo: HumanStateId[];
  activePrompts: string[];
  cognitiveLoad: number;
  attentionFocus: 'broad' | 'narrow' | 'diffuse';
}

export interface HumanStatesData {
  selectedState: HumanStateId;
  states: HumanWorkflowState[];
}

// ----- Database Types -----

export type DatabaseCategory =
  | 'user_context'
  | 'session_memory'
  | 'persistent_goals'
  | 'interaction_history'
  | 'derived_insights'
  | 'system_config'
  | 'prompt_templates'
  | 'knowledge_graph';

export type DatabaseStatus = 'empty' | 'partial' | 'full' | 'overflow' | 'error';

export interface DatabaseBar {
  id: string;
  category: DatabaseCategory;
  label: string;
  color: string;
  fillLevel: number;
  status: DatabaseStatus;
  lastUpdated: string;
  recordCount: number;
  isActive: boolean;
}

export interface DatabaseData {
  bars: DatabaseBar[];
  totalSize: number;
  maxSize: number;
}

// ----- Interface Layer Types -----

export interface StorageItem {
  key: string;
  value: unknown;
  type: 'string' | 'object' | 'array' | 'number' | 'boolean';
  size: number;
  createdAt: string;
  updatedAt: string;
  accessCount: number;
}

export interface StorageState {
  items: StorageItem[];
  totalSize: number;
  maxSize: number;
}

export interface InterSessionState extends StorageState {
  syncStatus: 'synced' | 'pending' | 'error';
  lastSync: string;
}

export interface PromptTrigger {
  type: 'variable_filled' | 'storage_change' | 'threshold' | 'event';
  condition: string;
  variables: string[];
}

export interface InterfacePrompt {
  id: string;
  name: string;
  trigger: PromptTrigger;
  template: string;
  priority: number;
  isActive: boolean;
}

export interface InterfaceLayerData {
  localStorage: StorageState;
  sessionStorage: StorageState;
  interSessionStorage: InterSessionState;
  associatedPrompts: InterfacePrompt[];
}

// ----- Prompt Chain Types -----

export type PromptCategory =
  | 'interface_layer'
  | 'analysis_layer'
  | 'orchestration_layer'
  | 'response_layer'
  | 'feedback_layer';

export interface PromptVariable {
  name: string;
  type: 'input' | 'output' | 'context';
  required: boolean;
  currentValue: unknown;
  isFilled: boolean;
}

export interface SystemPrompt {
  id: string;
  name: string;
  category: PromptCategory;
  template: string;
  variables: PromptVariable[];
  conditions: string[];
  priority: number;
  dependsOn: string[];
  outputs: string[];
  isActive: boolean;
}

export interface PromptCondition {
  id: string;
  promptId: string;
  type: 'variable_equals' | 'variable_exists' | 'variable_threshold' | 'state_match';
  variable: string;
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'exists' | 'not_exists';
  value: unknown;
  isMet: boolean;
}

export interface PromptExecution {
  promptId: string;
  timestamp: string;
  inputVariables: Record<string, unknown>;
  outputVariables: Record<string, unknown>;
  duration: number;
  status: 'success' | 'skipped' | 'error';
}

export interface PromptChainData {
  prompts: SystemPrompt[];
  activeChain: string[];
  conditions: PromptCondition[];
  executionHistory: PromptExecution[];
}

// ----- Data Sources Types -----

export type DataSourceType =
  | 'meetings'
  | 'brain_dumps'
  | 'consciousness_stream'
  | 'documents'
  | 'conversations'
  | 'external_apis'
  | 'manual_input';

export type SourceStatus = 'active' | 'idle' | 'processing' | 'error';

export interface DataSource {
  id: string;
  type: DataSourceType;
  name: string;
  icon: string;
  status: SourceStatus;
  lastInput: string;
  inputCount: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  type: 'ingest' | 'transform' | 'enrich' | 'validate' | 'store';
  status: 'idle' | 'processing' | 'complete' | 'error';
  itemsProcessed: number;
  totalItems: number;
}

export interface Pipeline {
  id: string;
  stages: PipelineStage[];
  currentStage: number;
}

export interface DataSourcesData {
  sources: DataSource[];
  pipeline: Pipeline;
  throughput: number;
  backlog: number;
}

// ----- Knowledge Base Types -----

export type HierarchyType =
  | 'general_goals'
  | 'strategic_context'
  | 'operational_data'
  | 'realtime_updates'
  | 'recent_activity';

export interface KnowledgeItem {
  id: string;
  content: string;
  type: 'goal' | 'context' | 'data' | 'insight' | 'action';
  priority: number;
  linkedItems: string[];
  createdAt: string;
  relevanceScore: number;
}

export interface HierarchyLevel {
  id: string;
  level: number;
  name: string;
  type: HierarchyType;
  items: KnowledgeItem[];
  color: string;
}

export interface InformationMapping {
  sourceItemId: string;
  targetItemId: string;
  mappingType: 'supports' | 'relates_to' | 'conflicts_with' | 'derived_from';
  confidence: number;
}

export interface GoalProgress {
  goalId: string;
  goalName: string;
  progress: number;
  supportingItems: string[];
  blockers: string[];
  clarity: number;
}

export interface KnowledgeBaseData {
  hierarchy: HierarchyLevel[];
  mappings: InformationMapping[];
  goalProgress: GoalProgress[];
  recentActivity: number;
  unmappedItems: number;
}

// ----- Living Documents Types -----

export type DocumentType =
  | 'goal_tracker'
  | 'project_status'
  | 'variable_state'
  | 'submission_tracker'
  | 'progress_report';

export interface DocumentSection {
  id: string;
  title: string;
  isDefined: boolean;
  isBeingDone: boolean;
}

export interface LivingDocument {
  id: string;
  name: string;
  type: DocumentType;
  status: 'live' | 'syncing' | 'stale';
  lastUpdated: string;
  sections: DocumentSection[];
  clarityScore: number;
}

export interface StatusTracker {
  id: string;
  entityType: 'project' | 'submission' | 'variable' | 'goal';
  entityName: string;
  isDefined: boolean;
  isBeingDone: boolean;
}

export interface ActionPropagation {
  actionId: string;
  actionName: string;
  sourceLevel: string;
  targetGoal: string;
  progress: number;
  status: 'pending' | 'propagating' | 'complete';
}

export interface LivingDocumentsData {
  documents: LivingDocument[];
  statusTrackers: StatusTracker[];
  actionPropagation: ActionPropagation[];
  clarityScore: number;
  definedItems: number;
  totalItems: number;
}

// ----- Core Functions Types -----

export type FunctionType =
  | 'retention_engagement'
  | 'conversion_transaction'
  | 'abstraction_clarity'
  | 'exploration_analysis';

export interface FunctionMetric {
  name: string;
  value: number;
  maxValue: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface CoreFunction {
  id: string;
  name: string;
  type: FunctionType;
  description: string;
  visualType: 'loop' | 'arrow' | 'funnel' | 'web';
  intensity: number;
  relatedStates: HumanStateId[];
  metrics: FunctionMetric[];
  isActive: boolean;
}

export interface CoreFunctionsData {
  functions: CoreFunction[];
}

// ----- Event Types -----

export type PlaygroundEvent =
  | { type: 'component_added'; componentId: string; componentType: ComponentType }
  | { type: 'component_removed'; componentId: string }
  | { type: 'component_moved'; componentId: string; position: Position }
  | { type: 'component_selected'; componentId: string | null }
  | { type: 'state_changed'; componentId: string; newState: unknown }
  | { type: 'connection_created'; connection: Connection }
  | { type: 'connection_removed'; connectionId: string }
  | { type: 'viewport_changed'; viewport: Viewport }
  | { type: 'simulation_tick'; timestamp: number };

// ----- Component Registry -----

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  icon: string;
  defaultSize: Size;
  description: string;
}

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  {
    type: 'human_states',
    name: 'Human States',
    icon: '👤',
    defaultSize: { width: 320, height: 400 },
    description: '7 states of human awareness and consciousness'
  },
  {
    type: 'database',
    name: 'Database Layer',
    icon: '🗄️',
    defaultSize: { width: 360, height: 380 },
    description: 'Flattened DB visualization with category bars'
  },
  {
    type: 'interface_layer',
    name: 'Interface Layer',
    icon: '🖥️',
    defaultSize: { width: 340, height: 420 },
    description: 'Storage systems and associated prompts'
  },
  {
    type: 'prompt_chain',
    name: 'Prompt Chain',
    icon: '🔗',
    defaultSize: { width: 380, height: 450 },
    description: 'LLM system prompt flow with conditions'
  },
  {
    type: 'data_sources',
    name: 'Data Sources',
    icon: '📥',
    defaultSize: { width: 340, height: 400 },
    description: 'Input pipelines from various sources'
  },
  {
    type: 'knowledge_base',
    name: 'Knowledge Base',
    icon: '📊',
    defaultSize: { width: 360, height: 420 },
    description: 'Information hierarchy and goal tracking'
  },
  {
    type: 'living_documents',
    name: 'Living Documents',
    icon: '📝',
    defaultSize: { width: 350, height: 440 },
    description: 'Status tracking and action propagation'
  },
  {
    type: 'core_functions',
    name: 'Core Functions',
    icon: '⚡',
    defaultSize: { width: 340, height: 520 },
    description: 'Four fundamental operational modes'
  }
];

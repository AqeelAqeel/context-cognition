# Infinite Canvas Playground - Complete Specification Document

> **Project Name:** Context Cognition Visualization Playground
> **Version:** 1.0.0-draft
> **Created:** 2025-11-23
> **Status:** Specification Phase

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Route & Navigation Structure](#3-route--navigation-structure)
4. [Infinite Canvas System](#4-infinite-canvas-system)
5. [Core Component Systems](#5-core-component-systems)
6. [Human Workflow States](#6-human-workflow-states)
7. [Database Visualization Layer](#7-database-visualization-layer)
8. [Interface Layer System](#8-interface-layer-system)
9. [LLM Analysis & System Prompt Chain](#9-llm-analysis--system-prompt-chain)
10. [Data Sources & Pipelines](#10-data-sources--pipelines)
11. [Information Hierarchy & Knowledge Base](#11-information-hierarchy--knowledge-base)
12. [Living Documents & Status System](#12-living-documents--status-system)
13. [Four Core Function Types](#13-four-core-function-types)
14. [Card Component Architecture](#14-card-component-architecture)
15. [Technical Implementation Plan](#15-technical-implementation-plan)
16. [Component Reuse Strategy](#16-component-reuse-strategy)
17. [Data Structures & Types](#17-data-structures--types)
18. [Project Management Checklist](#18-project-management-checklist)
19. [Future Iterations](#19-future-iterations)
20. [Validation Against Original Requirements](#20-validation-against-original-requirements)

---

## 1. Executive Summary

This document specifies the complete architecture for an **Infinite Canvas Playground** - an interactive visualization environment that demonstrates the interconnected systems of human cognition, data processing, LLM orchestration, and goal-oriented workflows.

### Core Concept
A zoomable, pannable canvas where users can:
- Visualize abstract cognitive and data systems as draggable components
- Simulate different human awareness/consciousness states
- Observe how system prompts chain based on variable conditions
- Track progress from abstraction to clarity toward defined goals
- Assemble components into custom system configurations

### Key Deliverables
1. New `/playground` route with entry button on landing page
2. Infinite canvas with zoom/pan capabilities
3. 8+ distinct component systems as draggable cards
4. State simulation engine for 7 human workflow states
5. Visual database representation with color-coded states
6. System prompt chain visualization with conditional logic
7. Living document status tracking system

---

## 2. Project Overview

### 2.1 Purpose
Create a visual playground that demonstrates the complete cognitive architecture of the Context Cognition system, allowing users to:
- Understand complex system interactions through visual representation
- Simulate different operational states and observe system behavior
- Explore the relationship between human workflows and automated systems
- Track how abstract goals become concrete actions

### 2.2 Target Users
- System architects understanding the platform
- Developers implementing specific modules
- Stakeholders visualizing the system's capabilities
- Researchers exploring cognitive computing patterns

### 2.3 Design Philosophy
- **Everything on One Canvas**: All systems coexist in a single navigable space
- **Component Modularity**: Each system is a self-contained, interactive card
- **Visual Clarity**: Complex systems represented through intuitive visualizations
- **State Transparency**: All variables and states are visible and explorable
- **Assembly-Based**: Users can arrange and connect components freely

---

## 3. Route & Navigation Structure

### 3.1 New Route: `/playground`

```
/                     → Landing page (existing)
/playground           → Infinite Canvas Playground (NEW)
```

### 3.2 Landing Page Modification

**Location:** Top of the existing landing page (`app/page.tsx`)

**Component:** `PlaygroundEntryButton`

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│     ╔═══════════════════════════════════════════╗      │
│     ║                                           ║      │
│     ║   ✨ GO TO VISUALIZATION EXPERIENCE ✨    ║      │
│     ║                                           ║      │
│     ╚═══════════════════════════════════════════╝      │
│                                                         │
│              [Existing Hero Section below]              │
└─────────────────────────────────────────────────────────┘
```

**Styling Requirements:**
- Large, prominent button (full-width or 80% width)
- Rainbow gradient glow effect (reuse existing `gradient-rainbow`)
- Hover animation with scale transform
- Arrow icon indicating navigation
- Position: Fixed at top or first element before hero

### 3.3 File Structure

```
app/
├── page.tsx                          # Landing (add entry button)
├── playground/
│   └── page.tsx                      # Infinite Canvas page
├── globals.css                       # Add canvas-specific animations

components/
├── playground/
│   ├── InfiniteCanvas.tsx            # Main canvas container
│   ├── CanvasControls.tsx            # Zoom, pan, reset controls
│   ├── ComponentPalette.tsx          # Sidebar with available components
│   ├── cards/
│   │   ├── BaseCard.tsx              # Draggable card wrapper
│   │   ├── HumanStateCard.tsx        # 7-state selector
│   │   ├── DatabaseCard.tsx          # DB visualization
│   │   ├── InterfaceLayerCard.tsx    # Interface + storage
│   │   ├── PromptChainCard.tsx       # LLM prompt chain
│   │   ├── DataSourcesCard.tsx       # Pipelines visualization
│   │   ├── KnowledgeBaseCard.tsx     # Information hierarchy
│   │   ├── LivingDocumentCard.tsx    # Status tracking
│   │   └── FunctionTypeCard.tsx      # 4 core functions
│   ├── visualizations/
│   │   ├── DBBarVisualization.tsx    # Flattened DB bar
│   │   ├── StateFlowDiagram.tsx      # State transitions
│   │   ├── PromptFlowChart.tsx       # Conditional prompt flow
│   │   └── GoalProgressArc.tsx       # Progress visualization
│   └── ui/
│       ├── DropdownInfoMenu.tsx      # Expandable info sections
│       ├── StateSelector.tsx         # State picker UI
│       └── ConnectionLine.tsx        # Visual connections

lib/
├── playground/
│   ├── canvasState.ts                # Canvas position/zoom state
│   ├── componentRegistry.ts          # Available components registry
│   ├── simulationEngine.ts           # State simulation logic
│   └── types.ts                      # Playground-specific types
```

---

## 4. Infinite Canvas System

### 4.1 Canvas Capabilities

| Feature | Description |
|---------|-------------|
| **Pan** | Click and drag background to move viewport |
| **Zoom** | Scroll wheel or pinch to zoom (0.1x - 5x range) |
| **Component Drag** | Click and drag cards to reposition |
| **Zoom to Component** | Double-click component to zoom and center |
| **Reset View** | Button to reset to default viewport |
| **Minimap** | Optional small overview of entire canvas |

### 4.2 Canvas State Structure

```typescript
interface CanvasState {
  viewport: {
    x: number;           // Pan offset X
    y: number;           // Pan offset Y
    zoom: number;        // Current zoom level (1.0 = 100%)
  };
  components: CanvasComponent[];
  connections: Connection[];
  selectedComponentId: string | null;
  isDragging: boolean;
  isPanning: boolean;
}

interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isExpanded: boolean;
  data: Record<string, unknown>;
}

interface Connection {
  id: string;
  fromComponentId: string;
  fromPort: string;
  toComponentId: string;
  toPort: string;
  type: 'data' | 'control' | 'feedback';
}
```

### 4.3 Canvas Controls UI

```
┌────────────────────────────────────────────────────────────────┐
│  [−] [100%] [+]  │  [🔄 Reset]  │  [📍 Fit All]  │  [⚙️ Grid]  │
└────────────────────────────────────────────────────────────────┘
```

### 4.4 Implementation Approach

**Option A: CSS Transform-based (Recommended for MVP)**
- Use CSS `transform: translate() scale()` on canvas container
- Native DOM elements for cards (better text rendering)
- Simpler implementation, good performance for <50 components

**Option B: Canvas/WebGL-based (Future)**
- HTML5 Canvas or WebGL for rendering
- Better performance for 100+ components
- More complex implementation

---

## 5. Core Component Systems

### 5.1 Component Taxonomy

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT SYSTEMS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   HUMAN     │  │  DATABASE   │  │  INTERFACE  │             │
│  │   STATES    │  │    LAYER    │  │    LAYER    │             │
│  │  (7 states) │  │  (DB bars)  │  │  (storage)  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    LLM      │  │    DATA     │  │  KNOWLEDGE  │             │
│  │   PROMPT    │  │   SOURCES   │  │    BASE     │             │
│  │   CHAIN     │  │ (pipelines) │  │ (hierarchy) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │   LIVING    │  │    CORE     │                              │
│  │  DOCUMENTS  │  │  FUNCTIONS  │                              │
│  │  (status)   │  │ (4 types)   │                              │
│  └─────────────┘  └─────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Component Interaction Model

Each component can:
1. **Emit** state changes via event bus
2. **Subscribe** to relevant events from other components
3. **Display** its internal state visually
4. **Accept** user input (dropdowns, selectors, toggles)
5. **Connect** to other components via visual lines

---

## 6. Human Workflow States

### 6.1 Overview

A component representing 7 distinct states of human awareness/consciousness that can be selected to simulate different operational modes.

### 6.2 State Definitions

| State ID | Placeholder Name | Meta Description | Visual Color |
|----------|------------------|------------------|--------------|
| `state_1` | State One | Initial awareness state - baseline cognition | `#3B82F6` (Blue) |
| `state_2` | State Two | Engaged attention - focused processing | `#8B5CF6` (Violet) |
| `state_3` | State Three | Deep analysis - pattern recognition active | `#EC4899` (Pink) |
| `state_4` | State Four | Creative synthesis - novel connections | `#F59E0B` (Amber) |
| `state_5` | State Five | Decision crystallization - choice formation | `#10B981` (Emerald) |
| `state_6` | State Six | Action execution - implementation mode | `#EF4444` (Red) |
| `state_7` | State Seven | Reflection integration - learning consolidation | `#6366F1` (Indigo) |

### 6.3 State Data Structure

```typescript
interface HumanWorkflowState {
  id: `state_${1 | 2 | 3 | 4 | 5 | 6 | 7}`;
  name: string;
  metaDescription: string;
  color: string;
  characteristics: string[];
  triggeredBy: string[];      // What activates this state
  leadsTo: string[];          // Possible next states
  activePrompts: string[];    // Which system prompts activate
  cognitiveLoad: number;      // 0-100 scale
  attentionFocus: 'broad' | 'narrow' | 'diffuse';
}

// Registry of all states
const HUMAN_STATES: Record<string, HumanWorkflowState> = {
  state_1: {
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
  // ... state_2 through state_7
};
```

### 6.4 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  👤 HUMAN WORKFLOW STATES                    [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Current State: ● State Three                          │
│  ──────────────────────────────────                    │
│                                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                      │
│  │  1  │ │  2  │ │ ●3● │ │  4  │  ← Click to select   │
│  └─────┘ └─────┘ └─────┘ └─────┘                      │
│  ┌─────┐ ┌─────┐ ┌─────┐                              │
│  │  5  │ │  6  │ │  7  │                              │
│  └─────┘ └─────┘ └─────┘                              │
│                                                         │
│  ▼ State Details                                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Deep analysis - pattern recognition active      │   │
│  │ Cognitive Load: ████████░░ 75%                  │   │
│  │ Attention: Narrow                               │   │
│  │ Active Prompts: [analysis_deep] [pattern_match] │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Database Visualization Layer

### 7.1 Overview

A flattened visual representation of the database showing different data categories as colored bars/rows with state indicators.

### 7.2 DB Bar Structure

```typescript
interface DatabaseBar {
  id: string;
  category: DatabaseCategory;
  label: string;
  color: string;
  fillLevel: number;        // 0-100 percentage
  status: 'empty' | 'partial' | 'full' | 'overflow';
  lastUpdated: string;
  recordCount: number;
  isActive: boolean;
}

type DatabaseCategory =
  | 'user_context'
  | 'session_memory'
  | 'persistent_goals'
  | 'interaction_history'
  | 'derived_insights'
  | 'system_config'
  | 'prompt_templates'
  | 'knowledge_graph';
```

### 7.3 Visual Design

```
┌─────────────────────────────────────────────────────────┐
│  🗄️ DATABASE LAYER                           [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  user_context      ████████████████████░░░░  78%  ●    │
│  session_memory    ██████████░░░░░░░░░░░░░░  42%  ●    │
│  persistent_goals  ████████████████████████  100% ●    │
│  interaction_hist  ██████████████░░░░░░░░░░  56%  ○    │
│  derived_insights  ████░░░░░░░░░░░░░░░░░░░░  15%  ●    │
│  system_config     ████████████████████████  100% ●    │
│  prompt_templates  ██████████████████░░░░░░  72%  ○    │
│  knowledge_graph   ██████████████████████░░  89%  ●    │
│                                                         │
│  ▼ Row Details (click row to expand)                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Category: user_context                          │   │
│  │ Records: 1,247 │ Last Update: 2s ago           │   │
│  │ Status: Active │ Size: 2.4MB                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Legend: ● Active  ○ Idle  ⚠ Warning  ✕ Error         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 7.4 Color Coding

| Category | Color | Hex |
|----------|-------|-----|
| user_context | Cyan | `#06B6D4` |
| session_memory | Purple | `#A855F7` |
| persistent_goals | Green | `#22C55E` |
| interaction_history | Blue | `#3B82F6` |
| derived_insights | Pink | `#EC4899` |
| system_config | Gray | `#6B7280` |
| prompt_templates | Amber | `#F59E0B` |
| knowledge_graph | Indigo | `#6366F1` |

---

## 8. Interface Layer System

### 8.1 Overview

Represents the interface layer with local/inter-session storage and its associated system prompts with conditional invocation logic.

### 8.2 Storage Types

```typescript
interface InterfaceLayerState {
  localStorage: {
    items: StorageItem[];
    totalSize: number;
    maxSize: number;
  };
  sessionStorage: {
    items: StorageItem[];
    totalSize: number;
    maxSize: number;
  };
  interSessionStorage: {
    items: StorageItem[];
    syncStatus: 'synced' | 'pending' | 'error';
    lastSync: string;
  };
  associatedPrompts: InterfacePrompt[];
}

interface StorageItem {
  key: string;
  value: unknown;
  type: 'string' | 'object' | 'array' | 'number' | 'boolean';
  size: number;
  createdAt: string;
  updatedAt: string;
  accessCount: number;
}

interface InterfacePrompt {
  id: string;
  name: string;
  trigger: PromptTrigger;
  template: string;
  priority: number;
  isActive: boolean;
}

interface PromptTrigger {
  type: 'variable_filled' | 'storage_change' | 'threshold' | 'event';
  condition: string;
  variables: string[];
}
```

### 8.3 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  🖥️ INTERFACE LAYER                          [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ Local Storage ─────────────────────────────────┐   │
│  │  ██████████████░░░░  68% (3.4MB / 5MB)         │   │
│  │  Items: 24  │  Active Keys: 18                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Session Storage ───────────────────────────────┐   │
│  │  ████████░░░░░░░░░░  35% (1.7MB / 5MB)         │   │
│  │  Items: 12  │  Active Keys: 12                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Inter-Session ─────────────────────────────────┐   │
│  │  ████████████████░░  82% │ ● Synced            │   │
│  │  Items: 8   │  Last Sync: 5s ago                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ▼ Associated Prompts (3 active)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ● context_loader    │ ON variable: user_id     │   │
│  │ ● session_init      │ ON event: session_start  │   │
│  │ ○ data_persist      │ ON threshold: items > 10 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 9. LLM Analysis & System Prompt Chain

### 9.1 Overview

Visualizes how different system prompts are invoked based on context, conditions, and the state of various variables. Shows the chain/flow of prompts and their conditional logic.

### 9.2 Prompt Chain Structure

```typescript
interface SystemPromptChain {
  prompts: SystemPrompt[];
  activeChain: string[];        // Currently active prompt IDs in order
  executionHistory: PromptExecution[];
}

interface SystemPrompt {
  id: string;
  name: string;
  category: PromptCategory;
  template: string;
  variables: PromptVariable[];
  conditions: PromptCondition[];
  priority: number;
  dependsOn: string[];          // Other prompt IDs that must run first
  outputs: string[];            // Variables this prompt sets
}

type PromptCategory =
  | 'interface_layer'
  | 'analysis_layer'
  | 'orchestration_layer'
  | 'response_layer'
  | 'feedback_layer';

interface PromptVariable {
  name: string;
  type: 'input' | 'output' | 'context';
  required: boolean;
  currentValue: unknown;
  isFilled: boolean;
}

interface PromptCondition {
  id: string;
  type: 'variable_equals' | 'variable_exists' | 'variable_threshold' | 'state_match';
  variable: string;
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'exists' | 'not_exists';
  value: unknown;
  isMet: boolean;
}

interface PromptExecution {
  promptId: string;
  timestamp: string;
  inputVariables: Record<string, unknown>;
  outputVariables: Record<string, unknown>;
  duration: number;
  status: 'success' | 'skipped' | 'error';
}
```

### 9.3 Visual Flow Representation

```
┌─────────────────────────────────────────────────────────┐
│  🔗 LLM PROMPT CHAIN                         [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Chain Flow:                                            │
│                                                         │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐      │
│  │ context_ │  ──▶ │ analysis │  ──▶ │ response │      │
│  │ builder  │      │ _engine  │      │ _former  │      │
│  │    ●     │      │    ●     │      │    ○     │      │
│  └──────────┘      └──────────┘      └──────────┘      │
│       │                 │                              │
│       │            ┌────┴────┐                         │
│       │            ▼         ▼                         │
│       │      ┌──────────┐ ┌──────────┐                 │
│       │      │ insight_ │ │ risk_    │                 │
│       └────▶ │ extract  │ │ assess   │                 │
│              │    ●     │ │    ○     │                 │
│              └──────────┘ └──────────┘                 │
│                                                         │
│  ▼ Conditions Panel                                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ✓ user_id EXISTS           → context_builder    │   │
│  │ ✓ context.length > 100     → analysis_engine    │   │
│  │ ✓ taskHypothesis FILLED    → insight_extract    │   │
│  │ ✗ riskFlags.length > 0     → risk_assess        │   │
│  │ ○ analysisComplete == true → response_former    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Legend: ● Active  ○ Pending  ✓ Condition Met          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Data Sources & Pipelines

### 10.1 Overview

Represents the various input sources that feed into the system - meetings, brain dumps, consciousness streams, and other data inputs. Shows how data flows through pipelines into the persistent knowledge base.

### 10.2 Data Source Types

```typescript
interface DataSource {
  id: string;
  type: DataSourceType;
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  lastInput: string;
  inputCount: number;
  pipeline: Pipeline;
}

type DataSourceType =
  | 'meetings'
  | 'brain_dumps'
  | 'consciousness_stream'
  | 'documents'
  | 'conversations'
  | 'external_apis'
  | 'manual_input';

interface Pipeline {
  id: string;
  stages: PipelineStage[];
  currentStage: number;
  throughput: number;        // Items per minute
  backlog: number;
}

interface PipelineStage {
  id: string;
  name: string;
  type: 'ingest' | 'transform' | 'enrich' | 'validate' | 'store';
  status: 'idle' | 'processing' | 'complete' | 'error';
  itemsProcessed: number;
  avgDuration: number;
}
```

### 10.3 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  📥 DATA SOURCES & PIPELINES                 [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Sources:                                               │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📅 Meetings          ●  │ 47 inputs │ 2m ago   │    │
│  │ 🧠 Brain Dumps       ●  │ 124 inputs │ 30s ago │    │
│  │ 💭 Consciousness     ◐  │ processing...        │    │
│  │ 📄 Documents         ●  │ 89 inputs │ 5m ago   │    │
│  │ 💬 Conversations     ○  │ idle                 │    │
│  │ 🔌 External APIs     ●  │ 12 inputs │ 1m ago   │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Pipeline Status:                                       │
│  ┌────────────────────────────────────────────────┐    │
│  │ INGEST ──▶ TRANSFORM ──▶ ENRICH ──▶ STORE     │    │
│  │   ●           ◐           ○          ○        │    │
│  │  42/42      18/42        0/42       0/42      │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Throughput: 12.4 items/min │ Backlog: 24 items        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 11. Information Hierarchy & Knowledge Base

### 11.1 Overview

Represents the structured hierarchy of information from general goals down to real-time context. Shows how new information maps to existing content and tracks toward goal achievement.

### 11.2 Hierarchy Structure

```typescript
interface KnowledgeHierarchy {
  levels: HierarchyLevel[];
  mappings: InformationMapping[];
  goalProgress: GoalProgress[];
}

interface HierarchyLevel {
  id: string;
  level: number;
  name: string;
  type: HierarchyType;
  items: KnowledgeItem[];
  color: string;
}

type HierarchyType =
  | 'general_goals'           // Level 1: High-level objectives
  | 'strategic_context'       // Level 2: Strategic information
  | 'operational_data'        // Level 3: Day-to-day operational data
  | 'realtime_updates'        // Level 4: Real-time incoming data
  | 'recent_activity';        // Level 5: Most recent context

interface KnowledgeItem {
  id: string;
  content: string;
  type: 'goal' | 'context' | 'data' | 'insight' | 'action';
  priority: number;
  linkedItems: string[];
  createdAt: string;
  relevanceScore: number;
}

interface InformationMapping {
  sourceItemId: string;
  targetItemId: string;
  mappingType: 'supports' | 'relates_to' | 'conflicts_with' | 'derived_from';
  confidence: number;
}

interface GoalProgress {
  goalId: string;
  goalName: string;
  progress: number;           // 0-100
  supportingItems: string[];
  blockers: string[];
  clarity: number;            // 0-100, how well-defined
}
```

### 11.3 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  📊 KNOWLEDGE HIERARCHY                      [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ L1: General Goals ─────────────────────────────┐   │
│  │ 🎯 Goal A: Product Launch    ████████░░ 78%     │   │
│  │ 🎯 Goal B: User Growth       ██████░░░░ 54%     │   │
│  │ 🎯 Goal C: Revenue Target    ████████████ 100%  │   │
│  └─────────────────────────────────────────────────┘   │
│           │                                             │
│           ▼ maps to                                     │
│  ┌─ L2: Strategic Context ─────────────────────────┐   │
│  │ 📋 Market Analysis  │ 📋 Competitor Intel       │   │
│  │ 📋 Resource Plan    │ 📋 Timeline Projections   │   │
│  └─────────────────────────────────────────────────┘   │
│           │                                             │
│           ▼ informs                                     │
│  ┌─ L3: Real-time Updates ─────────────────────────┐   │
│  │ ⚡ 3 new data points (2s ago)                   │   │
│  │ ⚡ Mapping to Goal A... ████░░ 40%              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Recent Activity: 12 items │ Unmapped: 3 items         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 12. Living Documents & Status System

### 12.1 Overview

Represents the dynamic, living documents that track project status, clarity of definitions, and progress toward goals. Shows whether things are defined and being done.

### 12.2 Document Structure

```typescript
interface LivingDocumentSystem {
  documents: LivingDocument[];
  statusTrackers: StatusTracker[];
  actionPropagation: ActionPropagation[];
}

interface LivingDocument {
  id: string;
  name: string;
  type: DocumentType;
  content: string;
  lastUpdated: string;
  updateFrequency: number;    // Updates per hour
  sections: DocumentSection[];
  clarityScore: number;       // 0-100
  completionStatus: 'draft' | 'in_progress' | 'review' | 'complete';
}

type DocumentType =
  | 'goal_tracker'
  | 'project_status'
  | 'variable_state'
  | 'submission_tracker'
  | 'progress_report';

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  isDefined: boolean;
  isActionable: boolean;
  lastModified: string;
}

interface StatusTracker {
  id: string;
  entityType: 'project' | 'submission' | 'variable' | 'goal';
  entityId: string;
  entityName: string;
  currentState: string;
  stateHistory: StateChange[];
  isDefined: boolean;
  isBeingDone: boolean;
}

interface StateChange {
  fromState: string;
  toState: string;
  timestamp: string;
  trigger: string;
}

interface ActionPropagation {
  actionId: string;
  actionName: string;
  sourceLevel: 'task' | 'project' | 'goal';
  targetGoalId: string;
  propagationPath: string[];
  impactScore: number;
  status: 'pending' | 'propagating' | 'complete';
}
```

### 12.3 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  📝 LIVING DOCUMENTS & STATUS                [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Active Documents:                                      │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📄 Goal Tracker        │ ● Live │ Updated 5s   │    │
│  │ 📄 Project: Alpha      │ ● Live │ Updated 1m   │    │
│  │ 📄 Sprint Status       │ ◐ Sync │ Updated 5m   │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Definition Status:                                     │
│  ┌────────────────────────────────────────────────┐    │
│  │ Item              │ Defined │ Being Done       │    │
│  │ ─────────────────────────────────────────────  │    │
│  │ Goal A Criteria   │   ✓     │     ✓           │    │
│  │ Project Scope     │   ✓     │     ◐           │    │
│  │ Success Metrics   │   ◐     │     ✗           │    │
│  │ Timeline          │   ✓     │     ✓           │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Action Propagation:                                    │
│  ┌────────────────────────────────────────────────┐    │
│  │ Task: "Complete API" ──▶ Project ──▶ Goal A   │    │
│  │ Status: ████████░░ Propagating (78%)          │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Clarity Score: 72% │ Items Defined: 8/11              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 13. Four Core Function Types

### 13.1 Overview

Represents the four fundamental operational modes/functions that the system can engage in. These are abstract patterns that can be applied across different contexts.

### 13.2 Function Definitions

```typescript
interface CoreFunction {
  id: string;
  name: string;
  type: FunctionType;
  description: string;
  visualRepresentation: 'loop' | 'arrow' | 'funnel' | 'web';
  currentIntensity: number;   // 0-100
  relatedStates: string[];    // Human states that activate this
  metrics: FunctionMetric[];
}

type FunctionType =
  | 'retention_engagement'    // Infinite deepening loop
  | 'conversion_transaction'  // Move toward action
  | 'abstraction_clarity'     // Abstract → Concrete
  | 'exploration_analysis';   // Understanding & insights

interface FunctionMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

const CORE_FUNCTIONS: CoreFunction[] = [
  {
    id: 'retention_engagement',
    name: 'Retention & Engagement Loop',
    type: 'retention_engagement',
    description: 'Deepening infinite circle that increases engagement over time',
    visualRepresentation: 'loop',
    currentIntensity: 0,
    relatedStates: ['state_2', 'state_3', 'state_7'],
    metrics: [
      { name: 'Engagement Depth', value: 0, trend: 'stable', unit: 'levels' },
      { name: 'Session Duration', value: 0, trend: 'stable', unit: 'minutes' },
      { name: 'Return Rate', value: 0, trend: 'stable', unit: '%' }
    ]
  },
  {
    id: 'conversion_transaction',
    name: 'Conversion & Transaction',
    type: 'conversion_transaction',
    description: 'Move toward specific action and complete transaction',
    visualRepresentation: 'arrow',
    currentIntensity: 0,
    relatedStates: ['state_5', 'state_6'],
    metrics: [
      { name: 'Conversion Progress', value: 0, trend: 'stable', unit: '%' },
      { name: 'Steps to Action', value: 0, trend: 'stable', unit: 'steps' },
      { name: 'Intent Clarity', value: 0, trend: 'stable', unit: '%' }
    ]
  },
  {
    id: 'abstraction_clarity',
    name: 'Abstraction to Clarity',
    type: 'abstraction_clarity',
    description: 'Transform vague concepts into concrete, defined elements',
    visualRepresentation: 'funnel',
    currentIntensity: 0,
    relatedStates: ['state_3', 'state_4', 'state_5'],
    metrics: [
      { name: 'Definition Level', value: 0, trend: 'stable', unit: '%' },
      { name: 'Ambiguity Score', value: 0, trend: 'stable', unit: 'points' },
      { name: 'Actionability', value: 0, trend: 'stable', unit: '%' }
    ]
  },
  {
    id: 'exploration_analysis',
    name: 'Exploration & Analysis',
    type: 'exploration_analysis',
    description: 'Understanding, summarizing, feedback, and insights generation',
    visualRepresentation: 'web',
    currentIntensity: 0,
    relatedStates: ['state_1', 'state_3', 'state_7'],
    metrics: [
      { name: 'Coverage', value: 0, trend: 'stable', unit: '%' },
      { name: 'Insights Generated', value: 0, trend: 'stable', unit: 'count' },
      { name: 'Understanding Depth', value: 0, trend: 'stable', unit: 'levels' }
    ]
  }
];
```

### 13.3 Card UI Design

```
┌─────────────────────────────────────────────────────────┐
│  ⚡ CORE FUNCTIONS                           [▼ Info]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ Retention & Engagement ────────────────────────┐   │
│  │     ╭──────╮                                    │   │
│  │    ╱   ↻   ╲   Intensity: ████████░░ 75%       │   │
│  │   │  LOOP   │   Depth: 4 levels                │   │
│  │    ╲       ╱   Duration: 12m                   │   │
│  │     ╰──────╯                                    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Conversion & Transaction ──────────────────────┐   │
│  │                                                 │   │
│  │   ○ ──────▶ ◐ ──────▶ ● ──────▶ ✓             │   │
│  │   Start     Mid       Near      Done           │   │
│  │             Progress: ██████░░░░ 58%           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Abstraction → Clarity ─────────────────────────┐   │
│  │   ╲  Abstract  ╱                                │   │
│  │    ╲          ╱    Definition: ████████░░ 82%  │   │
│  │     ╲        ╱     Ambiguity: ██░░░░░░░░ 18%  │   │
│  │      ╲______╱                                   │   │
│  │       Concrete                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Exploration & Analysis ────────────────────────┐   │
│  │      ●───●                                      │   │
│  │     /│\ /│\    Coverage: ██████░░░░ 64%        │   │
│  │    ● │ ● │ ●   Insights: 7 generated           │   │
│  │     \│/ \│/    Understanding: Level 3          │   │
│  │      ●───●                                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 14. Card Component Architecture

### 14.1 Base Card Structure

All cards share a common wrapper component that provides:
- Draggable behavior
- Expand/collapse functionality
- Info dropdown menu
- Visual styling consistency
- Connection ports for linking

```typescript
interface BaseCardProps {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isExpanded: boolean;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onExpandToggle: () => void;
  children: React.ReactNode;
  connectionPorts?: ConnectionPort[];
}

interface ConnectionPort {
  id: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  type: 'input' | 'output' | 'bidirectional';
  dataType: string;
}
```

### 14.2 Card Visual Template

```
┌─────────────────────────────────────────────────────────┐
│ ⣿ │ 🎯 CARD TITLE                          [▼] [−] [×] │  ← Header (drag handle, info, collapse, close)
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    CARD CONTENT                         │  ← Content area
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ○ input    │    Status: Active    │    ○ output       │  ← Footer (ports, status)
└─────────────────────────────────────────────────────────┘
      ↑                                        ↑
   Input Port                             Output Port
```

### 14.3 Dropdown Info Menu

Each card has an expandable info section:

```typescript
interface InfoMenuSection {
  title: string;
  content: string | React.ReactNode;
  isExpandable: boolean;
}

// Example sections per card type:
const cardInfoSections = {
  humanStates: [
    { title: 'What are Human States?', content: '...', isExpandable: true },
    { title: 'State Transitions', content: '...', isExpandable: true },
    { title: 'Connected Systems', content: '...', isExpandable: true }
  ],
  database: [
    { title: 'Database Categories', content: '...', isExpandable: true },
    { title: 'Data Flow', content: '...', isExpandable: true },
    { title: 'Storage Limits', content: '...', isExpandable: true }
  ]
  // ... etc for each card type
};
```

---

## 15. Technical Implementation Plan

### 15.1 Phase 1: Foundation (Canvas Infrastructure)

| Task | Description | Priority |
|------|-------------|----------|
| 1.1 | Create `/playground` route and page | High |
| 1.2 | Implement `InfiniteCanvas` component with pan/zoom | High |
| 1.3 | Create `CanvasControls` component | High |
| 1.4 | Implement canvas state management | High |
| 1.5 | Add landing page entry button | High |
| 1.6 | Set up component registry system | Medium |

### 15.2 Phase 2: Base Components

| Task | Description | Priority |
|------|-------------|----------|
| 2.1 | Create `BaseCard` draggable wrapper | High |
| 2.2 | Implement `DropdownInfoMenu` component | High |
| 2.3 | Create `ConnectionLine` component | Medium |
| 2.4 | Build `StateSelector` UI component | Medium |
| 2.5 | Implement component palette sidebar | Medium |

### 15.3 Phase 3: System Cards

| Task | Description | Priority |
|------|-------------|----------|
| 3.1 | Build `HumanStateCard` with 7 states | High |
| 3.2 | Build `DatabaseCard` with DB bar visualization | High |
| 3.3 | Build `InterfaceLayerCard` | High |
| 3.4 | Build `PromptChainCard` | High |
| 3.5 | Build `DataSourcesCard` | Medium |
| 3.6 | Build `KnowledgeBaseCard` | Medium |
| 3.7 | Build `LivingDocumentCard` | Medium |
| 3.8 | Build `FunctionTypeCard` | Medium |

### 15.4 Phase 4: Visualizations

| Task | Description | Priority |
|------|-------------|----------|
| 4.1 | Create `DBBarVisualization` component | High |
| 4.2 | Create `StateFlowDiagram` component | Medium |
| 4.3 | Create `PromptFlowChart` component | Medium |
| 4.4 | Create `GoalProgressArc` component | Medium |
| 4.5 | Create loop/arrow/funnel/web visualizations for core functions | Medium |

### 15.5 Phase 5: Interactions & Simulation

| Task | Description | Priority |
|------|-------------|----------|
| 5.1 | Implement state change simulation engine | Medium |
| 5.2 | Add component connection logic | Medium |
| 5.3 | Implement real-time metric updates | Low |
| 5.4 | Add save/load canvas configuration | Low |
| 5.5 | Implement simulation playback controls | Low |

---

## 16. Component Reuse Strategy

### 16.1 Existing Components to Reuse

| Existing Component | Reuse For | Modifications Needed |
|-------------------|-----------|---------------------|
| `CTAButton` | Playground entry button, card actions | Minimal - styling only |
| `ModalStack` + `useModals` | Info popups, notifications | None |
| `EventFeed` | Activity log panel | Filter for playground events |
| `StatePanel` | Debug/inspection panel | Adapt tabs for canvas state |
| `LayerStackVisualization` | DB bar visualization | Adapt for horizontal bars |
| `DynamicDBWall` | Database grid visualization | Color scheme updates |
| `OrganizationalFlowDiagram` | Prompt chain flow | Simplify for card size |
| `eventBus` | Canvas event communication | Add playground event types |
| Gradient/animation CSS | All card styling | None |

### 16.2 New Components Required

| Component | Purpose | Complexity |
|-----------|---------|------------|
| `InfiniteCanvas` | Main canvas container with transform | High |
| `BaseCard` | Draggable card wrapper | Medium |
| `DropdownInfoMenu` | Expandable info sections | Low |
| `ConnectionLine` | SVG line between components | Medium |
| `ComponentPalette` | Sidebar with available components | Low |
| `CanvasControls` | Zoom/pan controls | Low |
| All 8 system cards | Individual card implementations | Medium each |

---

## 17. Data Structures & Types

### 17.1 Complete Type Definitions

```typescript
// ============================================
// FILE: lib/playground/types.ts
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

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: Position;
  size: Size;
  zIndex: number;
  isExpanded: boolean;
  isMinimized: boolean;
  data: ComponentData;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
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

export type ComponentData =
  | HumanStatesData
  | DatabaseData
  | InterfaceLayerData
  | PromptChainData
  | DataSourcesData
  | KnowledgeBaseData
  | LivingDocumentsData
  | CoreFunctionsData;

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

export interface HumanStatesData {
  selectedState: HumanStateId;
  states: HumanWorkflowState[];
}

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

// ----- Database Types -----

export interface DatabaseData {
  bars: DatabaseBar[];
  totalSize: number;
  maxSize: number;
}

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

// ----- Interface Layer Types -----

export interface InterfaceLayerData {
  localStorage: StorageState;
  sessionStorage: StorageState;
  interSessionStorage: InterSessionState;
  associatedPrompts: InterfacePrompt[];
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

export interface StorageItem {
  key: string;
  value: unknown;
  type: 'string' | 'object' | 'array' | 'number' | 'boolean';
  size: number;
  createdAt: string;
  updatedAt: string;
  accessCount: number;
}

export interface InterfacePrompt {
  id: string;
  name: string;
  trigger: PromptTrigger;
  template: string;
  priority: number;
  isActive: boolean;
}

export interface PromptTrigger {
  type: 'variable_filled' | 'storage_change' | 'threshold' | 'event';
  condition: string;
  variables: string[];
}

// ----- Prompt Chain Types -----

export interface PromptChainData {
  prompts: SystemPrompt[];
  activeChain: string[];
  conditions: PromptCondition[];
  executionHistory: PromptExecution[];
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

// ----- Data Sources Types -----

export interface DataSourcesData {
  sources: DataSource[];
  pipeline: Pipeline;
  throughput: number;
  backlog: number;
}

export interface DataSource {
  id: string;
  type: DataSourceType;
  name: string;
  icon: string;
  status: SourceStatus;
  lastInput: string;
  inputCount: number;
}

export type DataSourceType =
  | 'meetings'
  | 'brain_dumps'
  | 'consciousness_stream'
  | 'documents'
  | 'conversations'
  | 'external_apis'
  | 'manual_input';

export type SourceStatus = 'active' | 'idle' | 'processing' | 'error';

export interface Pipeline {
  id: string;
  stages: PipelineStage[];
  currentStage: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  type: 'ingest' | 'transform' | 'enrich' | 'validate' | 'store';
  status: 'idle' | 'processing' | 'complete' | 'error';
  itemsProcessed: number;
  totalItems: number;
}

// ----- Knowledge Base Types -----

export interface KnowledgeBaseData {
  hierarchy: HierarchyLevel[];
  mappings: InformationMapping[];
  goalProgress: GoalProgress[];
  recentActivity: number;
  unmappedItems: number;
}

export interface HierarchyLevel {
  id: string;
  level: number;
  name: string;
  type: HierarchyType;
  items: KnowledgeItem[];
  color: string;
}

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

// ----- Living Documents Types -----

export interface LivingDocumentsData {
  documents: LivingDocument[];
  statusTrackers: StatusTracker[];
  actionPropagation: ActionPropagation[];
  clarityScore: number;
  definedItems: number;
  totalItems: number;
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

// ----- Core Functions Types -----

export interface CoreFunctionsData {
  functions: CoreFunction[];
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
```

---

## 18. Project Management Checklist

### 18.1 Pre-Implementation

- [ ] Review and approve specification document
- [ ] Finalize component designs
- [ ] Set up project structure
- [ ] Create placeholder files

### 18.2 Phase 1: Foundation

- [ ] Create `/playground` route
- [ ] Implement `InfiniteCanvas` with pan
- [ ] Implement `InfiniteCanvas` with zoom
- [ ] Create `CanvasControls` component
- [ ] Implement canvas state with React state/context
- [ ] Add playground entry button to landing page
- [ ] Style entry button with gradient effects
- [ ] Create component registry

### 18.3 Phase 2: Base Components

- [ ] Create `BaseCard` component
- [ ] Implement drag functionality
- [ ] Add expand/collapse behavior
- [ ] Create `DropdownInfoMenu`
- [ ] Create `ConnectionLine` SVG component
- [ ] Build `StateSelector` UI
- [ ] Implement `ComponentPalette` sidebar

### 18.4 Phase 3: System Cards

- [ ] `HumanStateCard` - UI layout
- [ ] `HumanStateCard` - State selection logic
- [ ] `HumanStateCard` - Info dropdown content
- [ ] `DatabaseCard` - UI layout
- [ ] `DatabaseCard` - DB bar visualization
- [ ] `DatabaseCard` - Row detail expansion
- [ ] `InterfaceLayerCard` - UI layout
- [ ] `InterfaceLayerCard` - Storage visualizations
- [ ] `InterfaceLayerCard` - Prompt list
- [ ] `PromptChainCard` - UI layout
- [ ] `PromptChainCard` - Flow diagram
- [ ] `PromptChainCard` - Conditions panel
- [ ] `DataSourcesCard` - UI layout
- [ ] `DataSourcesCard` - Source list
- [ ] `DataSourcesCard` - Pipeline visualization
- [ ] `KnowledgeBaseCard` - UI layout
- [ ] `KnowledgeBaseCard` - Hierarchy visualization
- [ ] `KnowledgeBaseCard` - Goal progress
- [ ] `LivingDocumentCard` - UI layout
- [ ] `LivingDocumentCard` - Status trackers
- [ ] `LivingDocumentCard` - Action propagation
- [ ] `FunctionTypeCard` - UI layout
- [ ] `FunctionTypeCard` - Four function visualizations
- [ ] `FunctionTypeCard` - Metrics display

### 18.5 Phase 4: Visualizations

- [ ] `DBBarVisualization` - Horizontal bar component
- [ ] `StateFlowDiagram` - State transition arrows
- [ ] `PromptFlowChart` - Node/edge diagram
- [ ] `GoalProgressArc` - Circular progress
- [ ] Loop visualization (retention)
- [ ] Arrow visualization (conversion)
- [ ] Funnel visualization (abstraction)
- [ ] Web visualization (exploration)

### 18.6 Phase 5: Interactions

- [ ] State simulation engine
- [ ] Component connection logic
- [ ] Event propagation between components
- [ ] Real-time metric updates
- [ ] Canvas configuration save/load
- [ ] Simulation controls (play/pause/step)

### 18.7 Testing & Polish

- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility review
- [ ] Documentation updates

---

## 19. Future Iterations

### 19.1 Planned Enhancements

1. **Simulation Playback**: Record and replay system state changes
2. **Custom State Definitions**: Allow users to define their own 7 states
3. **Template Configurations**: Pre-built canvas layouts for different use cases
4. **Export/Share**: Export canvas configurations and share with others
5. **Real Data Integration**: Connect to actual system data instead of mock data
6. **Collaborative Canvas**: Multi-user real-time collaboration
7. **3D Visualization Mode**: Optional 3D view of system relationships
8. **AI-Assisted Assembly**: Suggest component arrangements based on goals

### 19.2 Metrics & Analytics

1. Track most-used components
2. Measure time spent in different views
3. Analyze common connection patterns
4. Monitor simulation engagement

---

## 20. Validation Against Original Requirements

### 20.1 Requirements Checklist

| Original Requirement | Specification Section | Status |
|---------------------|----------------------|--------|
| New route at top with shiny button | Section 3 | ✅ Defined |
| Go to visualization experience button | Section 3.2 | ✅ Defined |
| Reuse existing components | Section 16 | ✅ Strategy defined |
| Flattened DB bar with colors/states | Section 7 | ✅ Defined |
| Row component for DB visualization | Section 7.3 | ✅ Defined |
| Everything on one canvas | Section 4 | ✅ Defined |
| Zoom in on components | Section 4.1 | ✅ Defined |
| Move components around | Section 4.1, 14 | ✅ Defined |
| Cards with UI elements | Section 14 | ✅ Defined |
| Dropdown information menus | Section 14.3 | ✅ Defined |
| Human workflows/states (7 states) | Section 6 | ✅ Defined |
| Database layer | Section 7 | ✅ Defined |
| Interface layer with storage | Section 8 | ✅ Defined |
| LLM analysis & system prompt chain | Section 9 | ✅ Defined |
| Conditional prompt invocation | Section 9.2, 9.3 | ✅ Defined |
| Data sources & pipelines | Section 10 | ✅ Defined |
| Persistent knowledge base | Section 11 | ✅ Defined |
| Information hierarchy (goals → realtime) | Section 11 | ✅ Defined |
| Mapping new info to existing | Section 11.2 | ✅ Defined |
| Living documents for status | Section 12 | ✅ Defined |
| Current project/submission state | Section 12.2 | ✅ Defined |
| Actions propagating to goals | Section 12.2 | ✅ Defined |
| Retention & engagement loop | Section 13 | ✅ Defined |
| Conversion/transaction function | Section 13 | ✅ Defined |
| Abstraction to clarity function | Section 13 | ✅ Defined |
| Exploration/analysis function | Section 13 | ✅ Defined |
| Assemble components into systems | Section 5.2, 14 | ✅ Defined |
| Placeholder state names (state_1, etc.) | Section 6.2 | ✅ Defined |
| Meta tag descriptions | Section 6.2, 6.3 | ✅ Defined |

### 20.2 Verification Summary

**All 28 identified requirements have been addressed in this specification.**

Key alignments:
- ✅ Route structure with prominent entry button
- ✅ Infinite canvas with zoom/pan/drag
- ✅ 8 distinct component systems as cards
- ✅ 7 human workflow states with placeholders
- ✅ Database visualization with colored bars
- ✅ Interface layer with storage and prompts
- ✅ LLM prompt chain with conditional logic
- ✅ Data sources with pipeline visualization
- ✅ Knowledge hierarchy from goals to real-time
- ✅ Living documents with status tracking
- ✅ 4 core function types with visual representations
- ✅ Card architecture with dropdowns and connections
- ✅ Complete TypeScript type definitions
- ✅ Implementation phases and checklist

### 20.3 Items Requiring User Clarification

1. **State Names**: Currently using "State One" through "State Seven" - should these have more specific names?
2. **7 States Content**: The actual characteristics, triggers, and transitions for each state need to be defined
3. **Prompt Templates**: Actual prompt content for system prompts needs to be provided
4. **Data Source Types**: Are the 7 source types (meetings, brain_dumps, etc.) correct?
5. **Metric Definitions**: Specific metrics for each core function need values and calculation methods
6. **Connection Rules**: Which components should be able to connect to which others?
7. **Simulation Behavior**: How should state changes propagate between components?

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | 2025-11-23 | Initial specification document |

---

*This document serves as the complete specification for the Infinite Canvas Playground feature. All implementation should reference this document for requirements, data structures, and design decisions.*

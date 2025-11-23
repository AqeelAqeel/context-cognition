# Infinite Canvas Playground - Project Management Document

> **Project:** Context Cognition Visualization Playground
> **Created:** 2025-11-23
> **Reference:** [Full Specification](./INFINITE_CANVAS_PLAYGROUND_SPECIFICATION.md)

---

## Quick Reference

### Project Summary
Build an infinite canvas playground at `/playground` that visualizes the complete cognitive architecture system with draggable, interactive component cards.

### Key Deliverables
1. `/playground` route with infinite canvas
2. Landing page entry button ("Go to Visualization Experience")
3. 8 system component cards
4. Canvas controls (zoom, pan, reset)
5. Component connection system

---

## Task Breakdown by Component

### ENTRY POINT

#### EP-1: Landing Page Entry Button
```
Location: app/page.tsx (top of page)
Component: PlaygroundEntryButton
```
- [ ] Create `PlaygroundEntryButton` component
- [ ] Add rainbow gradient glow styling
- [ ] Implement hover animations (scale, glow intensity)
- [ ] Add navigation to `/playground`
- [ ] Position at top of landing page before HeroSection

#### EP-2: Playground Route
```
Location: app/playground/page.tsx
```
- [ ] Create route directory structure
- [ ] Create page.tsx with basic layout
- [ ] Set up metadata for page
- [ ] Import and render InfiniteCanvas

---

### CANVAS INFRASTRUCTURE

#### CI-1: InfiniteCanvas Component
```
Location: components/playground/InfiniteCanvas.tsx
```
- [ ] Create canvas container with full viewport
- [ ] Implement pan (mouse drag on background)
- [ ] Implement zoom (scroll wheel, 0.1x - 5x range)
- [ ] Handle viewport transform calculations
- [ ] Render components at transformed positions
- [ ] Background grid pattern (optional)

#### CI-2: Canvas State Management
```
Location: lib/playground/canvasState.ts
```
- [ ] Define CanvasState interface
- [ ] Create React context for canvas state
- [ ] Implement viewport state (x, y, zoom)
- [ ] Implement component positions array
- [ ] Implement connections array
- [ ] Add selection state

#### CI-3: Canvas Controls
```
Location: components/playground/CanvasControls.tsx
```
- [ ] Zoom in button (+)
- [ ] Zoom out button (-)
- [ ] Zoom percentage display
- [ ] Reset view button
- [ ] Fit all components button
- [ ] Grid toggle (optional)

#### CI-4: Component Palette
```
Location: components/playground/ComponentPalette.tsx
```
- [ ] Sidebar with available component list
- [ ] Drag to add new component
- [ ] Component icons and labels
- [ ] Collapsible sidebar

---

### BASE CARD SYSTEM

#### BC-1: BaseCard Component
```
Location: components/playground/cards/BaseCard.tsx
```
- [ ] Card container with header/body/footer
- [ ] Drag handle in header
- [ ] Title with icon
- [ ] Info dropdown button [▼]
- [ ] Collapse button [−]
- [ ] Close/remove button [×]
- [ ] Draggable behavior (mouse events)
- [ ] Z-index management on selection
- [ ] Expand/collapse animation

#### BC-2: DropdownInfoMenu
```
Location: components/playground/ui/DropdownInfoMenu.tsx
```
- [ ] Expandable panel below header
- [ ] Multiple collapsible sections
- [ ] Smooth expand/collapse animation
- [ ] Section titles and content areas

#### BC-3: ConnectionLine
```
Location: components/playground/ui/ConnectionLine.tsx
```
- [ ] SVG path between two points
- [ ] Curved bezier path
- [ ] Color coding by connection type
- [ ] Animated flow indicators (optional)
- [ ] Connection port detection

#### BC-4: StateSelector
```
Location: components/playground/ui/StateSelector.tsx
```
- [ ] Grid of selectable state buttons
- [ ] Active state highlighting
- [ ] Color coding per state
- [ ] Click to select handler

---

### SYSTEM CARDS

#### SC-1: HumanStateCard
```
Location: components/playground/cards/HumanStateCard.tsx
Data: 7 human workflow states
```

**UI Elements:**
- [ ] Current state display (name + color indicator)
- [ ] 7-button state selector grid
- [ ] State details panel (expandable)
  - [ ] Meta description
  - [ ] Cognitive load bar
  - [ ] Attention focus indicator
  - [ ] Active prompts list

**Data Structure:**
```typescript
states: [
  { id: 'state_1', name: 'State One', metaDescription: '...', color: '#3B82F6', ... },
  { id: 'state_2', name: 'State Two', metaDescription: '...', color: '#8B5CF6', ... },
  { id: 'state_3', name: 'State Three', metaDescription: '...', color: '#EC4899', ... },
  { id: 'state_4', name: 'State Four', metaDescription: '...', color: '#F59E0B', ... },
  { id: 'state_5', name: 'State Five', metaDescription: '...', color: '#10B981', ... },
  { id: 'state_6', name: 'State Six', metaDescription: '...', color: '#EF4444', ... },
  { id: 'state_7', name: 'State Seven', metaDescription: '...', color: '#6366F1', ... },
]
```

---

#### SC-2: DatabaseCard
```
Location: components/playground/cards/DatabaseCard.tsx
Data: 8 database categories as bars
```

**UI Elements:**
- [ ] 8 horizontal bars with labels
- [ ] Fill level percentage per bar
- [ ] Color coding per category
- [ ] Active/idle status indicator
- [ ] Row click to expand details
- [ ] Row detail panel
  - [ ] Record count
  - [ ] Last update time
  - [ ] Size info

**Data Structure:**
```typescript
categories: [
  { id: 'user_context', label: 'user_context', color: '#06B6D4', fillLevel: 78 },
  { id: 'session_memory', label: 'session_memory', color: '#A855F7', fillLevel: 42 },
  { id: 'persistent_goals', label: 'persistent_goals', color: '#22C55E', fillLevel: 100 },
  { id: 'interaction_history', label: 'interaction_history', color: '#3B82F6', fillLevel: 56 },
  { id: 'derived_insights', label: 'derived_insights', color: '#EC4899', fillLevel: 15 },
  { id: 'system_config', label: 'system_config', color: '#6B7280', fillLevel: 100 },
  { id: 'prompt_templates', label: 'prompt_templates', color: '#F59E0B', fillLevel: 72 },
  { id: 'knowledge_graph', label: 'knowledge_graph', color: '#6366F1', fillLevel: 89 },
]
```

---

#### SC-3: InterfaceLayerCard
```
Location: components/playground/cards/InterfaceLayerCard.tsx
Data: Storage states + associated prompts
```

**UI Elements:**
- [ ] Local Storage section
  - [ ] Usage bar (used/max)
  - [ ] Item count
- [ ] Session Storage section
  - [ ] Usage bar (used/max)
  - [ ] Item count
- [ ] Inter-Session Storage section
  - [ ] Usage bar
  - [ ] Sync status indicator
  - [ ] Last sync time
- [ ] Associated Prompts list (expandable)
  - [ ] Prompt name
  - [ ] Trigger condition
  - [ ] Active/inactive status

---

#### SC-4: PromptChainCard
```
Location: components/playground/cards/PromptChainCard.tsx
Data: System prompts with flow and conditions
```

**UI Elements:**
- [ ] Flow diagram section
  - [ ] Prompt nodes as boxes
  - [ ] Arrows showing flow/dependencies
  - [ ] Active/pending status per node
- [ ] Conditions panel (expandable)
  - [ ] List of conditions
  - [ ] Met/unmet status (✓/✗/○)
  - [ ] Variable name and operator
- [ ] Legend for statuses

**Prompt Flow Example:**
```
context_builder → analysis_engine → response_former
                       ↓
              [insight_extract, risk_assess]
```

---

#### SC-5: DataSourcesCard
```
Location: components/playground/cards/DataSourcesCard.tsx
Data: 7 source types + pipeline status
```

**UI Elements:**
- [ ] Source list with icons
  - [ ] Meetings 📅
  - [ ] Brain Dumps 🧠
  - [ ] Consciousness 💭
  - [ ] Documents 📄
  - [ ] Conversations 💬
  - [ ] External APIs 🔌
  - [ ] Manual Input ✏️
- [ ] Status indicator per source
- [ ] Input count and last input time
- [ ] Pipeline visualization
  - [ ] Stage boxes: INGEST → TRANSFORM → ENRICH → STORE
  - [ ] Progress per stage
- [ ] Throughput and backlog metrics

---

#### SC-6: KnowledgeBaseCard
```
Location: components/playground/cards/KnowledgeBaseCard.tsx
Data: Hierarchy levels + goal progress
```

**UI Elements:**
- [ ] Level 1: General Goals section
  - [ ] Goal list with progress bars
- [ ] Level 2: Strategic Context section
  - [ ] Context item cards
- [ ] Level 3: Real-time Updates section
  - [ ] New data point count
  - [ ] Mapping progress indicator
- [ ] Hierarchy flow arrows (maps to, informs)
- [ ] Recent activity count
- [ ] Unmapped items count

---

#### SC-7: LivingDocumentCard
```
Location: components/playground/cards/LivingDocumentCard.tsx
Data: Documents, status trackers, action propagation
```

**UI Elements:**
- [ ] Active Documents list
  - [ ] Document name
  - [ ] Live/Syncing/Stale status
  - [ ] Last updated time
- [ ] Definition Status table
  - [ ] Item name column
  - [ ] Defined (✓/◐/✗) column
  - [ ] Being Done (✓/◐/✗) column
- [ ] Action Propagation section
  - [ ] Action name
  - [ ] Propagation path (Task → Project → Goal)
  - [ ] Progress bar
- [ ] Summary metrics
  - [ ] Clarity score
  - [ ] Items defined / total

---

#### SC-8: FunctionTypeCard
```
Location: components/playground/cards/CoreFunctionsCard.tsx
Data: 4 core function types with metrics
```

**UI Elements:**
- [ ] Retention & Engagement section
  - [ ] Loop/circle visualization
  - [ ] Intensity bar
  - [ ] Depth and duration metrics
- [ ] Conversion & Transaction section
  - [ ] Arrow/progress visualization (○ → ◐ → ● → ✓)
  - [ ] Progress percentage
- [ ] Abstraction → Clarity section
  - [ ] Funnel visualization
  - [ ] Definition percentage
  - [ ] Ambiguity score (inverse)
- [ ] Exploration & Analysis section
  - [ ] Web/network visualization
  - [ ] Coverage percentage
  - [ ] Insights count
  - [ ] Understanding level

---

### VISUALIZATIONS

#### VZ-1: DBBarVisualization
```
Location: components/playground/visualizations/DBBarVisualization.tsx
```
- [ ] Single horizontal bar component
- [ ] Props: label, color, fillLevel, isActive
- [ ] Fill animation
- [ ] Hover effect
- [ ] Status indicator dot

#### VZ-2: LoopVisualization (Retention)
```
Location: components/playground/visualizations/LoopVisualization.tsx
```
- [ ] Circular arrow loop SVG
- [ ] Animated rotation
- [ ] Intensity affects speed/glow

#### VZ-3: ArrowVisualization (Conversion)
```
Location: components/playground/visualizations/ArrowVisualization.tsx
```
- [ ] Horizontal progress arrow
- [ ] Stage markers (○ ◐ ● ✓)
- [ ] Progress fill animation

#### VZ-4: FunnelVisualization (Abstraction)
```
Location: components/playground/visualizations/FunnelVisualization.tsx
```
- [ ] Funnel/trapezoid shape
- [ ] Wide top (abstract) → narrow bottom (concrete)
- [ ] Fill level based on definition %

#### VZ-5: WebVisualization (Exploration)
```
Location: components/playground/visualizations/WebVisualization.tsx
```
- [ ] Node network diagram
- [ ] Connected nodes with lines
- [ ] Coverage affects visible connections

---

### TYPE DEFINITIONS

#### TD-1: Core Types
```
Location: lib/playground/types.ts
```
- [ ] CanvasState, Viewport, Position, Size
- [ ] CanvasComponent, ComponentType, ComponentData
- [ ] Connection, ConnectionType
- [ ] All card-specific data types (from spec)

#### TD-2: Event Types
```
Location: lib/playground/types.ts
```
- [ ] PlaygroundEvent union type
- [ ] Component events (added, removed, moved, selected)
- [ ] State events (state_changed)
- [ ] Connection events (created, removed)
- [ ] Viewport events (changed)

---

### MOCK DATA

#### MD-1: Initial Mock Data
```
Location: lib/playground/mockData.ts
```
- [ ] Default 7 human states with placeholder content
- [ ] Default 8 database categories with sample values
- [ ] Default interface layer state
- [ ] Sample prompt chain with 5+ prompts
- [ ] 7 data sources with sample metrics
- [ ] Knowledge hierarchy with sample goals
- [ ] Living documents with sample status
- [ ] 4 core functions with initial metrics

---

## File Structure Checklist

```
app/
├── page.tsx                                 [ ] Add entry button
├── playground/
│   └── page.tsx                             [ ] Create

components/
├── playground/
│   ├── InfiniteCanvas.tsx                   [ ]
│   ├── CanvasControls.tsx                   [ ]
│   ├── ComponentPalette.tsx                 [ ]
│   ├── cards/
│   │   ├── BaseCard.tsx                     [ ]
│   │   ├── HumanStateCard.tsx               [ ]
│   │   ├── DatabaseCard.tsx                 [ ]
│   │   ├── InterfaceLayerCard.tsx           [ ]
│   │   ├── PromptChainCard.tsx              [ ]
│   │   ├── DataSourcesCard.tsx              [ ]
│   │   ├── KnowledgeBaseCard.tsx            [ ]
│   │   ├── LivingDocumentCard.tsx           [ ]
│   │   └── CoreFunctionsCard.tsx            [ ]
│   ├── visualizations/
│   │   ├── DBBarVisualization.tsx           [ ]
│   │   ├── LoopVisualization.tsx            [ ]
│   │   ├── ArrowVisualization.tsx           [ ]
│   │   ├── FunnelVisualization.tsx          [ ]
│   │   └── WebVisualization.tsx             [ ]
│   └── ui/
│       ├── DropdownInfoMenu.tsx             [ ]
│       ├── StateSelector.tsx                [ ]
│       └── ConnectionLine.tsx               [ ]

lib/
├── playground/
│   ├── types.ts                             [ ]
│   ├── canvasState.ts                       [ ]
│   ├── componentRegistry.ts                 [ ]
│   └── mockData.ts                          [ ]

docs/
├── INFINITE_CANVAS_PLAYGROUND_SPECIFICATION.md  [✓] Created
└── INFINITE_CANVAS_PROJECT_MANAGEMENT.md        [✓] Created
```

---

## Implementation Order (Recommended)

### Sprint 1: Foundation
1. TD-1: Core Types
2. CI-2: Canvas State Management
3. CI-1: InfiniteCanvas Component (basic)
4. EP-2: Playground Route
5. EP-1: Landing Page Entry Button

### Sprint 2: Card System
1. BC-1: BaseCard Component
2. BC-2: DropdownInfoMenu
3. BC-4: StateSelector
4. CI-3: Canvas Controls

### Sprint 3: First Cards
1. MD-1: Mock Data (initial)
2. SC-1: HumanStateCard
3. VZ-1: DBBarVisualization
4. SC-2: DatabaseCard

### Sprint 4: More Cards
1. SC-3: InterfaceLayerCard
2. SC-4: PromptChainCard
3. SC-5: DataSourcesCard

### Sprint 5: Remaining Cards
1. SC-6: KnowledgeBaseCard
2. SC-7: LivingDocumentCard
3. SC-8: FunctionTypeCard

### Sprint 6: Visualizations & Polish
1. VZ-2, VZ-3, VZ-4, VZ-5: Function visualizations
2. BC-3: ConnectionLine
3. CI-4: ComponentPalette
4. Final polish and testing

---

## Variables & State Placeholders

### Human States (to be defined later)
```typescript
// Placeholder definitions - replace with actual content
const STATE_PLACEHOLDERS = {
  state_1: {
    name: "State One",
    metaDescription: "Initial awareness state - baseline cognition",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_2: {
    name: "State Two",
    metaDescription: "Engaged attention - focused processing",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_3: {
    name: "State Three",
    metaDescription: "Deep analysis - pattern recognition active",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_4: {
    name: "State Four",
    metaDescription: "Creative synthesis - novel connections",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_5: {
    name: "State Five",
    metaDescription: "Decision crystallization - choice formation",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_6: {
    name: "State Six",
    metaDescription: "Action execution - implementation mode",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  },
  state_7: {
    name: "State Seven",
    metaDescription: "Reflection integration - learning consolidation",
    characteristics: ["TBD"],
    triggeredBy: ["TBD"],
    leadsTo: ["TBD"]
  }
};
```

### System Prompt Placeholders
```typescript
// Placeholder prompts - replace with actual prompt templates
const PROMPT_PLACEHOLDERS = {
  context_builder: {
    name: "Context Builder",
    category: "interface_layer",
    condition: "ON variable: user_id EXISTS",
    template: "/* TBD: Actual prompt content */"
  },
  analysis_engine: {
    name: "Analysis Engine",
    category: "analysis_layer",
    condition: "ON context.length > 100",
    template: "/* TBD: Actual prompt content */"
  },
  insight_extract: {
    name: "Insight Extractor",
    category: "analysis_layer",
    condition: "ON taskHypothesis FILLED",
    template: "/* TBD: Actual prompt content */"
  },
  risk_assess: {
    name: "Risk Assessor",
    category: "analysis_layer",
    condition: "ON riskFlags.length > 0",
    template: "/* TBD: Actual prompt content */"
  },
  response_former: {
    name: "Response Former",
    category: "response_layer",
    condition: "ON analysisComplete == true",
    template: "/* TBD: Actual prompt content */"
  }
};
```

---

## Notes for Implementation

1. **Reuse Existing**: Leverage `eventBus.ts` for component communication
2. **Styling**: Follow existing gradient patterns in `globals.css`
3. **Types**: Extend from existing `contracts.ts` patterns
4. **Animations**: Use existing keyframe animations where possible
5. **Dark Theme**: All components should work on black background

---

## Questions to Resolve

1. Should the canvas have a minimap for navigation?
2. What are the actual 7 human states and their definitions?
3. Which components can connect to which others?
4. Should there be preset canvas layouts?
5. What simulation behaviors should exist between components?

---

*Last Updated: 2025-11-23*

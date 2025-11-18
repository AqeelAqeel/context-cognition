# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Context Cognition** is an interactive demonstration platform for the **Adaptive Context Framework (ACF)**, a 3-layer LLM architecture visualization system. The application showcases how intelligent systems can process user requests through multiple specialized layers: CE (Chat Engine) → OA (Observer/Analyst) → CO (Conductor/Orchestrator).

### Application Purpose
- Visualize adaptive context processing in real-time
- Demonstrate three distinct use cases: Slack rollout planning, investor pitch creation, and Medicare form assistance
- Show how system state, user context, and AI capabilities combine to enable intelligent, context-aware interactions
- Display the flow of data through the CE → OA → CO pipeline

## Development Commands

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code style issues

## Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Fonts**: Inter (sans-serif) and JetBrains Mono (monospace) from Google Fonts
- **Linting**: ESLint 9 with Next.js core-web-vitals and TypeScript configurations

## Project Architecture

### Directory Structure

```
/
├── app/                      # Next.js App Router directory
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Main ACF Demo component
│   ├── globals.css          # Global Tailwind CSS styles
│   └── favicon.ico          # Application favicon
├── components/              # React components
│   ├── ChatCanvas.tsx       # Chat interface for user interactions
│   ├── ConversionStrip.tsx  # Suggested actions/affordances display
│   ├── ConductorCard.tsx    # CO layer visualization card
│   ├── EventFeed.tsx        # Real-time activity log
│   ├── LayerExplainerModal.tsx  # Educational modals for layers
│   ├── LayerPanel.tsx       # Generic layer visualization panel
│   ├── ModalStack.tsx       # Modal management system
│   ├── ObservationsCard.tsx # OA layer observations display
│   ├── StatePanel.tsx       # System state monitoring panel
│   └── UseCaseTabs.tsx      # Use case switching tabs
├── lib/                     # Core logic libraries
│   ├── ce.ts               # Chat Engine (Layer A) - conversation handling
│   ├── oa.ts               # Observer/Analyst (Layer B) - derive insights from state
│   ├── co.ts               # Conductor/Orchestrator (Layer C) - context compilation
│   ├── contracts.ts        # TypeScript interfaces and types
│   ├── eventBus.ts         # Event system for component communication
│   └── mockData.ts         # Seeded data for use case scenarios
├── public/                 # Static assets
├── .gitignore             # Git ignore rules
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration for Tailwind
├── tsconfig.json          # TypeScript compiler configuration
├── CLAUDE.md              # This file
└── README.md              # Standard Next.js README
```

### Core Architecture: 3-Layer ACF System

#### Layer A: CE (Chat Engine)
**Location**: `lib/ce.ts`

**Responsibility**: Direct chat interaction and response generation

- Processes user messages and generates AI responses
- Operates as the conversational interface layer
- Uses context pack from Layer C to inform responses
- Exports `Message` interface and `ceTurn()` function

#### Layer B: OA (Observer/Analyst)
**Location**: `lib/oa.ts`

**Responsibility**: Derive insights and affordances from system state

- Analyzes `MachineState` and `PersistentState` to produce `DerivedVars`
- Generates task hypotheses, affordances, risk flags, and tool suggestions
- Creates query plans and recaps
- Key function: `oaRun(machineState, persistentState) → DerivedVars`

**DerivedVars Output**:
- `taskHypothesis`: What the system thinks the user is trying to accomplish
- `affordances`: Actions the system can enable given current state
- `riskFlags`: Potential issues (e.g., cognitive_load, budget warnings)
- `suggestedTools`: Recommended tools with arguments and reasoning
- `recap`: Summary of current context
- `queryPlan`: Suggested sequence of operations

#### Layer C: CO (Conductor/Orchestrator)
**Location**: `lib/co.ts`

**Responsibility**: Build context packs and compile system prompts

- Transforms state and derived variables into actionable context
- Compiles system prompts for AI interactions
- Manages objectives, constraints, and available tools
- Key functions:
  - `buildContextPack(machineState, persistentState, derivedVars) → ContextPack`
  - `compileSystemPrompt(contextPack) → string`

**ContextPack Structure**:
- `objectives`: Goals extracted from user profile and state
- `constraints`: Limitations (budget, cognitive load, etc.)
- `tools`: Available tools for the current context
- `memory`: Relevant historical facts and preferences
- `scene`: Current route, UI state, and feature flags

### State Management

#### MachineState
Ephemeral state that changes with each interaction:
- `route`: Current use case path (e.g., "/slack/rollout", "/pitch", "/medicare")
- `ui`: Panel selection and UI state
- `featureFlags`: Toggleable features
- `local` / `session`: Whitelisted state snapshots
- `timeISO`: Timestamp of current state

#### PersistentState
Long-lived user and system state:
- `userId`: User identifier
- `profile`: Role (PM, engineer, founder, senior_user) and tone preferences
- `longGoals` / `shortGoals`: User objectives with different decay rates
- `venue`: Source context (web, slack, docs) and tenant info
- `budgets`: Token limits and tool usage constraints
- `memory`: Historical facts, preferences, and commitments

### Event System

**Location**: `lib/eventBus.ts`

A simple event bus implementation for cross-component communication:
- `bus.emit(eventName, data)` - Emit events
- `bus.on(eventName, callback)` - Subscribe to events
- `bus.off(eventName, callback)` - Unsubscribe

**Key Events**:
- `state_changed`: When machine state updates
- `message_submitted`: When user or assistant sends a message

### Component Architecture

#### Main Page Component
**File**: `app/page.tsx`

The root `ACFDemo` component orchestrates the entire application:
1. Manages core state (persistentState, machineState, messages)
2. Computes derived state using the 3-layer pipeline
3. Handles user interactions (message sending, route changes, feature flags)
4. Renders the UI with nested components

**Data Flow**:
```
User Action
    ↓
MachineState Update
    ↓
oaRun() → DerivedVars
    ↓
buildContextPack() → ContextPack
    ↓
compileSystemPrompt() → String
    ↓
UI Update + CE Response
```

#### Key Components

**ChatCanvas** (`components/ChatCanvas.tsx`)
- Displays message history
- Handles user input
- Shows typing indicators

**StatePanel** (`components/StatePanel.tsx`)
- Monitors machine and persistent state
- Displays feature flags with toggle controls
- Shows budget and user profile information

**LayerPanel** (`components/LayerPanel.tsx`)
- Generic layer visualization component
- Displays OA and CO layer outputs
- Can be configured for different layer types

**ConversionStrip** (`components/ConversionStrip.tsx`)
- Shows suggested actions based on affordances
- Generates context-aware conversion opportunities
- Handles action click events

**ModalStack** (`components/ModalStack.tsx`)
- Manages multiple modal dialogs
- Supports budget warnings, risk alerts, and layer explanations
- Custom hook `useModals()` for modal state management

**UseCaseTabs** (`components/UseCaseTabs.tsx`)
- Switches between Slack, Pitch, and Medicare use cases
- Each use case has different seeded machine state

**EventFeed** (`components/EventFeed.tsx`)
- Real-time activity log
- Subscribes to event bus
- Displays state changes and message events

### Use Cases

The application demonstrates three distinct scenarios, each with seeded state:

1. **Slack Rollout** (`/slack/rollout`)
   - PM managing feature deployment
   - Affordances: Create checklists, validate message templates
   - Seeded state: `seededMachineSlack`

2. **Investor Pitch** (`/pitch`)
   - Founder preparing fundraising materials
   - Affordances: Generate outlines, extract proof points, refine narrative
   - Seeded state: `seededMachinePitch`

3. **Medicare Forms** (`/medicare`)
   - Senior user navigating Part B forms
   - Affordances: Prefill forms, generate call scripts
   - Cognitive load considerations
   - Seeded state: `seededMachineMedicare`

All seeded data is defined in `lib/mockData.ts`.

### Styling Approach

- **Tailwind CSS 4**: Utility-first CSS framework
- **Color Scheme**: Gray-based neutral palette with colored accents for layers
  - OA Layer: Amber/Orange gradient (`from-amber-50 to-orange-50`)
  - CO Layer: Indigo/Blue gradient (`from-indigo-50 to-blue-50`)
- **Typography**:
  - Sans-serif: Inter (via CSS variable `--font-inter`)
  - Monospace: JetBrains Mono (via CSS variable `--font-jetbrains-mono`)
- **Design System**: Cards with rounded corners, subtle shadows, clean borders

### Configuration Files

#### TypeScript (`tsconfig.json`)
- Target: ES2017
- Module resolution: bundler
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Includes Next.js plugin for type checking

#### ESLint (`eslint.config.mjs`)
- Uses `eslint/config` with defineConfig
- Extends Next.js core-web-vitals and TypeScript configs
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

#### Next.js (`next.config.ts`)
- Minimal configuration with TypeScript
- Default settings (no custom config options currently)

#### PostCSS (`postcss.config.mjs`)
- Integrates `@tailwindcss/postcss` for Tailwind CSS 4 support

## Development Workflow

### Starting Development
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open browser to http://localhost:3000
4. Application hot-reloads on file changes

### Adding Features
When adding new features, consider the ACF architecture:
1. **State changes**: Update `contracts.ts` interfaces if needed
2. **Layer logic**: Modify `ce.ts`, `oa.ts`, or `co.ts` for new behaviors
3. **UI components**: Create/update components in `components/`
4. **Events**: Use event bus for cross-component communication
5. **Mock data**: Update `mockData.ts` for new use cases

### Code Conventions

#### File Naming
- React components: PascalCase (e.g., `ChatCanvas.tsx`)
- Library modules: lowercase (e.g., `ce.ts`, `oa.ts`)
- Configuration: lowercase with extension (e.g., `next.config.ts`)

#### Type Safety
- All components should use TypeScript
- Import types from `lib/contracts.ts`
- Avoid `any` types; use proper interfaces
- Use `Record<string, T>` for dynamic objects

#### Component Structure
- Use functional components with hooks
- Client components must have `'use client'` directive at top
- Keep components focused and single-responsibility
- Extract complex logic to custom hooks or utility functions

#### State Management Patterns
- Use `useState` for local component state
- Use `useEffect` for side effects and derived computations
- Separate effects that trigger modals to avoid infinite loops
- Pass state down via props, events up via callbacks

### Performance Considerations

- The 3-layer pipeline runs on every machine state change
- Effects are optimized to only update when specific state keys change
- Chat messages are cleared when switching use cases
- Mock data simulates API delays for realistic UX

### Testing Recommendations

When adding tests (not currently implemented):
- Test each layer function independently (`ce`, `oa`, `co`)
- Verify state transformations produce expected outputs
- Test component rendering with different state configurations
- Mock event bus for component isolation

## Key Patterns & Best Practices

### Adding a New Use Case
1. Create seeded `MachineState` in `lib/mockData.ts`
2. Add route pattern (e.g., "/new-use-case")
3. Update `handleRouteChange` in `app/page.tsx`
4. Add tab in `UseCaseTabs.tsx`
5. Define affordances in OA layer logic
6. Configure conversion actions in CO layer

### Adding a New Component
1. Create file in `components/` directory
2. Export component as default or named export
3. Import types from `@/lib/contracts`
4. Use Tailwind classes for styling
5. Subscribe to event bus if needed for reactivity

### Modifying Layer Logic
- **CE (ce.ts)**: Update for new response generation patterns
- **OA (oa.ts)**: Add new derived variable calculations or risk detection
- **CO (co.ts)**: Extend context pack structure or prompt compilation

### Adding Feature Flags
1. Add flag to `MachineState.featureFlags` in seeded data
2. Update `handleFeatureFlagToggle` if special logic needed
3. Access flag in layer logic or components via `machineState.featureFlags[flagName]`

### Event Bus Usage
```typescript
// Emit an event
bus.emit('custom_event', { data: 'value' });

// Subscribe to event
useEffect(() => {
  const handler = (data) => console.log(data);
  bus.on('custom_event', handler);
  return () => bus.off('custom_event', handler);
}, []);
```

## Troubleshooting

### Build Errors
- Run `npm run lint` to check for linting issues
- Ensure TypeScript errors are resolved (`tsc --noEmit`)
- Clear `.next` directory: `rm -rf .next`

### Runtime Errors
- Check browser console for client-side errors
- Verify all imports use `@/*` alias correctly
- Ensure `'use client'` directive is present for interactive components

### State Not Updating
- Check that state updates trigger in the correct order
- Verify `useEffect` dependencies include all relevant state keys
- Use React DevTools to inspect component state

### Styling Issues
- Ensure Tailwind classes are spelled correctly
- Check that `globals.css` is imported in `layout.tsx`
- Verify font variables are applied: `font-sans` uses Inter, `font-mono` uses JetBrains Mono

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Future Enhancements

Consider these potential improvements:
- Add persistent storage (localStorage/database) for user state
- Implement actual LLM API integration (replace mock CE)
- Add unit and integration tests
- Create additional use cases
- Build admin panel for configuring affordances and tools
- Add analytics/telemetry for layer performance
- Implement accessibility improvements (ARIA labels, keyboard navigation)

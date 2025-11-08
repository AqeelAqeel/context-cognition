// State entering OA each turn
export interface MachineState {
  route: string;                    // e.g., "/slack/rollout" | "/pitch" | "/medicare"
  ui: { panel: string; selection?: string };
  featureFlags: Record<string, boolean>;
  local: Record<string, string>;    // whitelisted snapshot
  session: Record<string, string>;  // whitelisted snapshot
  timeISO: string;
}

export interface PersistentState {
  userId: string;
  profile: { role: "pm"|"engineer"|"founder"|"senior_user"; tonePref?: string };
  longGoals: string[];              // high-level stable goals
  shortGoals: string[];             // decays daily/weekly
  venue: { source: "web"|"slack"|"docs"; tenant?: string };
  budgets: { tokensLeft: number; toolLimits: Record<string, number> };
  memory: Array<{ t: string; kind: "fact"|"preference"|"commit"; v: string }>;
}

// OA output
export interface DerivedVars {
  taskHypothesis: string;
  affordances: string[];
  riskFlags: string[];
  suggestedTools: Array<{ name: string; args?: Record<string, unknown>; reason: string }>;
  recap: string;
  queryPlan?: string[];
}

// CO → CE
export interface ContextPack {
  policy: string;
  persona: string;
  objectives: string[];
  venueNote: string;
  derived: DerivedVars;
  facts: string[];                  // distilled from memory to current task
  constraints: string[];            // budgets, privacy, tool gates
}

// Tool catalog (mocked)
export type Tool =
  | { name: "list_state_keys"; args: { scope: "local"|"session"|"machine" } }
  | { name: "validate_bindings"; args: { template: string } }
  | { name: "generate_outline"; args: { topic: string; audience: string } }
  | { name: "create_checklist"; args: { context: string; items: string[] } }
  | { name: "prefill_form"; args: { formId: string; fields: Record<string,string> } };

// Event bus types
export interface BusEvent {
  id: string;
  timestamp: string;
  type: "state_changed" | "message_submitted" | "tool_result" | "tick";
  payload: Record<string, unknown>;
}

export interface MessageEvent {
  text: string;
  sender: "user" | "assistant";
}

export interface ToolEvent {
  tool: string;
  args?: Record<string, unknown>;
  result: Record<string, unknown>;
  duration?: number;
}

export interface StateChangeEvent {
  key: string;
  oldValue: unknown;
  newValue: unknown;
}
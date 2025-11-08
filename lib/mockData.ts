import { MachineState, PersistentState } from './contracts';

export const seededPersistent: PersistentState = {
  userId: "aqeel",
  profile: { role: "founder", tonePref: "direct" },
  longGoals: ["Ship MVP", "Close $250k pre-seed"],
  shortGoals: ["Draft rollout checklist", "Refine pitch story"],
  venue: { source: "web", tenant: "demo" },
  budgets: { tokensLeft: 12000, toolLimits: { generate_outline: 3, create_checklist: 5 } },
  memory: [
    { t: new Date().toISOString(), kind: "preference", v: "Prefers concrete actions" },
    { t: new Date().toISOString(), kind: "fact", v: "Target audience includes angels" }
  ]
};

const staticTime = "2025-11-07T22:42:24.000Z";

export const seededMachineSlack: MachineState = {
  route: "/slack/rollout",
  ui: { panel: "editor" },
  featureFlags: { evalMode: true },
  local: { lastPanel: "editor" },
  session: { tab: "slack" },
  timeISO: staticTime
};

export const seededMachinePitch: MachineState = {
  route: "/pitch",
  ui: { panel: "editor" },
  featureFlags: { evalMode: true },
  local: { lastPanel: "editor" },
  session: { tab: "pitch" },
  timeISO: staticTime
};

export const seededMachineMedicare: MachineState = {
  route: "/medicare",
  ui: { panel: "editor" },
  featureFlags: { evalMode: true },
  local: { lastPanel: "editor" },
  session: { tab: "medicare" },
  timeISO: staticTime
};
import { PersistentState, ContextPack, DerivedVars, MachineState } from './contracts';

export const policy = `
- Respect privacy: only whitelist keys ["route","ui.panel","ui.selection","featureFlags.*"].
- Never expose secrets/tokens.
- Keep responses concise; propose 1–3 concrete actions.
`;

export const persona = `
Direct, practical, emotionally intelligent. Explain trade-offs; offer next step.
`;

export function selectObjectives(p: PersistentState, route: string): string[] {
  const base = ["Deliver one concrete user action"];
  if (route.startsWith("/slack")) return [...base, "Ship safe rollout"];
  if (route.startsWith("/pitch")) return [...base, "Sharpen fundraising narrative"];
  if (route.startsWith("/medicare")) return [...base, "Reduce cognitive load and errors"];
  return base;
}

export function buildContextPack(
  ms: MachineState,
  ps: PersistentState, 
  derived: DerivedVars
): ContextPack {
  const objectives = selectObjectives(ps, ms.route);
  
  // Extract relevant facts from memory
  const facts = ps.memory
    .filter(m => m.kind === "fact")
    .map(m => m.v)
    .slice(0, 5); // Limit to 5 most recent facts
    
  // Build constraints
  const constraints = [
    "Respect user privacy and data boundaries",
    `Token budget: ${ps.budgets.tokensLeft} remaining`
  ];
  
  if (ps.budgets.tokensLeft < 2000) {
    constraints.push("BUDGET LOW: Disable heavy operations");
  }
  
  // Add tool limits
  Object.entries(ps.budgets.toolLimits).forEach(([tool, limit]) => {
    if (limit <= 1) {
      constraints.push(`Tool ${tool} nearly exhausted (${limit} uses left)`);
    }
  });
  
  const venueNote = `Operating in ${ps.venue.source} context${ps.venue.tenant ? ` (${ps.venue.tenant})` : ''}`;
  
  return {
    policy,
    persona,
    objectives,
    venueNote,
    derived,
    facts,
    constraints
  };
}

export function compileSystemPrompt(ctx: ContextPack): string {
  return [
    `# Policy\n${ctx.policy}`.trim(),
    `# Persona\n${ctx.persona}`.trim(),
    `# Objectives\n- ${ctx.objectives.join("\n- ")}`.trim(),
    `# Venue\n${ctx.venueNote}`.trim(),
    `# Situation\n${ctx.derived.recap}`.trim(),
    ctx.derived.taskHypothesis ? `# Task Hypothesis\n${ctx.derived.taskHypothesis}` : "",
    ctx.facts.length ? `# Known Facts\n- ${ctx.facts.join("\n- ")}` : "",
    ctx.constraints.length ? `# Constraints\n- ${ctx.constraints.join("\n- ")}` : "",
    ctx.derived.affordances.length ? `# Affordances\n- ${ctx.derived.affordances.join("\n- ")}` : "",
    ctx.derived.suggestedTools.length
      ? `# Tool Hints\n${ctx.derived.suggestedTools.map(t=>`- ${t.name}: ${t.reason}`).join("\n")}`
      : "",
    `# Response Style\n- Think stepwise but answer crisply\n- End with a recommended action`
  ].filter(Boolean).join("\n\n");
}
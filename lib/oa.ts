import { MachineState, PersistentState, DerivedVars } from './contracts';

export function oaRun(ms: MachineState, ps: PersistentState): DerivedVars {
  const base: DerivedVars = {
    taskHypothesis: "User is conversing",
    affordances: [],
    riskFlags: [],
    suggestedTools: [],
    recap: `At ${ms.timeISO}, route ${ms.route}, panel ${ms.ui.panel}`
  };

  if (ms.route.startsWith("/slack/rollout")) {
    base.taskHypothesis = "Feature rollout planning in Slack context";
    base.affordances = ["create_checklist","validate_bindings","list_state_keys"];
    base.suggestedTools = [
      { name:"create_checklist", reason:"Ship safely with guardrails" },
      { name:"validate_bindings", reason:"Avoid broken templates" }
    ];
    
    // Add risk flags based on context
    if (ps.budgets.tokensLeft < 3000) {
      base.riskFlags.push("low_budget");
    }
  } else if (ms.route.startsWith("/pitch")) {
    base.taskHypothesis = "Fundraising narrative drafting";
    base.affordances = ["generate_outline","validate_bindings"];
    base.suggestedTools = [{ name:"generate_outline", reason:"Produce slide flow quickly" }];
    
    // Check if user has fundraising goals
    if (ps.longGoals.some(goal => goal.toLowerCase().includes("pre-seed"))) {
      base.recap += " | Active fundraising goal detected";
    }
  } else if (ms.route.startsWith("/medicare")) {
    base.taskHypothesis = "Form completion assistance (older user)";
    base.affordances = ["prefill_form","create_checklist"];
    base.riskFlags = ["cognitive_load"];
    base.suggestedTools = [{ name:"prefill_form", reason:"Reduce errors and confusion" }];
    
    // Always flag cognitive load for senior users
    if (ps.profile.role === "senior_user") {
      base.riskFlags.push("senior_user_complexity");
    }
  }

  // Global risk assessment
  if (ps.budgets.tokensLeft < 2000) {
    base.riskFlags.push("critical_budget");
  }
  
  if (ms.ui.panel && !ms.ui.selection) {
    base.riskFlags.push("ambiguous_context");
  }

  return base;
}
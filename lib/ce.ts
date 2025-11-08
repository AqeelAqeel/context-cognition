import { ContextPack, Tool } from './contracts';
import { bus } from './eventBus';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  toolCalls?: Array<{ tool: string; args?: Record<string, unknown>; result?: Record<string, unknown> }>;
}

export function mockToolCall(tool: Tool): Record<string, unknown> {
  
  switch (tool.name) {
    case "create_checklist":
      return {
        ok: true,
        checklist: [
          "Set canary rollout to 5%",
          "Monitor error rates and metrics",
          "Prepare rollback procedure",
          "Draft communication template",
          "Set success criteria"
        ]
      };
      
    case "generate_outline":
      return {
        ok: true,
        outline: [
          "Problem & Opportunity",
          "Solution Overview",
          "Market Size & Traction", 
          "Business Model",
          "Team & Execution",
          "Financials & Ask"
        ]
      };
      
    case "prefill_form":
      return {
        ok: true,
        fields_filled: Object.keys(tool.args?.fields || {}),
        form_url: `/forms/${tool.args?.formId}`
      };
      
    case "validate_bindings":
      return {
        ok: true,
        validation: "Template syntax valid",
        warnings: []
      };
      
    case "list_state_keys":
      return {
        ok: true,
        keys: ["route", "ui.panel", "ui.selection", "featureFlags.evalMode"]
      };
      
    default:
      return { ok: false, error: "Unknown tool" };
  }
}

export function ceTurn(userText: string, ctx: ContextPack): Message {
  const messageId = Math.random().toString(36).substr(2, 9);
  
  // Naive planner: map affordances to tools
  let response = "";
  const toolCalls: Array<{ tool: string; args?: Record<string, unknown>; result?: Record<string, unknown> }> = [];
  
  const hasChecklistIntent = /checklist|rollout|safety/i.test(userText);
  const hasOutlineIntent = /outline|pitch|slides/i.test(userText);
  const hasFormIntent = /form|medicare|prefill/i.test(userText);
  
  if (ctx.derived.affordances.includes("create_checklist") && hasChecklistIntent) {
    const tool: Tool = {
      name: "create_checklist",
      args: {
        context: ctx.derived.taskHypothesis,
        items: ["Canary 5%", "Rollback plan", "Comms template", "Metrics monitoring"]
      }
    };
    
    const result = mockToolCall(tool);
    toolCalls.push({ tool: tool.name, args: tool.args, result });
    
    bus.emit("tool_result", { tool: tool.name, args: tool.args, result, duration: 850 });
    
    response = `I've created a rollout checklist with key safety measures. The checklist includes canary deployment, monitoring, and rollback procedures. Would you like me to expand any specific section or add additional safety measures?`;
    
  } else if (ctx.derived.affordances.includes("generate_outline") && hasOutlineIntent) {
    const tool: Tool = {
      name: "generate_outline", 
      args: { topic: "Company Pitch", audience: "Angel investors" }
    };
    
    const result = mockToolCall(tool);
    toolCalls.push({ tool: tool.name, args: tool.args, result });
    
    bus.emit("tool_result", { tool: tool.name, args: tool.args, result, duration: 1200 });
    
    response = `I've generated a 6-slide pitch outline focused on angels. It covers problem, solution, traction, business model, team, and ask. Would you like me to elaborate on any specific slide or adjust the narrative flow?`;
    
  } else if (ctx.derived.affordances.includes("prefill_form") && hasFormIntent) {
    const tool: Tool = {
      name: "prefill_form",
      args: {
        formId: "medicare-B",
        fields: { name: "Sample User", dob: "1950-01-01", medicareNumber: "XXXX-XXXX-XXXX" }
      }
    };
    
    const result = mockToolCall(tool);
    toolCalls.push({ tool: tool.name, args: tool.args, result });
    
    bus.emit("tool_result", { tool: tool.name, args: tool.args, result, duration: 650 });
    
    response = `I've pre-filled the Medicare Part B form with your basic information. The form is ready for your review. Please verify all details before submitting. Would you like help with any specific sections?`;
    
  } else {
    // Default response based on context
    const nextAction = ctx.objectives[0] || "Continue the conversation";
    response = `Based on your current context (${ctx.derived.taskHypothesis}), here's what I recommend: ${nextAction}. I can help with any of these actions from the conversion strip below.`;
  }
  
  return {
    id: messageId,
    text: response,
    sender: 'assistant',
    timestamp: new Date().toISOString(),
    toolCalls: toolCalls.length > 0 ? toolCalls : undefined
  };
}
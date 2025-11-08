'use client';

interface ConversionAction {
  id: string;
  label: string;
  description: string;
  intent: string;
  primary?: boolean;
  disabled?: boolean;
}

interface ConversionStripProps {
  actions: ConversionAction[];
  onActionClick: (intent: string) => void;
}

export function ConversionStrip({ actions, onActionClick }: ConversionStripProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">✨</span>
        <h3 className="text-sm font-medium text-slate-900">Recommended Actions</h3>
      </div>
      
      <div className="flex gap-3">
        {actions.slice(0, 3).map((action) => ( // Max 3 actions
          <button
            key={action.id}
            onClick={() => onActionClick(action.intent)}
            disabled={action.disabled}
            className={`flex-1 text-left p-3 rounded-lg border transition-all duration-200 ${
              action.primary
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-sm'
            } ${
              action.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <div className={`font-medium text-sm ${action.primary ? 'text-white' : 'text-slate-900'}`}>
              {action.label}
            </div>
            <div className={`text-xs mt-1 ${
              action.primary ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {action.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper to generate conversion actions based on affordances and objectives
export function generateConversionActions(
  affordances: string[],
  objectives: string[],
  route: string,
  budgets: { tokensLeft: number; toolLimits: Record<string, number> }
): ConversionAction[] {
  const actions: ConversionAction[] = [];

  if (route.startsWith('/slack/rollout')) {
    if (affordances.includes('create_checklist')) {
      actions.push({
        id: 'create-checklist',
        label: 'Create Rollout Checklist',
        description: 'Generate safety checklist for feature deployment',
        intent: 'create_checklist',
        primary: true,
        disabled: (budgets.toolLimits.create_checklist || 0) <= 0
      });
    }
    
    if (affordances.includes('validate_bindings')) {
      actions.push({
        id: 'validate-templates',
        label: 'Validate Templates',
        description: 'Check Slack message templates for errors',
        intent: 'validate_bindings'
      });
    }
    
    actions.push({
      id: 'generate-comms',
      label: 'Draft Communications',
      description: 'Generate rollout announcement for team',
      intent: 'generate_outline'
    });
    
  } else if (route.startsWith('/pitch')) {
    if (affordances.includes('generate_outline')) {
      actions.push({
        id: 'pitch-outline',
        label: 'Draft 10-Slide Outline',
        description: 'Create investor pitch structure',
        intent: 'generate_outline',
        primary: true,
        disabled: (budgets.toolLimits.generate_outline || 0) <= 0
      });
    }
    
    actions.push({
      id: 'extract-proof-points',
      label: 'Extract Proof Points',
      description: 'Identify key traction metrics',
      intent: 'extract_proof_points'
    });
    
    actions.push({
      id: 'refine-narrative',
      label: 'Refine Story Arc',
      description: 'Strengthen fundraising narrative',
      intent: 'refine_narrative'
    });
    
  } else if (route.startsWith('/medicare')) {
    if (affordances.includes('prefill_form')) {
      actions.push({
        id: 'prefill-form',
        label: 'Pre-fill Part B Form',
        description: 'Auto-complete Medicare application',
        intent: 'prefill_form',
        primary: true
      });
    }
    
    if (affordances.includes('create_checklist')) {
      actions.push({
        id: 'create-steps',
        label: 'Create Step Guide',
        description: 'Simple checklist for form completion',
        intent: 'create_checklist'
      });
    }
    
    actions.push({
      id: 'call-script',
      label: 'Generate Call Script',
      description: 'What to say when calling support',
      intent: 'call_script'
    });
  }

  return actions;
}
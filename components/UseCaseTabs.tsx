'use client';

interface UseCase {
  id: string;
  route: string;
  title: string;
  description: string;
  icon: string;
}

interface UseCaseTabsProps {
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

export function UseCaseTabs({ activeRoute, onRouteChange }: UseCaseTabsProps) {
  const useCases: UseCase[] = [
    {
      id: 'slack',
      route: '/slack/rollout',
      title: 'Team Rollout in Slack',
      description: 'PM + Engineers',
      icon: '💬'
    },
    {
      id: 'pitch',
      route: '/pitch',
      title: 'Fundraising Pitch',
      description: 'Story + Strategy',
      icon: '💰'
    },
    {
      id: 'medicare',
      route: '/medicare',
      title: 'Medicare/Medicaid Task',
      description: 'Older, less tech-savvy user',
      icon: '📋'
    }
  ];

  return (
    <div className="border-b border-slate-200">
      <div className="flex">
        {useCases.map((useCase) => {
          const isActive = activeRoute.startsWith(useCase.route);
          
          return (
            <button
              key={useCase.id}
              onClick={() => onRouteChange(useCase.route)}
              className={`flex-1 px-4 py-3 text-left border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-transparent hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{useCase.icon}</span>
                <div>
                  <div className={`font-medium text-sm ${
                    isActive ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {useCase.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {useCase.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
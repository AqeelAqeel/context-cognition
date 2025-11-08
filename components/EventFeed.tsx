'use client';

import { useEffect, useState } from 'react';
import { BusEvent } from '@/lib/contracts';
import { bus } from '@/lib/eventBus';

export function EventFeed() {
  const [events, setEvents] = useState<BusEvent[]>(() => bus.getEvents());

  useEffect(() => {
    const unsubscribe = bus.subscribe('all', () => {
      setEvents(bus.getEvents());
    });
    
    return unsubscribe;
  }, []);

  const getEventIcon = (type: BusEvent['type']) => {
    switch (type) {
      case 'message_submitted': return '💬';
      case 'state_changed': return '⚙️';
      case 'tool_result': return '🔧';
      case 'tick': return '⏱️';
      default: return '📄';
    }
  };

  const getEventColor = (type: BusEvent['type']) => {
    switch (type) {
      case 'message_submitted': return 'text-slate-600';
      case 'state_changed': return 'text-amber-600';
      case 'tool_result': return 'text-blue-600';
      case 'tick': return 'text-green-600';
      default: return 'text-slate-500';
    }
  };

  const formatPayload = (event: BusEvent) => {
    switch (event.type) {
      case 'message_submitted':
        const msg = event.payload as { sender: string; text: string };
        const text = msg.text || '';
        return `${msg.sender}: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`;
      case 'state_changed':
        const state = event.payload as { key: string; oldValue: unknown; newValue: unknown };
        return `${state.key}: ${state.oldValue} → ${state.newValue}`;
      case 'tool_result':
        const tool = event.payload as { tool: string; duration?: number };
        return `${tool.tool} (${tool.duration || 0}ms)`;
      case 'tick':
        return 'System heartbeat';
      default:
        return JSON.stringify(event.payload).substring(0, 40);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
        <h3 className="text-sm font-medium text-slate-900">Event Feed</h3>
      </div>
      
      <div className="max-h-48 overflow-y-auto">
        {events.length === 0 ? (
          <div className="p-3 text-xs text-slate-500 text-center">
            No events yet
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {events.map((event) => (
              <div key={event.id} className="p-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-2">
                  <span className="text-sm">{getEventIcon(event.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getEventColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 truncate">
                      {formatPayload(event)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
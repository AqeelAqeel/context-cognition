import { BusEvent } from './contracts';

type EventCallback = (event: BusEvent) => void;

class EventBus {
  private listeners: Map<string, EventCallback[]> = new Map();
  private events: BusEvent[] = [];

  subscribe(eventType: string, callback: EventCallback): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  emit(type: BusEvent['type'], payload: Record<string, unknown>) {
    const event: BusEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      type,
      payload
    };
    
    this.events.unshift(event); // Latest first
    if (this.events.length > 100) {
      this.events = this.events.slice(0, 100); // Keep last 100 events
    }
    
    const callbacks = this.listeners.get(type);
    if (callbacks) {
      callbacks.forEach(callback => callback(event));
    }
    
    // Also emit to 'all' listeners
    const allCallbacks = this.listeners.get('all');
    if (allCallbacks) {
      allCallbacks.forEach(callback => callback(event));
    }
  }

  getEvents(): BusEvent[] {
    return [...this.events];
  }

  clear() {
    this.events = [];
  }
}

export const bus = new EventBus();
'use client';

import React, { useState } from 'react';

interface Modal {
  id: string;
  type: 'budget' | 'privacy' | 'risk' | 'tool_error';
  layer: 'ce' | 'oa' | 'co';
  title: string;
  message: string;
  timestamp: string;
}

interface ModalStackProps {
  modals: Modal[];
  onDismiss: (id: string) => void;
}

export function ModalStack({ modals, onDismiss }: ModalStackProps) {
  const getLayerColors = (layer: Modal['layer']) => {
    switch (layer) {
      case 'oa': return 'border-amber-200 bg-amber-50 text-amber-800';
      case 'co': return 'border-indigo-200 bg-indigo-50 text-indigo-800';
      case 'ce': return 'border-slate-200 bg-slate-50 text-slate-800';
      default: return 'border-slate-200 bg-slate-50 text-slate-800';
    }
  };

  const getLayerBadge = (layer: Modal['layer']) => {
    switch (layer) {
      case 'oa': return 'bg-amber-100 text-amber-700';
      case 'co': return 'bg-indigo-100 text-indigo-700';
      case 'ce': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: Modal['type']) => {
    switch (type) {
      case 'budget': return '💳';
      case 'privacy': return '🔒';
      case 'risk': return '⚠️';
      case 'tool_error': return '🔧';
      default: return '📄';
    }
  };

  if (modals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {modals.map((modal) => (
        <div
          key={modal.id}
          className={`border rounded-lg p-3 ${getLayerColors(modal.layer)}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{getTypeIcon(modal.type)}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLayerBadge(modal.layer)}`}>
                  Layer {modal.layer.toUpperCase()}
                </span>
              </div>
              
              <h4 className="text-sm font-medium mb-1">{modal.title}</h4>
              <p className="text-xs">{modal.message}</p>
              
              <div className="text-xs opacity-75 mt-1">
                {new Date(modal.timestamp).toLocaleTimeString()}
              </div>
            </div>
            
            <button
              onClick={() => onDismiss(modal.id)}
              className="text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook for managing modals
export function useModals() {
  const [modals, setModals] = useState<Modal[]>([]);
  const [shownModalTypes, setShownModalTypes] = useState<Set<string>>(new Set());

  const showModal = React.useCallback((modal: Omit<Modal, 'id' | 'timestamp'>) => {
    const modalKey = `${modal.type}-${modal.layer}`;
    
    // Prevent duplicate modals of the same type
    if (shownModalTypes.has(modalKey)) {
      return;
    }
    
    const newModal: Modal = {
      ...modal,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    setModals(prev => [newModal, ...prev].slice(0, 5)); // Keep max 5 modals
    setShownModalTypes(prev => new Set([...prev, modalKey]));
  }, [shownModalTypes]);

  const dismissModal = React.useCallback((id: string) => {
    setModals(prev => {
      const modalToRemove = prev.find(m => m.id === id);
      if (modalToRemove) {
        const modalKey = `${modalToRemove.type}-${modalToRemove.layer}`;
        setShownModalTypes(prevTypes => {
          const newTypes = new Set(prevTypes);
          newTypes.delete(modalKey);
          return newTypes;
        });
      }
      return prev.filter(m => m.id !== id);
    });
  }, []);

  return {
    modals,
    showModal,
    dismissModal,
  };
}
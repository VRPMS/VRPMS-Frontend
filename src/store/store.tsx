import { createContext, ReactNode, useContext, useState } from 'react';
import { defaultStoreState, SetState, TState } from "../data/types.tsx";

const StoreContext = createContext<[TState, SetState]|undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TState>(defaultStoreState);

  //TODO add all data to store

  return <StoreContext.Provider value={[state, setState]}>
    {children}
  </StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}
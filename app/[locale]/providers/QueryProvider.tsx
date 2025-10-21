'use client';

import { cacheOptions, queryClient } from '@/lib/cache';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { AutoUpdateStores } from './AutoUpdateStores';
import React from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={cacheOptions}
    >
      {/* <AutoUpdateStores /> */}
      {children}
    </PersistQueryClientProvider>
  );
}

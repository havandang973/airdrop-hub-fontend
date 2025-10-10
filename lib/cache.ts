import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  throttleTime: 1000,
});

const ttl = 1000 * 60 * 60 * 24; // 24 hours

const cacheOptions = {
  persister,
  maxAge: ttl,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ttl,
    },
  },
});

export { queryClient, cacheOptions };

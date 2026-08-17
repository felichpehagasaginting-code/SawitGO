'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth/auth-context';

import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 30_000,
            refetchInterval: 30_000,
            refetchOnWindowFocus: false,
            placeholderData: keepPreviousData,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScrollProvider>
          <AuthProvider>{children}</AuthProvider>
        </SmoothScrollProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

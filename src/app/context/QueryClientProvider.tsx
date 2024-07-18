"use client";
import { ChildrenProps } from "@/types/global.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 *60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

//making new query client
const QueryClientContext = createContext<QueryClient | undefined>(undefined);


export const QueryClientProviderWrapper: React.FC<ChildrenProps> = ({ children }) => {
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};

// using queryclient whenever we want
export const useCustomQueryClient = () => {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error('useCustomQueryClient must be used within a QueryClientProviderWrapper');
  }
  return context;
};


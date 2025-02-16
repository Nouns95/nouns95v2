'use client'

import React, { type ReactNode } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { bitcoinAdapter, wagmiAdapter, solanaWeb3JsAdapter, projectId, networks } from '../config/appkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: '', // origin must match your domain & subdomain
  icons: []
}

// Create the modal
export const modal = createAppKit({
  adapters: [bitcoinAdapter, wagmiAdapter, solanaWeb3JsAdapter],
  projectId: projectId as string,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: false,
    email: false,
    socials: ['farcaster'],
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

function AppkitContext({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default AppkitContext

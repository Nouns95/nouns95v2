"use client";

import React, { useState } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useAppKitNetwork } from '@reown/appkit/react'
import { useAppKitState } from '@reown/appkit/react'
import { useDisconnect } from '@reown/appkit/react'
import ConnectWallet from './ConnectWallet'
import { AddressDisplay } from './AddressDisplay';
import { NetworkDisplay } from './NetworkDisplay';
import { useEnsResolution } from './useEnsResolution';
import './WalletApp.styles.css'

type TabType = 'Account' | 'Network' | 'Swap'

const getNetworkType = (networkId?: string): 'ethereum' | 'base' | 'solana' | 'bitcoin' => {
  if (!networkId) return 'ethereum';
  if (networkId.startsWith('eip155:1')) return 'ethereum';
  if (networkId.startsWith('eip155:8453')) return 'base';
  if (networkId.startsWith('solana:')) return 'solana';
  if (networkId.startsWith('bip122:')) return 'bitcoin';
  return 'ethereum'; // Default to ethereum
};

export default function WalletApp() {
  const { isConnected, address } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const { selectedNetworkId } = useAppKitState()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()
  const [activeTab, setActiveTab] = useState<TabType>('Account')
  const { ensName, ensAvatar } = useEnsResolution(address)

  if (!isConnected) {
    return <ConnectWallet />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <div className="tab-content wallet-tab-bg">
            <div className="wallet-profile">
              <AddressDisplay 
                address={address} 
                network={getNetworkType(selectedNetworkId)}
                ensName={ensName}
                ensAvatar={ensAvatar}
              />
            </div>
          </div>
        )
      case 'Network':
        return (
          <div className="tab-content wallet-tab-bg">
            <div className="wallet-profile">
              <NetworkDisplay 
                chainId={chainId} 
                networkId={selectedNetworkId}
              />
              <div className="wallet-actions no-border">
                <button onClick={() => open({ view: 'Networks' })} className="win95-btn">
                  Switch Network
                </button>
              </div>
            </div>
          </div>
        )
      case 'Swap':
        return (
          <div className="tab-content wallet-tab-bg">
            <div className="wallet-profile">
              <div className="wallet-actions no-border">
                <button onClick={() => open({ view: 'Swap' })} className="win95-btn swap-btn">
                  Swap Tokens
                </button>
                <button onClick={() => open({ view: 'OnRampProviders' })} className="win95-btn buy-btn">
                  Buy with Fiat
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="wallet-app">
      <div className="wallet-content">
        <div className="win95-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'Account' ? 'active' : ''}`}
              onClick={() => setActiveTab('Account')}
            >
              Account
            </button>
            <button 
              className={`tab-button ${activeTab === 'Network' ? 'active' : ''}`}
              onClick={() => setActiveTab('Network')}
            >
              Network
            </button>
            <button 
              className={`tab-button ${activeTab === 'Swap' ? 'active' : ''}`}
              onClick={() => setActiveTab('Swap')}
            >
              Swap
            </button>
          </div>
          <div className="tab-panel">
            {renderTabContent()}
          </div>
        </div>
      </div>
      <div className="wallet-actions">
        <button onClick={() => disconnect()} className="win95-btn">
          Disconnect
        </button>
      </div>
    </div>
  )
} 
// context/WalletContext.tsx

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

// declare let window: any
declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    ethereum: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

interface WalletContextType {
  provider?: ethers.BrowserProvider;
  signer?: ethers.Signer;
  account?: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(undefined);
          setSigner(undefined);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload(); // Reload the page to handle network changes
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      console.error('Provider is not available');
      return;
    }

    try {
      await provider.send('eth_requestAccounts', []);
      const newSigner = await provider.getSigner();
      const userAddress = await newSigner.getAddress();

      setSigner(newSigner);
      setAccount(userAddress);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setSigner(undefined);
    setAccount(undefined);
  };

  return (
    <WalletContext.Provider value={{ provider, signer, account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

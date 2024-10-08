// lib/ethers.ts
import { ethers } from 'ethers';

export const getProvider = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    // Create an ethers provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Request account access if needed
    await provider.send('eth_requestAccounts', []);
    return provider;
  } else {
    throw new Error('MetaMask is not installed');
  }
};


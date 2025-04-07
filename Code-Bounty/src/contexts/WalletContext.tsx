
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

type WalletContextType = {
  isConnected: boolean;
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if previously connected
    const savedAccount = localStorage.getItem('walletAccount');
    if (savedAccount) {
      setAccount(savedAccount);
      setIsConnected(true);
    }
  }, []);

  const connect = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        toast({
          title: "Connecting to MetaMask...",
          description: "Please approve the connection request.",
        });
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const connectedAccount = accounts[0];
        
        setAccount(connectedAccount);
        setIsConnected(true);
        localStorage.setItem('walletAccount', connectedAccount);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "MetaMask not found",
          description: "Please install MetaMask extension to connect your wallet."
        });
      }
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again."
      });
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
    localStorage.removeItem('walletAccount');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected."
    });
  };

  return (
    <WalletContext.Provider value={{ isConnected, account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Add a window.ethereum type definition
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

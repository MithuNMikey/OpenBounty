
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Menu, X, Github, Code2 } from 'lucide-react';

const Navbar = () => {
  const { isConnected, account, connect, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-accent-purple" />
            <span className="text-xl font-bold">
              Open<span className="text-accent-purple">Bounty</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/bounties" 
              className={({ isActive }) => 
                isActive ? "text-accent-purple font-medium" : "text-foreground hover:text-accent-purple transition-colors"
              }
            >
              Browse Bounties
            </NavLink>
            <NavLink 
              to="/bounties/create" 
              className={({ isActive }) => 
                isActive ? "text-accent-purple font-medium" : "text-foreground hover:text-accent-purple transition-colors"
              }
            >
              Create Bounty
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "text-accent-purple font-medium" : "text-foreground hover:text-accent-purple transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </div>

          {/* Wallet Connection Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-muted rounded-full text-sm">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
                <Button variant="outline" onClick={disconnect}>Disconnect</Button>
              </div>
            ) : (
              <Button onClick={connect} className="bg-gradient-to-r from-eth-blue to-accent-purple hover:opacity-90 transition-opacity">
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <NavLink 
              to="/bounties" 
              className={({ isActive }) => 
                isActive ? "block py-2 px-4 bg-muted rounded text-accent-purple" : "block py-2 px-4 hover:bg-muted rounded"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Bounties
            </NavLink>
            <NavLink 
              to="/bounties/create" 
              className={({ isActive }) => 
                isActive ? "block py-2 px-4 bg-muted rounded text-accent-purple" : "block py-2 px-4 hover:bg-muted rounded"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Create Bounty
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "block py-2 px-4 bg-muted rounded text-accent-purple" : "block py-2 px-4 hover:bg-muted rounded"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            
            <div className="py-2 px-4">
              {isConnected ? (
                <div className="space-y-2">
                  <div className="text-sm bg-muted inline-block px-3 py-1 rounded-full">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </div>
                  <Button variant="outline" onClick={disconnect} className="w-full">
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connect} className="w-full bg-gradient-to-r from-eth-blue to-accent-purple">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

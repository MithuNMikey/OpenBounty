
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Code, CodeSquare, Coins, Zap, CheckCircle } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const Index = () => {
  const { connect, isConnected } = useWallet();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Rewarding Open Source Contributors with <span className="gradient-text">Crypto</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
                OpenBounty automatically rewards GitHub contributors when their pull requests are merged. Create bounties, solve issues, get paid.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-eth-blue to-accent-purple hover:opacity-90 transition-opacity"
                >
                  <Link to="/bounties">Browse Bounties</Link>
                </Button>
                {!isConnected ? (
                  <Button 
                    onClick={connect}
                    variant="outline" 
                    size="lg"
                  >
                    Connect Wallet
                  </Button>
                ) : (
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg"
                  >
                    <Link to="/bounties/create">Create Bounty</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-code-gray rounded-xl p-6 shadow-lg">
                <pre className="text-sm md:text-base text-white overflow-x-auto">
                  <code>{`// OpenBounty Smart Contract
contract Bounty {
  address creator;
  uint256 amount;
  string repository;
  uint issueId;
  
  event BountyCompleted(
    address contributor,
    uint256 amount
  );

  function completeBounty(
    address contributor
  ) public onlyOwner {
    // Transfer funds to contributor
    payable(contributor).transfer(amount);
    
    emit BountyCompleted(contributor, amount);
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy/50 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <div className="bg-eth-blue/20 p-4 rounded-full mb-4">
                <CodeSquare size={32} className="text-eth-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Create a Bounty</h3>
              <p className="text-gray-300">
                Link a GitHub issue to a crypto bounty. Specify requirements and set the reward amount.
              </p>
            </div>
            
            <div className="bg-navy/50 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <div className="bg-accent-purple/20 p-4 rounded-full mb-4">
                <Code size={32} className="text-accent-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Submit a Solution</h3>
              <p className="text-gray-300">
                Developers submit pull requests with their solutions to the GitHub issue.
              </p>
            </div>
            
            <div className="bg-navy/50 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <div className="bg-success-green/20 p-4 rounded-full mb-4">
                <Coins size={32} className="text-success-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Rewarded</h3>
              <p className="text-gray-300">
                Once the pull request is merged, the contributor automatically receives the crypto reward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <Github className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">GitHub Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly connects with GitHub repositories to track issues and pull requests.
              </p>
            </div>
            
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <Zap className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">Automated Payouts</h3>
              <p className="text-muted-foreground">
                Smart contracts automatically handle payments when pull requests are merged.
              </p>
            </div>
            
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <Coins className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">Multi-Token Support</h3>
              <p className="text-muted-foreground">
                Create bounties using various crypto tokens based on your preference.
              </p>
            </div>
            
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <Code className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">Contributor Profiles</h3>
              <p className="text-muted-foreground">
                Build your developer reputation by completing bounties and earning rewards.
              </p>
            </div>
            
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <CheckCircle className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">Verification System</h3>
              <p className="text-muted-foreground">
                Ensures submitted solutions meet requirements before releasing funds.
              </p>
            </div>
            
            <div className="bg-background shadow-md rounded-lg p-6 border">
              <ArrowRight className="mb-4 text-accent-purple" size={32} />
              <h3 className="text-xl font-semibold mb-3">On-chain Reputation</h3>
              <p className="text-muted-foreground">
                All completed bounties are recorded on-chain, building your developer portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-navy to-accent-purple text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join OpenBounty today and start contributing to open source projects or fund your project's development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-accent-purple hover:bg-gray-100"
            >
              <Link to="/bounties">Browse Bounties</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/bounties/create">Create Bounty</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

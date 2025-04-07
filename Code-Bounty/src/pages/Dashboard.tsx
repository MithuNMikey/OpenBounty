
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Github, 
  Wallet, 
  Plus, 
  ExternalLink, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  GitPullRequest
} from 'lucide-react';
import { mockBounties } from '@/lib/mockData';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/components/ui/use-toast';
import { Bounty } from '@/lib/types';

const Dashboard = () => {
  const { isConnected, account, connect } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [myBounties, setMyBounties] = useState<Bounty[]>([]);
  const [assignedBounties, setAssignedBounties] = useState<Bounty[]>([]);
  const [completedBounties, setCompletedBounties] = useState<Bounty[]>([]);
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected) {
      // Simulate API call to get user's bounties
      setTimeout(() => {
        const created = mockBounties.filter(bounty => 
          bounty.createdBy.toLowerCase() === account?.toLowerCase()
        );
        
        const assigned = mockBounties.filter(bounty => 
          bounty.assignedTo?.toLowerCase() === account?.toLowerCase() && 
          bounty.status === 'active'
        );
        
        const completed = mockBounties.filter(bounty => 
          (bounty.assignedTo?.toLowerCase() === account?.toLowerCase() || 
          bounty.createdBy.toLowerCase() === account?.toLowerCase()) && 
          bounty.status === 'completed'
        );
        
        setMyBounties(created);
        setAssignedBounties(assigned);
        setCompletedBounties(completed);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [isConnected, account]);

  const handleConnectGithub = () => {
    setIsConnectingGithub(true);
    
    // Simulate GitHub OAuth flow
    setTimeout(() => {
      setIsGithubConnected(true);
      setIsConnectingGithub(false);
      toast({
        title: "GitHub Connected",
        description: "Your GitHub account has been successfully connected.",
      });
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto py-16 px-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to view your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-6">
              <Wallet size={64} className="text-muted-foreground" />
            </div>
            <p className="text-center text-muted-foreground mb-6">
              You need to connect your wallet to view your bounties, track your progress, and manage your rewards.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={connect} className="w-full bg-gradient-to-r from-eth-blue to-accent-purple">
              Connect Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage your bounties and track your progress</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Wallet className="h-10 w-10 p-2 bg-muted rounded-full mr-4" />
              <div>
                <p className="text-sm font-medium">
                  {account?.slice(0, 8)}...{account?.slice(-6)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Connected Wallet
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Github className="h-10 w-10 p-2 bg-muted rounded-full mr-4" />
              <div>
                {isGithubConnected ? (
                  <>
                    <p className="text-sm font-medium flex items-center">
                      dev-alice <CheckCircle size={16} className="ml-2 text-success-green" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      GitHub Connected
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium flex items-center">
                      Not Connected <AlertCircle size={16} className="ml-2 text-destructive" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      GitHub Account
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!isGithubConnected ? (
              <Button 
                onClick={handleConnectGithub}
                disabled={isConnectingGithub} 
                className="w-full"
              >
                {isConnectingGithub && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isConnectingGithub ? 'Connecting...' : 'Connect GitHub'}
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Manage Account
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Bounty Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-2xl font-bold">{myBounties.length}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{assignedBounties.length}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedBounties.length}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">0.8 ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link to="/bounties/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Bounty
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/bounties">
                Browse All Bounties
              </Link>
            </Button>
            <div className="relative">
              <Input placeholder="Search bounties..." />
              <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
                <span className="sr-only">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="my-bounties" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="my-bounties">My Bounties</TabsTrigger>
          <TabsTrigger value="working-on">Working On</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-bounties">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-5/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded-md w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : myBounties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Plus className="mx-auto mb-4 text-muted-foreground" size={40} />
                <h3 className="text-lg font-medium mb-2">No Bounties Created</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any bounties yet
                </p>
                <Button asChild>
                  <Link to="/bounties/create">Create Your First Bounty</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{bounty.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <GitPullRequest size={14} className="mr-1" />
                        {bounty.repository}
                        {bounty.issueNumber && <span> #{bounty.issueNumber}</span>}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge 
                        variant={
                          bounty.status === 'open' ? 'default' : 
                          bounty.status === 'active' ? 'secondary' : 
                          bounty.status === 'completed' ? 'outline' : 'destructive'
                        }
                        className={
                          bounty.status === 'open' ? 'bg-eth-blue text-white' : 
                          bounty.status === 'active' ? 'bg-accent-purple text-white' : 
                          bounty.status === 'completed' ? 'border-success-green text-success-green' : ''
                        }
                      >
                        {bounty.status.charAt(0).toUpperCase() + bounty.status.slice(1)}
                      </Badge>
                      <span className="text-accent-purple font-semibold">
                        {bounty.amount} {bounty.token}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {bounty.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/bounties/${bounty.id}`}>Manage Bounty</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="working-on">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(1)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-5/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded-md w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : assignedBounties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ExternalLink className="mx-auto mb-4 text-muted-foreground" size={40} />
                <h3 className="text-lg font-medium mb-2">Not Working on Any Bounties</h3>
                <p className="text-muted-foreground mb-6">
                  Browse available bounties to find work that interests you
                </p>
                <Button asChild>
                  <Link to="/bounties">Browse Bounties</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignedBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{bounty.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <GitPullRequest size={14} className="mr-1" />
                        {bounty.repository}
                        {bounty.issueNumber && <span> #{bounty.issueNumber}</span>}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className="bg-accent-purple">
                        In Progress
                      </Badge>
                      <span className="text-accent-purple font-semibold">
                        {bounty.amount} {bounty.token}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {bounty.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/bounties/${bounty.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(1)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-5/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-muted rounded-md w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : completedBounties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="mx-auto mb-4 text-muted-foreground" size={40} />
                <h3 className="text-lg font-medium mb-2">No Completed Bounties</h3>
                <p className="text-muted-foreground mb-6">
                  Complete bounties to see them listed here
                </p>
                <Button asChild>
                  <Link to="/bounties">Browse Bounties</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{bounty.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <GitPullRequest size={14} className="mr-1" />
                        {bounty.repository}
                        {bounty.issueNumber && <span> #{bounty.issueNumber}</span>}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="border-success-green text-success-green">
                        Completed
                      </Badge>
                      <span className="text-accent-purple font-semibold">
                        {bounty.amount} {bounty.token}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {bounty.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/bounties/${bounty.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

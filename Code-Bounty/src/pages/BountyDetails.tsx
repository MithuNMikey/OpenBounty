
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Calendar, 
  User, 
  AlertCircle,
  Github,
  GitPullRequest
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBountyById, getPullRequestsByBountyId } from '@/lib/mockData';
import { Bounty, PullRequest } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/contexts/WalletContext';

const BountyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isConnected, connect } = useWallet();

  useEffect(() => {
    // Simulate API call
    const fetchBountyDetails = () => {
      setTimeout(() => {
        if (id) {
          const foundBounty = getBountyById(id);
          if (foundBounty) {
            setBounty(foundBounty);
            setPullRequests(getPullRequestsByBountyId(id));
          }
        }
        setIsLoading(false);
      }, 1000);
    };

    fetchBountyDetails();
  }, [id]);

  const handleStartWork = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to take this bounty.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bounty Accepted",
      description: "You are now working on this bounty. Good luck!",
    });
  };

  const handleSubmitPR = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to submit work.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "PR Submission Ready",
      description: "Please submit your PR on GitHub and then link it here.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded-md w-1/4 mb-4"></div>
          <div className="h-6 bg-muted rounded-md w-1/2 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="h-7 bg-muted rounded-md w-3/4 mb-2"></div>
                  <div className="h-5 bg-muted rounded-md w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded-md w-full"></div>
                    <div className="h-4 bg-muted rounded-md w-full"></div>
                    <div className="h-4 bg-muted rounded-md w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="h-8 bg-muted rounded-md w-full"></div>
                    <div className="h-6 bg-muted rounded-md w-3/4"></div>
                    <div className="h-10 bg-muted rounded-md w-full"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="container mx-auto py-10 px-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2" />
              Bounty Not Found
            </CardTitle>
            <CardDescription>
              The bounty you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/bounties">Browse Bounties</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const formattedDate = new Date(bounty.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="mb-6">
        <Link to="/bounties" className="text-muted-foreground hover:text-accent-purple mb-2 inline-block">
          ← Back to Bounties
        </Link>
        <h1 className="text-3xl font-bold mb-2">{bounty.title}</h1>
        <div className="flex flex-wrap gap-3 items-center">
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
          
          <span className="text-muted-foreground flex items-center text-sm">
            <Calendar size={16} className="mr-1" />
            Posted on {formattedDate}
          </span>
          
          <a 
            href={`https://github.com/${bounty.repository}/issues/${bounty.issueNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-accent-purple transition-colors"
          >
            <Github size={16} className="mr-1" />
            View on GitHub
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="submissions">
                Submissions ({pullRequests.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Bounty Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{bounty.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Repository</h4>
                    <div className="flex items-center">
                      <Github size={16} className="mr-2" />
                      <a
                        href={`https://github.com/${bounty.repository}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-purple hover:underline flex items-center"
                      >
                        {bounty.repository}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                    
                    {bounty.issueNumber && (
                      <div className="mt-2">
                        <h4 className="font-medium mb-2">Issue</h4>
                        <a
                          href={`https://github.com/${bounty.repository}/issues/${bounty.issueNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-purple hover:underline flex items-center"
                        >
                          #{bounty.issueNumber}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {bounty.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <CardTitle>Pull Request Submissions</CardTitle>
                  <CardDescription>
                    All submissions for this bounty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pullRequests.length === 0 ? (
                    <div className="py-10 text-center">
                      <GitPullRequest className="mx-auto mb-4 text-muted-foreground" size={40} />
                      <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Be the first to submit a solution for this bounty
                      </p>
                      <Button onClick={handleSubmitPR}>Submit Pull Request</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pullRequests.map((pr) => (
                        <div key={pr.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{pr.title}</h4>
                              <p className="text-sm text-muted-foreground">{pr.description}</p>
                              <div className="mt-2 flex items-center text-sm">
                                <User size={14} className="mr-1" />
                                <span>
                                  Submitted by {pr.submittedBy.slice(0, 6)}...{pr.submittedBy.slice(-4)}
                                </span>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                pr.status === 'pending' ? 'secondary' : 
                                pr.status === 'approved' ? 'outline' : 'destructive'
                              }
                              className={
                                pr.status === 'pending' ? 'bg-muted text-muted-foreground' : 
                                pr.status === 'approved' ? 'border-success-green text-success-green' : ''
                              }
                            >
                              {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <a
                              href={pr.prUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-accent-purple hover:underline flex items-center"
                            >
                              <GitPullRequest size={14} className="mr-1" />
                              View Pull Request
                              <ExternalLink size={12} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">Bounty Reward</p>
                <div className="text-3xl font-bold text-accent-purple">
                  {bounty.amount} {bounty.token}
                </div>
              </div>
              
              <div className="space-y-4">
                {bounty.status === 'open' && (
                  <Button className="w-full" onClick={handleStartWork}>
                    Start Working on This
                  </Button>
                )}
                
                {bounty.status === 'active' && (
                  <Button className="w-full" onClick={handleSubmitPR}>
                    Submit Pull Request
                  </Button>
                )}
                
                {bounty.status === 'completed' && (
                  <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed">
                    Bounty Completed
                  </Button>
                )}
                
                <a
                  href={`https://github.com/${bounty.repository}/issues/${bounty.issueNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    View Issue on GitHub
                  </Button>
                </a>
                
                {!isConnected && (
                  <Button variant="outline" onClick={connect} className="w-full">
                    Connect Wallet to Start
                  </Button>
                )}
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3">About the Bounty Issuer</h4>
                <div className="flex items-center">
                  <User className="h-9 w-9 bg-muted p-2 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium">
                      {bounty.createdBy.slice(0, 6)}...{bounty.createdBy.slice(-4)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Bounty Creator
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;

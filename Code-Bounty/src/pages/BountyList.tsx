
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { mockBounties } from '@/lib/mockData';
import { Bounty, SortOption, FilterStatus } from '@/lib/types';

const BountyList = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBounties = () => {
      setTimeout(() => {
        setBounties(mockBounties);
        setIsLoading(false);
      }, 1000);
    };

    fetchBounties();
  }, []);

  const filterBounties = () => {
    let filteredBounties = [...bounties];
    
    // Apply search term filter
    if (searchTerm) {
      filteredBounties = filteredBounties.filter(bounty => 
        bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.repository.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredBounties = filteredBounties.filter(bounty => bounty.status === statusFilter);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        return filteredBounties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return filteredBounties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'highest':
        return filteredBounties.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
      case 'lowest':
        return filteredBounties.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
      default:
        return filteredBounties;
    }
  };

  const displayBounties = filterBounties();

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Bounties</h1>
          <p className="text-muted-foreground">Find open issues and earn crypto rewards</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-eth-blue to-accent-purple">
          <Link to="/bounties/create">Create Bounty</Link>
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            type="search" 
            placeholder="Search bounties by title, description, or tags" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as FilterStatus)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="active">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Reward</SelectItem>
              <SelectItem value="lowest">Lowest Reward</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-7 bg-muted rounded-md mb-4 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded-md w-full"></div>
                <div className="h-4 bg-muted rounded-md w-5/6"></div>
                <div className="h-4 bg-muted rounded-md w-4/6"></div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="h-6 bg-muted rounded-md w-1/4"></div>
                <div className="h-6 bg-muted rounded-md w-1/4"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 bg-muted rounded-full w-16"></div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : displayBounties.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No bounties match your search</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or create a new bounty</p>
          <Button asChild variant="outline">
            <Link to="/bounties/create">Create a Bounty</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBounties.map((bounty) => (
            <Link to={`/bounties/${bounty.id}`} key={bounty.id}>
              <Card className="p-6 hover:shadow-md transition-shadow border-2 hover:border-muted">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold line-clamp-2">{bounty.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {bounty.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm">
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
                  </div>
                  <div className="text-lg font-semibold text-accent-purple">
                    {bounty.amount} {bounty.token}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground flex items-center mb-4">
                  <ExternalLink size={14} className="mr-1" />
                  {bounty.repository}
                  {bounty.issueNumber && <span> #{bounty.issueNumber}</span>}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {bounty.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-muted/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BountyList;

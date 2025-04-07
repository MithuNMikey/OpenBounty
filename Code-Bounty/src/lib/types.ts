
export interface Bounty {
  id: string;
  title: string;
  description: string;
  amount: string;
  token: 'ETH' | 'USDC' | 'DAI';
  repository: string;
  issueNumber: number | null;
  status: 'open' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  createdBy: string;
  assignedTo: string | null;
  tags: string[];
}

export interface User {
  address: string;
  githubUsername: string | null;
  githubId: string | null;
  isGithubConnected: boolean;
  createdBounties: string[];
  assignedBounties: string[];
  completedBounties: string[];
}

export interface PullRequest {
  id: string;
  bountyId: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  prUrl: string;
}

export type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';
export type FilterStatus = 'all' | 'open' | 'active' | 'completed';

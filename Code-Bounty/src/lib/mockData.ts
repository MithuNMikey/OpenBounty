
import { Bounty, PullRequest, User } from './types';

export const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'Fix memory leak in React component',
    description: 'There is a memory leak in the DataTable component that needs to be fixed. The component is not properly cleaning up event listeners when unmounted.',
    amount: '0.5',
    token: 'ETH',
    repository: 'facebook/react',
    issueNumber: 1234,
    status: 'open',
    createdAt: '2023-04-01T12:00:00Z',
    createdBy: '0x1234567890123456789012345678901234567890',
    assignedTo: null,
    tags: ['bug', 'react', 'javascript'],
  },
  {
    id: '2',
    title: 'Add dark mode support to UI kit',
    description: 'We need to add full dark mode support to our UI component library. This includes updating all component styles and ensuring proper color contrast.',
    amount: '1.2',
    token: 'ETH',
    repository: 'openbounty/ui-kit',
    issueNumber: 42,
    status: 'active',
    createdAt: '2023-04-02T14:30:00Z',
    createdBy: '0x2345678901234567890123456789012345678901',
    assignedTo: '0x3456789012345678901234567890123456789012',
    tags: ['feature', 'ui', 'css', 'darkmode'],
  },
  {
    id: '3',
    title: 'Implement EIP-4844 support',
    description: 'Add support for EIP-4844 (Proto-Danksharding) in our Ethereum client implementation. This is critical for our L2 scaling solution.',
    amount: '5.0',
    token: 'ETH',
    repository: 'openbounty/eth-client',
    issueNumber: 87,
    status: 'open',
    createdAt: '2023-04-03T09:15:00Z',
    createdBy: '0x2345678901234567890123456789012345678901',
    assignedTo: null,
    tags: ['ethereum', 'eip-4844', 'scaling', 'blockchain'],
  },
  {
    id: '4',
    title: 'Optimize gas usage in NFT minting contract',
    description: 'Our NFT minting contract is using too much gas. We need to optimize it to reduce costs for users while maintaining functionality.',
    amount: '0.8',
    token: 'ETH',
    repository: 'openbounty/nft-contracts',
    issueNumber: 56,
    status: 'completed',
    createdAt: '2023-03-28T11:45:00Z',
    createdBy: '0x4567890123456789012345678901234567890123',
    assignedTo: '0x5678901234567890123456789012345678901234',
    tags: ['solidity', 'gas-optimization', 'nft', 'ethereum'],
  },
  {
    id: '5',
    title: 'Add comprehensive test coverage for API endpoints',
    description: 'Our backend API is missing proper test coverage. We need to add comprehensive tests for all endpoints to ensure reliability.',
    amount: '0.75',
    token: 'ETH',
    repository: 'openbounty/backend-api',
    issueNumber: 112,
    status: 'open',
    createdAt: '2023-04-05T16:20:00Z',
    createdBy: '0x6789012345678901234567890123456789012345',
    assignedTo: null,
    tags: ['testing', 'api', 'backend'],
  },
  {
    id: '6',
    title: 'Create developer documentation website',
    description: 'We need a comprehensive documentation website for our SDK. This includes API references, tutorials, and examples.',
    amount: '2.0',
    token: 'ETH',
    repository: 'openbounty/docs',
    issueNumber: 24,
    status: 'active',
    createdAt: '2023-04-04T10:30:00Z',
    createdBy: '0x7890123456789012345678901234567890123456',
    assignedTo: '0x8901234567890123456789012345678901234567',
    tags: ['documentation', 'website', 'markdown'],
  },
];

export const mockPullRequests: PullRequest[] = [
  {
    id: '1',
    bountyId: '2',
    title: 'Implemented dark mode for all components',
    description: 'This PR adds dark mode support to all components in the UI kit. I\'ve added a theme toggle and ensured all components respond correctly to theme changes.',
    status: 'pending',
    submittedBy: '0x3456789012345678901234567890123456789012',
    submittedAt: '2023-04-06T15:45:00Z',
    prUrl: 'https://github.com/openbounty/ui-kit/pull/65',
  },
  {
    id: '2',
    bountyId: '4',
    title: 'Optimized gas usage by 40%',
    description: 'I\'ve reduced gas usage in the NFT minting contract by 40% by optimizing storage, removing redundant checks, and improving the overall contract structure.',
    status: 'approved',
    submittedBy: '0x5678901234567890123456789012345678901234',
    submittedAt: '2023-04-01T13:20:00Z',
    prUrl: 'https://github.com/openbounty/nft-contracts/pull/28',
  },
];

export const mockUsers: User[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    githubUsername: 'dev-alice',
    githubId: '12345678',
    isGithubConnected: true,
    createdBounties: ['1'],
    assignedBounties: [],
    completedBounties: [],
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    githubUsername: 'dev-bob',
    githubId: '23456789',
    isGithubConnected: true,
    createdBounties: ['2', '3'],
    assignedBounties: [],
    completedBounties: [],
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    githubUsername: 'dev-charlie',
    githubId: '34567890',
    isGithubConnected: true,
    createdBounties: [],
    assignedBounties: ['2'],
    completedBounties: [],
  },
];

export const getBountyById = (id: string): Bounty | undefined => {
  return mockBounties.find(bounty => bounty.id === id);
};

export const getPullRequestsByBountyId = (bountyId: string): PullRequest[] => {
  return mockPullRequests.filter(pr => pr.bountyId === bountyId);
};

export const getUserByAddress = (address: string): User | undefined => {
  return mockUsers.find(user => user.address.toLowerCase() === address.toLowerCase());
};

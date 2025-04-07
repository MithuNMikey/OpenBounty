
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/contexts/WalletContext';

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }).max(100, {
    message: 'Title must not be longer than 100 characters.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  repository: z.string().min(3, {
    message: 'Repository name is required.'
  }).refine(value => value.includes('/'), {
    message: 'Repository must be in format "owner/repo"'
  }),
  issueNumber: z.string().refine(value => {
    if (value === '') return true;
    return !isNaN(parseInt(value));
  }, {
    message: 'Issue number must be a valid number.'
  }).transform(value => value === '' ? null : parseInt(value)),
  amount: z.string().refine(value => {
    const parsed = parseFloat(value);
    return !isNaN(parsed) && parsed > 0;
  }, {
    message: 'Amount must be a positive number.'
  }),
  token: z.enum(['ETH', 'USDC', 'DAI']),
  tags: z.string().refine(value => {
    if (value === '') return true;
    const tags = value.split(',').map(tag => tag.trim());
    return tags.every(tag => tag.length > 0);
  }, {
    message: 'Tags must be comma-separated.'
  }).transform(value => {
    if (value === '') return [];
    return value.split(',').map(tag => tag.trim());
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateBounty = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      repository: '',
      issueNumber: '', // This is a string in the form which gets transformed to null or number by the schema
      amount: '',
      token: 'ETH',
      tags: '', // This is a string in the form which gets transformed to string[] by the schema
    },
  });

  async function onSubmit(values: FormValues) {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to create a bounty",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form values:', values);
      
      toast({
        title: "Bounty Created!",
        description: "Your bounty has been published successfully.",
      });
      
      navigate('/bounties');
    } catch (error) {
      console.error('Error creating bounty:', error);
      toast({
        title: "Error",
        description: "Failed to create bounty. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create a Bounty</h1>
        <p className="text-muted-foreground mb-6">Offer rewards for contributions to your open source project</p>
        
        <Card>
          <CardHeader>
            <CardTitle>New Bounty Details</CardTitle>
            <CardDescription>
              Fill in the details about the issue you want to create a bounty for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Fix memory leak in DataTable component" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, concise title describing the bounty
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed description of the issue and what needs to be done..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description including requirements and acceptance criteria
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="repository"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Repository</FormLabel>
                        <FormControl>
                          <Input placeholder="owner/repository" {...field} />
                        </FormControl>
                        <FormDescription>
                          Format: username/repository
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="issueNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Number (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="42" 
                            type="number" 
                            {...field} 
                            value={field.value === null ? '' : field.value} 
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormDescription>
                          GitHub issue number if one exists
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="0.5" type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Amount to reward the contributor
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="DAI">DAI</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Cryptocurrency to use for the reward
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="bug,javascript,react" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tags
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <CardFooter className="px-0 pb-0 pt-6">
                  <Button type="submit" disabled={isSubmitting} className="mr-4 bg-gradient-to-r from-eth-blue to-accent-purple">
                    {isSubmitting ? 'Creating Bounty...' : 'Create Bounty'}
                  </Button>
                  
                  {!isConnected && (
                    <Button type="button" variant="outline" onClick={connect}>
                      Connect Wallet First
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBounty;

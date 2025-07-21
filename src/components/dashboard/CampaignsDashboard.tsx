import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Mail, 
  Plus, 
  Play, 
  Pause, 
  MoreVertical, 
  Eye, 
  Send, 
  Clock, 
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Calendar,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
  createdAt: string;
  scheduledAt?: string;
}

export const CampaignsDashboard: React.FC = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Product Launch Newsletter',
      subject: 'Introducing Our Amazing New Product!',
      status: 'completed',
      recipients: 2500,
      sent: 2485,
      opened: 1790,
      clicked: 520,
      bounced: 15,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Monthly Updates',
      subject: 'Your Monthly Digest is Here',
      status: 'active',
      recipients: 1800,
      sent: 1200,
      opened: 850,
      clicked: 280,
      bounced: 8,
      createdAt: '2024-01-20T09:00:00Z',
    },
    {
      id: '3',
      name: 'Special Offer Campaign',
      subject: '50% Off - Limited Time Only!',
      status: 'scheduled',
      recipients: 3200,
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      createdAt: '2024-01-22T14:00:00Z',
      scheduledAt: '2024-01-25T10:00:00Z',
    },
    {
      id: '4',
      name: 'Welcome Series Email 1',
      subject: 'Welcome to Our Community!',
      status: 'draft',
      recipients: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      createdAt: '2024-01-23T16:00:00Z',
    }
  ]);

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    recipients: ''
  });

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'completed': return 'default';
      case 'active': return 'secondary';
      case 'scheduled': return 'outline';
      case 'paused': return 'destructive';
      case 'draft': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return Play;
      case 'scheduled': return Clock;
      case 'paused': return Pause;
      case 'draft': return Edit;
      default: return Mail;
    }
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject) {
      toast({
        title: "Error",
        description: "Please fill in campaign name and subject.",
        variant: "destructive",
      });
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      status: 'draft',
      recipients: parseInt(newCampaign.recipients) || 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      createdAt: new Date().toISOString(),
    };

    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({ name: '', subject: '', content: '', recipients: '' });
    setShowCreateCampaign(false);

    toast({
      title: "Campaign created",
      description: "Your new campaign has been saved as draft.",
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({
      title: "Campaign deleted",
      description: "Campaign has been successfully removed.",
    });
  };

  const handleStatusChange = (id: string, newStatus: Campaign['status']) => {
    setCampaigns(campaigns.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    toast({
      title: "Status updated",
      description: `Campaign status changed to ${newStatus}.`,
    });
  };

  const calculateProgress = (campaign: Campaign) => {
    if (campaign.recipients === 0) return 0;
    return (campaign.sent / campaign.recipients) * 100;
  };

  const calculateOpenRate = (campaign: Campaign) => {
    if (campaign.sent === 0) return 0;
    return (campaign.opened / campaign.sent) * 100;
  };

  const calculateClickRate = (campaign: Campaign) => {
    if (campaign.sent === 0) return 0;
    return (campaign.clicked / campaign.sent) * 100;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="h-8 w-8 text-primary" />
            Email Campaigns
          </h1>
          <p className="text-muted-foreground">
            Create, manage, and track your email marketing campaigns.
          </p>
        </div>
        <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new email campaign with custom content and targeting.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Input
                    id="recipients"
                    type="number"
                    value={newCampaign.recipients}
                    onChange={(e) => setNewCampaign({ ...newCampaign, recipients: e.target.value })}
                    placeholder="Number of recipients"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="Enter email subject line"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Write your email content here..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">All time campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            Manage and monitor all your email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const StatusIcon = getStatusIcon(campaign.status);
              const progress = calculateProgress(campaign);
              const openRate = calculateOpenRate(campaign);
              const clickRate = calculateClickRate(campaign);

              return (
                <div key={campaign.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <StatusIcon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          {campaign.status === 'draft' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, 'scheduled')}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </DropdownMenuItem>
                          )}
                          {campaign.status === 'scheduled' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, 'active')}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Now
                            </DropdownMenuItem>
                          )}
                          {campaign.status === 'active' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, 'paused')}>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status === 'active' && progress < 100 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Sending Progress</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Campaign Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{campaign.recipients.toLocaleString()}</p>
                      <p className="text-muted-foreground">Recipients</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      <p className="text-muted-foreground">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{openRate.toFixed(1)}%</p>
                      <p className="text-muted-foreground">Open Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{clickRate.toFixed(1)}%</p>
                      <p className="text-muted-foreground">Click Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{campaign.bounced}</p>
                      <p className="text-muted-foreground">Bounced</p>
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="mt-3 text-xs text-muted-foreground">
                    Created: {new Date(campaign.createdAt).toLocaleDateString()}
                    {campaign.scheduledAt && (
                      <span className="ml-4">
                        Scheduled: {new Date(campaign.scheduledAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
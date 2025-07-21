import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const campaignData = [
  { name: 'Jan', sent: 1200, opened: 750, clicked: 320 },
  { name: 'Feb', sent: 1800, opened: 1100, clicked: 480 },
  { name: 'Mar', sent: 2200, opened: 1350, clicked: 590 },
  { name: 'Apr', sent: 1900, opened: 1180, clicked: 520 },
  { name: 'May', sent: 2400, opened: 1500, clicked: 680 },
  { name: 'Jun', sent: 2800, opened: 1750, clicked: 790 }
];

const statusData = [
  { name: 'Delivered', value: 85, color: 'hsl(var(--success))' },
  { name: 'Opened', value: 62, color: 'hsl(var(--info))' },
  { name: 'Clicked', value: 28, color: 'hsl(var(--primary))' },
  { name: 'Bounced', value: 4, color: 'hsl(var(--destructive))' }
];

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Emails Sent",
      value: "12,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Send,
      color: "bg-gradient-primary"
    },
    {
      title: "Open Rate",
      value: "68.4%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Eye,
      color: "bg-gradient-info"
    },
    {
      title: "Click Rate",
      value: "24.7%",
      change: "-0.5%",
      changeType: "negative" as const,
      icon: TrendingUp,
      color: "bg-gradient-warning"
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+3",
      changeType: "positive" as const,
      icon: Mail,
      color: "bg-gradient-success"
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: "Product Launch Newsletter",
      status: "completed",
      sent: 2847,
      openRate: 72.4,
      clickRate: 28.9,
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Monthly Updates",
      status: "active",
      sent: 1923,
      openRate: 68.1,
      clickRate: 22.3,
      date: "2024-01-20"
    },
    {
      id: 3,
      name: "Special Offer",
      status: "scheduled",
      sent: 0,
      openRate: 0,
      clickRate: 0,
      date: "2024-01-25"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your email campaigns today.
          </p>
        </div>
        <Badge variant="secondary" className="self-start md:self-center">
          User Dashboard
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs flex items-center gap-1 ${
                  stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Email Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Email Performance</CardTitle>
            <CardDescription>
              Monthly email statistics for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="hsl(var(--primary))" name="Sent" />
                <Bar dataKey="opened" fill="hsl(var(--info))" name="Opened" />
                <Bar dataKey="clicked" fill="hsl(var(--success))" name="Clicked" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
            <CardDescription>
              Current campaign performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>
            Your latest email campaigns and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {campaign.status === 'completed' && <CheckCircle className="h-4 w-4 text-success" />}
                    {campaign.status === 'active' && <Clock className="h-4 w-4 text-warning" />}
                    {campaign.status === 'scheduled' && <Mail className="h-4 w-4 text-info" />}
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(campaign.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                    <p className="text-muted-foreground">Sent</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{campaign.openRate}%</p>
                    <p className="text-muted-foreground">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{campaign.clickRate}%</p>
                    <p className="text-muted-foreground">Click Rate</p>
                  </div>
                  <Badge 
                    variant={
                      campaign.status === 'completed' ? 'default' :
                      campaign.status === 'active' ? 'secondary' : 'outline'
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
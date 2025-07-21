import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Cell,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  Mail, 
  Eye, 
  MousePointer, 
  XCircle, 
  Calendar, 
  Download,
  Filter,
  BarChart3
} from 'lucide-react';

const weeklyData = [
  { name: 'Mon', sent: 1200, opened: 850, clicked: 320, bounced: 45 },
  { name: 'Tue', sent: 1800, opened: 1250, clicked: 480, bounced: 52 },
  { name: 'Wed', sent: 2200, opened: 1540, clicked: 620, bounced: 38 },
  { name: 'Thu', sent: 1900, opened: 1330, clicked: 520, bounced: 41 },
  { name: 'Fri', sent: 2400, opened: 1680, clicked: 680, bounced: 55 },
  { name: 'Sat', sent: 1600, opened: 1120, clicked: 380, bounced: 32 },
  { name: 'Sun', sent: 1000, opened: 700, clicked: 240, bounced: 28 }
];

const monthlyData = [
  { month: 'Jan', sent: 15420, opened: 10794, clicked: 4632, bounced: 462, revenue: 12500 },
  { month: 'Feb', sent: 18350, opened: 12845, clicked: 5505, bounced: 550, revenue: 15200 },
  { month: 'Mar', sent: 22100, opened: 15470, clicked: 6630, bounced: 663, revenue: 18900 },
  { month: 'Apr', sent: 19800, opened: 13860, clicked: 5940, bounced: 594, revenue: 16800 },
  { month: 'May', sent: 25600, opened: 17920, clicked: 7680, bounced: 768, revenue: 21400 },
  { month: 'Jun', sent: 28900, opened: 20230, clicked: 8670, bounced: 867, revenue: 24600 }
];

const deviceData = [
  { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 38, color: 'hsl(var(--success))' },
  { name: 'Tablet', value: 17, color: 'hsl(var(--info))' }
];

const timeData = [
  { hour: '00:00', opens: 120 },
  { hour: '03:00', opens: 80 },
  { hour: '06:00', opens: 200 },
  { hour: '09:00', opens: 450 },
  { hour: '12:00', opens: 380 },
  { hour: '15:00', opens: 520 },
  { hour: '18:00', opens: 680 },
  { hour: '21:00', opens: 340 }
];

const engagementData = [
  { name: 'Week 1', openRate: 68.5, clickRate: 24.2, unsubscribeRate: 1.2 },
  { name: 'Week 2', openRate: 71.2, clickRate: 26.8, unsubscribeRate: 0.9 },
  { name: 'Week 3', openRate: 69.8, clickRate: 25.4, unsubscribeRate: 1.1 },
  { name: 'Week 4', openRate: 73.1, clickRate: 28.7, unsubscribeRate: 0.8 }
];

export const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const currentData = selectedPeriod === 'week' ? weeklyData : monthlyData;

  const totalSent = currentData.reduce((sum, item) => sum + item.sent, 0);
  const totalOpened = currentData.reduce((sum, item) => sum + item.opened, 0);
  const totalClicked = currentData.reduce((sum, item) => sum + item.clicked, 0);
  const totalBounced = currentData.reduce((sum, item) => sum + item.bounced, 0);

  const openRate = ((totalOpened / totalSent) * 100).toFixed(1);
  const clickRate = ((totalClicked / totalSent) * 100).toFixed(1);
  const bounceRate = ((totalBounced / totalSent) * 100).toFixed(1);

  const stats = [
    {
      title: "Total Emails Sent",
      value: totalSent.toLocaleString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Mail,
      color: "bg-gradient-primary"
    },
    {
      title: "Average Open Rate",
      value: `${openRate}%`,
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Eye,
      color: "bg-gradient-info"
    },
    {
      title: "Average Click Rate",
      value: `${clickRate}%`,
      change: "+1.8%",
      changeType: "positive" as const,
      icon: MousePointer,
      color: "bg-gradient-success"
    },
    {
      title: "Bounce Rate",
      value: `${bounceRate}%`,
      change: "-0.3%",
      changeType: "positive" as const,
      icon: XCircle,
      color: "bg-gradient-warning"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground">
            Deep insights into your email campaign performance and engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center gap-2">
        <Button
          variant={selectedPeriod === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('week')}
        >
          This Week
        </Button>
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('month')}
        >
          Last 6 Months
        </Button>
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
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Email Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Email Performance Trends</CardTitle>
              <CardDescription>
                Track email sends, opens, and clicks over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedPeriod === 'week' ? 'name' : 'month'} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sent" fill="hsl(var(--muted))" name="Sent" />
                  <Line type="monotone" dataKey="opened" stroke="hsl(var(--primary))" strokeWidth={3} name="Opened" />
                  <Line type="monotone" dataKey="clicked" stroke="hsl(var(--success))" strokeWidth={3} name="Clicked" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart (for monthly view) */}
          {selectedPeriod === 'month' && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue Attribution</CardTitle>
                <CardDescription>
                  Revenue generated from email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Rates</CardTitle>
              <CardDescription>
                Weekly engagement metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Line type="monotone" dataKey="openRate" stroke="hsl(var(--primary))" strokeWidth={3} name="Open Rate" />
                  <Line type="monotone" dataKey="clickRate" stroke="hsl(var(--success))" strokeWidth={3} name="Click Rate" />
                  <Line type="monotone" dataKey="unsubscribeRate" stroke="hsl(var(--destructive))" strokeWidth={2} name="Unsubscribe Rate" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Best Time to Send */}
          <Card>
            <CardHeader>
              <CardTitle>Optimal Send Times</CardTitle>
              <CardDescription>
                When your audience is most likely to open emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="opens" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          {/* Device Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>
                  How your audience reads emails by device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Audience Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>
                  Key metrics about your subscriber base
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Total Subscribers</span>
                  <Badge variant="secondary">12,847</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Active Subscribers</span>
                  <Badge variant="default">11,923</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Growth Rate</span>
                  <Badge variant="secondary" className="text-success">+12.5%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Unsubscribe Rate</span>
                  <Badge variant="outline">0.8%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Top Performing Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>
                Your best campaigns by engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Product Launch Newsletter', openRate: 78.5, clickRate: 32.1, revenue: '$8,450' },
                  { name: 'Weekly Digest #47', openRate: 72.3, clickRate: 28.7, revenue: '$6,230' },
                  { name: 'Holiday Special Offer', openRate: 69.8, clickRate: 26.4, revenue: '$9,120' },
                  { name: 'Customer Success Stories', openRate: 67.2, clickRate: 24.9, revenue: '$4,580' },
                ].map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">Campaign Performance</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{campaign.openRate}%</p>
                        <p className="text-muted-foreground">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{campaign.clickRate}%</p>
                        <p className="text-muted-foreground">Click Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-success">{campaign.revenue}</p>
                        <p className="text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
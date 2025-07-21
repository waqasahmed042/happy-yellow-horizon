import React, { useState, useEffect } from 'react';
import { useAuth, User } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Shield, 
  Plus, 
  MoreVertical, 
  Crown, 
  User as UserIcon,
  Edit,
  Trash2,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const systemData = [
  { name: 'Jan', users: 12, emails: 15420, campaigns: 45 },
  { name: 'Feb', users: 18, emails: 23180, campaigns: 67 },
  { name: 'Mar', users: 25, emails: 31250, campaigns: 89 },
  { name: 'Apr', users: 32, emails: 28900, campaigns: 78 },
  { name: 'May', users: 41, emails: 38750, campaigns: 102 },
  { name: 'Jun', users: 48, emails: 45200, campaigns: 125 }
];

const activityData = [
  { time: '00:00', activity: 23 },
  { time: '04:00', activity: 12 },
  { time: '08:00', activity: 67 },
  { time: '12:00', activity: 89 },
  { time: '16:00', activity: 156 },
  { time: '20:00', activity: 78 }
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('gmass_users') || '[]');
    const usersWithoutPasswords = storedUsers.map((u: any) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
    setUsers(usersWithoutPasswords);
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if email already exists
    const storedUsers = JSON.parse(localStorage.getItem('gmass_users') || '[]');
    if (storedUsers.find((u: any) => u.email === newUser.email)) {
      toast({
        title: "Error",
        description: "Email already exists.",
        variant: "destructive",
      });
      return;
    }

    // Create new user
    const userToAdd = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString(),
      emailsSent: 0,
      campaigns: 0
    };

    // Save to localStorage
    const updatedUsers = [...storedUsers, userToAdd];
    localStorage.setItem('gmass_users', JSON.stringify(updatedUsers));

    // Update local state
    const { password, ...userWithoutPassword } = userToAdd;
    setUsers([...users, userWithoutPassword]);

    // Reset form
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    setShowAddUser(false);

    toast({
      title: "User added",
      description: "New user has been successfully created.",
    });
  };

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting current admin
    if (userId === user?.id) {
      toast({
        title: "Error",
        description: "You cannot delete your own account.",
        variant: "destructive",
      });
      return;
    }

    // Remove from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('gmass_users') || '[]');
    const updatedUsers = storedUsers.filter((u: any) => u.id !== userId);
    localStorage.setItem('gmass_users', JSON.stringify(updatedUsers));

    // Update local state
    setUsers(users.filter(u => u.id !== userId));

    toast({
      title: "User deleted",
      description: "User has been successfully removed.",
    });
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-gradient-primary"
    },
    {
      title: "Total Emails Sent",
      value: "187,432",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Mail,
      color: "bg-gradient-info"
    },
    {
      title: "Active Campaigns",
      value: "64",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "bg-gradient-success"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Optimal",
      changeType: "positive" as const,
      icon: Shield,
      color: "bg-gradient-warning"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage users, monitor system performance, and oversee all operations.
          </p>
        </div>
        <Badge variant="secondary" className="self-start md:self-center gap-1">
          <Shield className="h-3 w-3" />
          Administrator
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
                <p className="text-xs text-success flex items-center gap-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Growth */}
        <Card>
          <CardHeader>
            <CardTitle>System Growth</CardTitle>
            <CardDescription>
              User growth and email volume over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="campaigns" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>
              System activity throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activity" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage all users in the system
            </CardDescription>
          </div>
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((userItem) => (
              <div key={userItem.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {userItem.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{userItem.name}</p>
                      {userItem.role === 'admin' && (
                        <Badge variant="secondary" className="gap-1">
                          <Crown className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{userItem.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="font-medium">{userItem.campaigns} campaigns</p>
                    <p className="text-muted-foreground">{userItem.emailsSent.toLocaleString()} emails sent</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteUser(userItem.id)}
                        disabled={userItem.id === user?.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
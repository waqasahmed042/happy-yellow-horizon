import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Key, 
  Download, 
  Upload,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailSettings, setEmailSettings] = useState({
    dailyDigest: true,
    campaignNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    emailFrequency: 'daily'
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: '••••••••••••••••••••••••••••••••',
    webhookUrl: '',
    rateLimitPerHour: '1000',
    enableWebhooks: false
  });

  const handleProfileUpdate = () => {
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    // Update user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('gmass_users') || '[]');
    const updatedUsers = storedUsers.map((u: any) => {
      if (u.id === user?.id) {
        return {
          ...u,
          name: profile.name,
          email: profile.email,
          ...(profile.newPassword && { password: profile.newPassword })
        };
      }
      return u;
    });
    
    localStorage.setItem('gmass_users', JSON.stringify(updatedUsers));
    
    // Update current user session
    const updatedUser = { ...user, name: profile.name, email: profile.email };
    localStorage.setItem('gmass_user', JSON.stringify(updatedUser));

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });

    // Clear password fields
    setProfile({
      ...profile,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleEmailSettingsUpdate = () => {
    localStorage.setItem('gmass_email_settings', JSON.stringify(emailSettings));
    toast({
      title: "Settings saved",
      description: "Email notification preferences updated.",
    });
  };

  const handleApiSettingsUpdate = () => {
    localStorage.setItem('gmass_api_settings', JSON.stringify(apiSettings));
    toast({
      title: "API settings saved",
      description: "API configuration has been updated.",
    });
  };

  const generateNewApiKey = () => {
    const newApiKey = 'gmass_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiSettings({ ...apiSettings, apiKey: newApiKey });
    toast({
      title: "New API key generated",
      description: "Your new API key has been created.",
    });
  };

  const exportData = () => {
    const data = {
      profile: user,
      emailSettings,
      apiSettings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gmassmailer-data.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your account data has been downloaded.",
    });
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Remove user from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('gmass_users') || '[]');
      const updatedUsers = storedUsers.filter((u: any) => u.id !== user?.id);
      localStorage.setItem('gmass_users', JSON.stringify(updatedUsers));
      
      // Logout user
      logout();
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences, security, and API settings.
          </p>
        </div>
        <Badge variant="secondary">
          {user?.role === 'admin' ? 'Administrator' : 'User'} Account
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg bg-gradient-primary text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Change */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        value={profile.currentPassword}
                        onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={profile.newPassword}
                      onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={profile.confirmPassword}
                      onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProfileUpdate} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure when and how you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Digest</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a summary of your campaigns every day
                    </p>
                  </div>
                  <Switch
                    checked={emailSettings.dailyDigest}
                    onCheckedChange={(checked) => 
                      setEmailSettings({ ...emailSettings, dailyDigest: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Campaign Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when campaigns start, finish, or have issues
                    </p>
                  </div>
                  <Switch
                    checked={emailSettings.campaignNotifications}
                    onCheckedChange={(checked) => 
                      setEmailSettings({ ...emailSettings, campaignNotifications: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">
                      Receive product updates and marketing communications
                    </p>
                  </div>
                  <Switch
                    checked={emailSettings.marketingEmails}
                    onCheckedChange={(checked) => 
                      setEmailSettings({ ...emailSettings, marketingEmails: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Important security notifications and account changes
                    </p>
                  </div>
                  <Switch
                    checked={emailSettings.securityAlerts}
                    onCheckedChange={(checked) => 
                      setEmailSettings({ ...emailSettings, securityAlerts: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Frequency</Label>
                <Select
                  value={emailSettings.emailFrequency}
                  onValueChange={(value) => 
                    setEmailSettings({ ...emailSettings, emailFrequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleEmailSettingsUpdate} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Manage your API keys and integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value={apiSettings.apiKey}
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline" onClick={generateNewApiKey}>
                      Generate New
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this key to authenticate API requests to your account
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                    placeholder="https://your-site.com/webhook"
                  />
                  <p className="text-sm text-muted-foreground">
                    Receive real-time notifications about campaign events
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (per hour)</Label>
                  <Input
                    id="rate-limit"
                    value={apiSettings.rateLimitPerHour}
                    onChange={(e) => setApiSettings({ ...apiSettings, rateLimitPerHour: e.target.value })}
                    placeholder="1000"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Webhooks</p>
                    <p className="text-sm text-muted-foreground">
                      Send HTTP callbacks for campaign events
                    </p>
                  </div>
                  <Switch
                    checked={apiSettings.enableWebhooks}
                    onCheckedChange={(checked) => 
                      setApiSettings({ ...apiSettings, enableWebhooks: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleApiSettingsUpdate} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security and data privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account created:</span>
                      <span>{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last login:</span>
                      <span>Today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account type:</span>
                      <Badge variant="secondary">{user?.role}</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">Data Management</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2" onClick={exportData}>
                      <Download className="h-4 w-4" />
                      Export Account Data
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Download all your account data in JSON format
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-destructive rounded-lg">
                  <h3 className="font-semibold mb-2 text-destructive">Danger Zone</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="destructive" 
                      className="w-full gap-2" 
                      onClick={deleteAccount}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
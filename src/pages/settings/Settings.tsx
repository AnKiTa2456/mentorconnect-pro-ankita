import { useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Trash2, LogOut } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    internshipOffers: true,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Delete account logic
      toast.success("Account deletion requested");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white page-transition">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="p-6 space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled className="mt-2" />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={user?.username || ""} disabled className="mt-2" />
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Course Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about course updates
                  </p>
                </div>
                <Switch
                  checked={notifications.courseUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, courseUpdates: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Internship Offers</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about internship offers
                  </p>
                </div>
                <Switch
                  checked={notifications.internshipOffers}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, internshipOffers: checked })
                  }
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to others
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your email
                  </p>
                </div>
                <Switch />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Payment Methods</h3>
              <p className="text-muted-foreground mb-4">No payment methods added yet</p>
              <Button variant="outline">Add Payment Method</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


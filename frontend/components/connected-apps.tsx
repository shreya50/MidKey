"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, ArrowLeft, Trash2, ExternalLink } from "lucide-react"

interface ConnectedAppsProps {
  user: string | null
  onLogout: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal") => void
}

const connectedApps = [
  {
    id: 1,
    name: "Shopify Store",
    logo: "🛍️",
    permissions: ["Your Identity", "Age (Over 18)", "Location (Country)"],
    connectedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Slack Workspace",
    logo: "💬",
    permissions: ["Your Identity", "Email Verification"],
    connectedDate: "1 week ago",
  },
  {
    id: 3,
    name: "Banking Portal",
    logo: "🏦",
    permissions: ["Your Identity", "Age (Over 21)", "Credit Score Range"],
    connectedDate: "2 weeks ago",
  },
]

export function ConnectedApps({ user, onLogout, onNavigate }: ConnectedAppsProps) {
  const handleRevokeAccess = (appId: number) => {
    // In a real app, this would make an API call
    console.log(`Revoking access for app ${appId}`)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MidKey</span>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="text-foreground font-medium">{user}</span>
              </span>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header with Back Button */}
          <div className="flex items-center space-x-4">
            <Button onClick={() => onNavigate("dashboard")} variant="ghost" size="sm" className="hover:bg-muted">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Connected Applications</h1>
            <p className="text-muted-foreground mt-2">
              Manage applications that have access to your verifiable credentials and identity proofs.
            </p>
          </div>

          {/* Connected Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{app.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription className="text-xs">Connected {app.connectedDate}</CardDescription>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Proving:</h4>
                    <div className="space-y-1">
                      {app.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-muted-foreground">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => handleRevokeAccess(app.id)} variant="destructive" size="sm" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Revoke Access
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Your Privacy is Protected</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    These applications can only access the specific information you've approved. They never see your
                    actual data - only cryptographic proofs that verify the claims you choose to share.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

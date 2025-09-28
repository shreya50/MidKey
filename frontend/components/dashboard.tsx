"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  LogOut,
  CheckCircle,
  Apple as Apps,
  FileText,
  Settings,
  ToggleLeft,
  ToggleRight,
  CreditCard,
} from "lucide-react"

interface DashboardProps {
  user: string | null
  onLogout: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal" | "certificates" | "pricing") => void
  userType: "user" | "admin"
  onToggleUserType: () => void
  onConsentRequest: (app: { name: string; logo: string; permissions: string[] }) => void
}

export function Dashboard({
  user,
  onLogout,
  onNavigate,
  userType,
  onToggleUserType,
  onConsentRequest,
}: DashboardProps) {
  const handleDemoLogin = () => {
    onConsentRequest({
      name: "ConnectSphere",
      logo: "CS",
      permissions: ["Your Identity", "That you are over 18", "Your KYC Status"],
    })
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

            {/* User Info & Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">View as:</span>
                <Button onClick={onToggleUserType} variant="ghost" size="sm" className="h-8 px-2">
                  {userType === "user" ? (
                    <ToggleLeft className="h-4 w-4 mr-1" />
                  ) : (
                    <ToggleRight className="h-4 w-4 mr-1" />
                  )}
                  {userType === "user" ? "User" : "Admin"}
                </Button>
              </div>
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
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Digital Identity Hub</h1>
            <p className="text-muted-foreground mt-2">
              {userType === "user"
                ? "Manage your secure authentication and connected applications."
                : "Manage your applications and monitor authentication analytics."}
            </p>
          </div>

          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
            <CardContent className="pt-6 relative">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Successfully Authenticated!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Your digital identity is secure and ready to use. Try our demo to see how seamless zero-knowledge
                      authentication works with real applications.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Zero-Knowledge Proof Verified</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    onClick={handleDemoLogin}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 min-w-[200px]"
                  >
                    <Apps className="mr-2 h-5 w-5" />
                    Try Demo Login
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 text-primary hover:bg-primary/10 min-w-[140px] bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Demo app preview */}
              <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    CS
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">ConnectSphere Demo App</h4>
                    <p className="text-xs text-muted-foreground">Experience secure authentication in action</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Identity Verification</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Age Verification (18+)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>KYC Status Check</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                onClick={() => onNavigate("connected-apps")}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Apps className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Manage Connected Apps</CardTitle>
                      <CardDescription>View and control applications that have access to your identity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">3 applications currently connected</p>
                </CardContent>
              </Card>

              {userType === "user" ? (
                <Card
                  className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                  onClick={() => onNavigate("certificates")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">View Your Verifiable Credentials</CardTitle>
                        <CardDescription>Access your digital certificates and proofs</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">2 credentials available</p>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                  onClick={() => onNavigate("admin-portal")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">Developer Admin Portal</CardTitle>
                        <CardDescription>Manage your applications and view analytics</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">5 applications registered</p>
                  </CardContent>
                </Card>
              )}

              <Card
                className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                onClick={() => onNavigate("pricing")}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Pricing & Plans</CardTitle>
                      <CardDescription>View available plans and manage your subscription</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Free trial available</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Apps className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Authentication Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Session</span>
                    <span className="text-foreground">Secure</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proof Type</span>
                    <span className="text-foreground">ZK-SNARK</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Access Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Role</span>
                    <span className="text-foreground">Admin</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Permissions</span>
                    <span className="text-foreground">Full Access</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Login</span>
                    <span className="text-foreground">Just now</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Security Metrics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proof Validity</span>
                    <span className="text-success font-medium">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Encryption</span>
                    <span className="text-foreground">AES-256</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trust Score</span>
                    <span className="text-success font-medium">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Content */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest authentication events and security logs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-muted-foreground">Successful ZK proof verification</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Secure session established</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-muted rounded-full" />
                  <span className="text-muted-foreground">Authentication request initiated</span>
                  <span className="text-xs text-muted-foreground ml-auto">3 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

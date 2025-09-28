"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  LogOut,
  ArrowLeft,
  Plus,
  Settings,
  BarChart3,
  Key,
  CreditCard,
  Users,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Download,
  TrendingUp,
  Activity,
  Menu,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface AdminPortalProps {
  user: string | null
  onLogout: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal") => void
}

type AdminView = "overview" | "applications" | "analytics" | "api-keys" | "billing"
type SidebarState = "expanded" | "minimized" | "hidden"

// Applications and API keys will be loaded from the backend
const applications: any[] = []
const apiKeys: any[] = []

export function AdminPortal({ user, onLogout, onNavigate }: AdminPortalProps) {
  const [currentView, setCurrentView] = useState<AdminView>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarState, setSidebarState] = useState<SidebarState>("expanded")
  const [showApiKey, setShowApiKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showGenerateKeyForm, setShowGenerateKeyForm] = useState(false)
  const [showConfigureModal, setShowConfigureModal] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState<string | null>(null)

  const copyToClipboard = (text: string, keyId?: string) => {
    navigator.clipboard.writeText(text)
    if (keyId) {
      setCopiedKey(keyId)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  const handleRegisterApp = () => {
    setShowRegisterForm(!showRegisterForm)
  }

  const handleConfigureApp = (appId: string) => {
    console.log("[v0] Configuring app:", appId)
    setShowConfigureModal(appId)
  }

  const handleViewAnalytics = (appId: string) => {
    console.log("[v0] Viewing analytics for app:", appId)
    setCurrentView("analytics")
  }

  const handleEditApp = (appId: string) => {
    console.log("[v0] Editing app:", appId)
    setShowEditModal(appId)
  }

  const handleEditApiKey = (keyId: string) => {
    console.log("[v0] Editing API key:", keyId)
    // Add edit logic here
  }

  const handleDownloadApiKey = (keyId: string, keyName: string) => {
    console.log("[v0] Downloading API key:", keyId)
    const keyData = apiKeys.find((k) => k.id === keyId)
    if (keyData) {
      const blob = new Blob([JSON.stringify(keyData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${keyName.replace(/\s+/g, "_").toLowerCase()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleRevokeApiKey = (keyId: string) => {
    console.log("[v0] Revoking API key:", keyId)
    if (confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) {
      // Add revoke logic here
    }
  }

  const handleGenerateApiKey = () => {
    setShowGenerateKeyForm(!showGenerateKeyForm)
  }

  const handleDownloadInvoice = (invoice: string, date: string, amount: string) => {
    console.log("[v0] Downloading invoice:", invoice)

    // Create invoice data
    const invoiceData = {
      invoiceNumber: invoice,
      date: date,
      amount: amount,
      company: "MidKey Technologies",
      customerName: user,
      description: "MidKey Professional Plan - Monthly Subscription",
      dueDate: date,
      status: "Paid",
    }

    // Create and download the file
    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Invoice ${invoice}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 40px; }
        .invoice-details { margin-bottom: 30px; }
        .amount { font-size: 24px; font-weight: bold; color: #2563eb; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .footer { margin-top: 40px; text-align: center; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MidKey Technologies</h1>
        <h2>Invoice ${invoice}</h2>
    </div>
    
    <div class="invoice-details">
        <p><strong>Bill To:</strong> ${user}</p>
        <p><strong>Invoice Date:</strong> ${date}</p>
        <p><strong>Due Date:</strong> ${date}</p>
        <p><strong>Status:</strong> Paid</p>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>MidKey Professional Plan - Monthly Subscription</td>
                <td class="amount">${amount}</td>
            </tr>
        </tbody>
    </table>
    
    <div class="footer">
        <p>Thank you for your business!</p>
        <p>MidKey Technologies - Secure Authentication Solutions</p>
    </div>
</body>
</html>`

    // Create and download the file
    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${invoice}_${date.replace(/[,\s]/g, "_")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Developer Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your MidKey integration and usage statistics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No applications registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No users yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">No data available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No API calls yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest events across your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>No applications registered yet</p>
              <p className="text-sm">Register your first application to get started</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Manage your registered applications and monitor their authentication usage.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={handleRegisterApp}>
          <Plus className="mr-2 h-4 w-4" />
          Register New Application
        </Button>
      </div>

      {showRegisterForm && (
        <Card>
          <CardHeader>
            <CardTitle>Register New Application</CardTitle>
            <CardDescription>Create a new application to integrate with MidKey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input id="appName" placeholder="e.g., My E-commerce App" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appType">Application Type</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option>Web Application</option>
                  <option>Mobile Application</option>
                  <option>Desktop Application</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="redirectUrl">Redirect URL</Label>
              <Input id="redirectUrl" placeholder="https://yourapp.com/auth/callback" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appDescription">Description (Optional)</Label>
              <Textarea id="appDescription" placeholder="Describe your application..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Create Application</Button>
              <Button variant="outline" onClick={() => setShowRegisterForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configure Modal */}
      {showConfigureModal && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Application</CardTitle>
            <CardDescription>
              Configure settings for {applications.find((app) => app.id === showConfigureModal)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="configRedirectUrl">Redirect URLs</Label>
                <Textarea
                  id="configRedirectUrl"
                  placeholder="https://yourapp.com/auth/callback&#10;https://yourapp.com/auth/success"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="configWebhookUrl">Webhook URL</Label>
                <Input id="configWebhookUrl" placeholder="https://yourapp.com/webhooks/midkey" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="configTokenExpiry">Token Expiry (minutes)</Label>
                <Input id="configTokenExpiry" type="number" placeholder="60" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="configRefreshToken">Refresh Token Enabled</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Authentication Methods</Label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Email/Password</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Biometric</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Social Login</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Hardware Keys</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Save Configuration</Button>
              <Button variant="outline" onClick={() => setShowConfigureModal(null)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Application</CardTitle>
            <CardDescription>
              Update details for {applications.find((app) => app.id === showEditModal)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const app = applications.find((a) => a.id === showEditModal)
              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editAppName">Application Name</Label>
                      <Input id="editAppName" defaultValue={app?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAppStatus">Status</Label>
                      <select
                        className="w-full p-2 border border-border rounded-md bg-background"
                        defaultValue={app?.status}
                      >
                        <option value="Active">Active</option>
                        <option value="Development">Development</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editClientId">Client ID</Label>
                    <div className="flex gap-2">
                      <Input id="editClientId" value={app?.clientId} readOnly className="bg-muted" />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(app?.clientId || "")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editAppDescription">Description</Label>
                    <Textarea id="editAppDescription" placeholder="Describe your application..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Created Date</Label>
                      <Input value={app?.createdDate} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Activity</Label>
                      <Input value={app?.lastActivity} readOnly className="bg-muted" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="w-full sm:w-auto">Update Application</Button>
                    <Button variant="outline" onClick={() => setShowEditModal(null)} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Delete Application
                    </Button>
                  </div>
                </>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Applications Grid */}
      <div className="grid gap-4">
        <div className="text-center py-12 text-muted-foreground">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
          <p className="mb-4">Register your first application to start using MidKey authentication</p>
          <Button onClick={handleRegisterApp} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Register First Application
          </Button>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">Detailed insights into your authentication usage and performance.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Authentication Requests</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0</div>
            <p className="text-sm text-muted-foreground">No requests yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate</CardTitle>
            <CardDescription>Authentication success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">-</div>
            <p className="text-sm text-muted-foreground">No data available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Response Time</CardTitle>
            <CardDescription>API response latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">-</div>
            <p className="text-sm text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage by Application */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Application</CardTitle>
          <CardDescription>Authentication requests per application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No applications registered yet</p>
            <p className="text-sm">Register applications to see usage analytics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApiKeys = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground mt-2">Manage your API keys for authenticating with MidKey services.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={handleGenerateApiKey}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        <div className="text-center py-12 text-muted-foreground">
          <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No API Keys Yet</h3>
          <p className="mb-4">Generate your first API key to start integrating with MidKey</p>
          <Button onClick={handleGenerateApiKey} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Generate First API Key
          </Button>
        </div>
      </div>

      {showGenerateKeyForm && (
        <Card>
          <CardHeader>
            <CardTitle>Generate New API Key</CardTitle>
            <CardDescription>Create a new API key for your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input id="keyName" placeholder="e.g., Production API Key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyType">Key Type</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option>Live Key</option>
                  <option>Test Key</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyDescription">Description (Optional)</Label>
              <Textarea id="keyDescription" placeholder="Describe what this key will be used for..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Generate API Key</Button>
              <Button variant="outline" onClick={() => setShowGenerateKeyForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderBilling = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Billing & Usage</h1>
        <p className="text-muted-foreground mt-2">Monitor your usage and manage your billing information.</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your active subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Free Trial</h3>
              <p className="text-muted-foreground">Up to 100 monthly active users</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$0/month</div>
              <p className="text-sm text-muted-foreground">14-day trial</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Active Users</CardTitle>
            <CardDescription>Current billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">0% of 100 limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Requests</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">No requests yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Billing Date</CardTitle>
            <CardDescription>Automatic renewal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-sm text-muted-foreground">No billing yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No billing history yet</p>
            <p className="text-sm">Billing will appear here once you upgrade from the free trial</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "applications", label: "Applications", icon: Settings },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const toggleSidebar = () => {
    setSidebarState((prevState) =>
      prevState === "expanded" ? "minimized" : prevState === "minimized" ? "hidden" : "expanded",
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" className="hidden lg:flex" onClick={toggleSidebar}>
                {sidebarState === "hidden" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MidKey</span>
              <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                Developer Portal
              </Badge>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => onNavigate("dashboard")}
                variant="ghost"
                size="sm"
                className="hidden sm:flex hover:bg-muted"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome, <span className="text-foreground font-medium">{user}</span>
              </span>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 ${
            sidebarState === "hidden"
              ? "lg:-translate-x-full lg:w-0"
              : sidebarState === "minimized"
                ? "lg:w-16"
                : "lg:w-64"
          } w-64 bg-card/30 border-r border-border transition-all duration-300 ease-in-out ${
            sidebarState === "hidden" ? "lg:border-r-0" : ""
          }`}
        >
          <div className={`p-6 pt-20 lg:pt-6 ${sidebarState === "minimized" ? "lg:px-2" : ""}`}>
            {sidebarState === "minimized" && (
              <div className="hidden lg:flex justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            )}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className={`w-full ${sidebarState === "minimized" ? "lg:justify-center lg:px-2" : "justify-start"}`}
                  onClick={() => {
                    setCurrentView(item.id as AdminView)
                    setSidebarOpen(false)
                  }}
                  title={sidebarState === "minimized" ? item.label : undefined}
                >
                  <item.icon className={`h-4 w-4 ${sidebarState === "minimized" ? "lg:mr-0" : "mr-2"}`} />
                  <span className={sidebarState === "minimized" ? "lg:hidden" : ""}>{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {currentView === "overview" && renderOverview()}
            {currentView === "applications" && renderApplications()}
            {currentView === "analytics" && renderAnalytics()}
            {currentView === "api-keys" && renderApiKeys()}
            {currentView === "billing" && renderBilling()}
          </div>
        </div>
      </div>
    </div>
  )
}

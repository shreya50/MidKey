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

const applications = [
  {
    id: "app_1",
    name: "E-commerce Platform",
    clientId: "mk_ec_prod_123",
    status: "Active",
    monthlyActiveUsers: "12,450",
    createdDate: "Jan 15, 2024",
    lastActivity: "2 hours ago",
  },
  {
    id: "app_2",
    name: "Banking Integration",
    clientId: "mk_bank_prod_456",
    status: "Active",
    monthlyActiveUsers: "8,230",
    createdDate: "Dec 3, 2023",
    lastActivity: "1 day ago",
  },
  {
    id: "app_3",
    name: "Healthcare Portal",
    clientId: "mk_health_dev_789",
    status: "Development",
    monthlyActiveUsers: "0",
    createdDate: "Feb 28, 2024",
    lastActivity: "5 minutes ago",
  },
]

const apiKeys = [
  {
    id: "key_1",
    name: "Production API Key",
    key: "mk_live_1234567890abcdef",
    created: "Jan 15, 2024",
    lastUsed: "2 hours ago",
    status: "Active",
  },
  {
    id: "key_2",
    name: "Development API Key",
    key: "mk_test_abcdef1234567890",
    created: "Dec 3, 2023",
    lastUsed: "1 day ago",
    status: "Active",
  },
]

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
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 active, 2 in development</p>
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
            <div className="text-2xl font-bold">20,680</div>
            <p className="text-xs text-success">+12% from last month</p>
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
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">Authentication success</p>
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
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">This month</p>
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
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{app.name}</h4>
                    <Badge variant={app.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Last activity: {app.lastActivity}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <div className="text-sm font-semibold">{app.monthlyActiveUsers}</div>
                  <p className="text-xs text-muted-foreground">MAU</p>
                </div>
              </div>
            ))}
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
        {applications.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-medium text-foreground">{app.name}</h3>
                    <Badge variant={app.status === "Active" ? "default" : "secondary"}>{app.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Client ID: {app.clientId}</p>
                    <p>Created: {app.createdDate}</p>
                    <p>Last Activity: {app.lastActivity}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-center sm:text-right">
                    <div className="text-lg font-semibold text-foreground">{app.monthlyActiveUsers}</div>
                    <p className="text-sm text-muted-foreground">Monthly Active Users</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigureApp(app.id)}
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span className="sm:inline">Configure</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAnalytics(app.id)}
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span className="sm:inline">Analytics</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditApp(app.id)}
                      className="w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span className="sm:inline">Edit</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
            <div className="text-3xl font-bold text-foreground">1,234,567</div>
            <p className="text-sm text-success">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate</CardTitle>
            <CardDescription>Authentication success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">99.8%</div>
            <p className="text-sm text-muted-foreground">Industry leading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Response Time</CardTitle>
            <CardDescription>API response latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">120ms</div>
            <p className="text-sm text-success">-5ms from last month</p>
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
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.monthlyActiveUsers} MAU</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {app.status === "Active" ? Math.floor(Math.random() * 50000 + 10000).toLocaleString() : "0"}
                  </div>
                  <p className="text-sm text-muted-foreground">Requests</p>
                </div>
              </div>
            ))}
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
        {apiKeys.map((key) => (
          <Card key={key.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-medium text-foreground">{key.name}</h3>
                    <Badge variant="default">{key.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span>Key:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono break-all">
                          {showApiKey === key.id ? key.key : key.key.replace(/./g, "•").slice(0, 20) + "..."}
                        </code>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(showApiKey === key.id ? null : key.id)}
                            className="h-8 w-8 p-0"
                          >
                            {showApiKey === key.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(key.key, key.id)}
                            className="h-8 w-8 p-0"
                          >
                            {copiedKey === key.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p>Created: {key.created}</p>
                    <p>Last Used: {key.lastUsed}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditApiKey(key.id)}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span className="sm:inline">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadApiKey(key.id, key.name)}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span className="sm:inline">Download</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevokeApiKey(key.id)}
                    className="w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="sm:inline">Revoke</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
              <h3 className="text-xl font-semibold">Professional Plan</h3>
              <p className="text-muted-foreground">Up to 100,000 monthly active users</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$99/month</div>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
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
            <div className="text-2xl font-bold">20,680</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "20.68%" }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">20.68% of 100,000 limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Requests</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-sm text-success">Unlimited on your plan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Billing Date</CardTitle>
            <CardDescription>Automatic renewal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mar 15</div>
            <p className="text-sm text-muted-foreground">2024</p>
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
          <div className="space-y-4">
            {[
              { date: "Feb 15, 2024", amount: "$99.00", status: "Paid", invoice: "INV-001" },
              { date: "Jan 15, 2024", amount: "$99.00", status: "Paid", invoice: "INV-002" },
              { date: "Dec 15, 2023", amount: "$99.00", status: "Paid", invoice: "INV-003" },
            ].map((bill, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bill.invoice}</span>
                    <Badge variant="default">{bill.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{bill.date}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <span className="font-semibold">{bill.amount}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(bill.invoice, bill.date, bill.amount)}
                    className="hover:bg-muted transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
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

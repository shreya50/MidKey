"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  LogOut,
  ArrowLeft,
  Book,
  Code,
  Key,
  Lock,
  Users,
  Zap,
  CheckCircle,
  ExternalLink,
  Copy,
  Download,
  FileText,
  Settings,
  Globe,
  Smartphone,
} from "lucide-react"
import { useState } from "react"

interface DocumentationProps {
  user?: string | null
  onLogout?: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal" | "certificates" | "pricing" | "marketing") => void
}

export function Documentation({ user, onLogout, onNavigate }: DocumentationProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections = [
    { id: "overview", title: "Overview", icon: Book },
    { id: "getting-started", title: "Getting Started", icon: Zap },
    { id: "authentication", title: "Authentication", icon: Lock },
    { id: "api-reference", title: "API Reference", icon: Code },
    { id: "sdk", title: "SDK Integration", icon: Settings },
    { id: "examples", title: "Examples", icon: FileText },
  ]

  const codeExamples = {
    javascript: `// Initialize MidKey SDK
import { MidKey } from '@midkey/sdk'

const midkey = new MidKey({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
})

// Authenticate user
const result = await midkey.authenticate({
  proofType: 'zk-snark',
  requiredClaims: ['identity', 'age_over_18']
})

if (result.success) {
  console.log('User authenticated:', result.user)
}`,
    curl: `# Verify a proof
curl -X POST https://api.midkey.com/v1/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "proof": "zk_proof_string",
    "public_inputs": ["claim1", "claim2"],
    "circuit_id": "identity_verification"
  }'`,
    react: `// React Hook for MidKey Authentication
import { useMidKey } from '@midkey/react'

function LoginButton() {
  const { authenticate, isLoading, user } = useMidKey()
  
  const handleLogin = async () => {
    try {
      await authenticate({
        requiredClaims: ['identity', 'kyc_status']
      })
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }
  
  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Authenticating...' : 'Login with MidKey'}
    </button>
  )
}`,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MidKey</span>
              <span className="text-sm text-muted-foreground">Documentation</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button onClick={() => onNavigate("dashboard")} variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Welcome, <span className="text-foreground font-medium">{user}</span>
                  </span>
                  <Button onClick={onLogout} variant="outline" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => onNavigate("marketing")} variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-none">
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">MidKey Documentation</h1>
                  <p className="text-xl text-muted-foreground">
                    Complete guide to integrating zero-knowledge authentication into your applications.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-primary" />
                      <span>What is MidKey?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      MidKey is a zero-knowledge authentication platform that allows users to prove their identity and
                      attributes without revealing sensitive personal information. Built on cutting-edge cryptographic
                      protocols, MidKey enables privacy-preserving authentication for the modern web.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Zero-Knowledge Proofs</h4>
                          <p className="text-sm text-muted-foreground">
                            Prove claims about yourself without revealing the underlying data.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Universal Identity</h4>
                          <p className="text-sm text-muted-foreground">
                            One secure identity that works across all your applications.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Globe className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Cross-Platform</h4>
                          <p className="text-sm text-muted-foreground">
                            Works seamlessly across web, mobile, and desktop applications.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">Lightning Fast</h4>
                          <p className="text-sm text-muted-foreground">
                            Instant verification with optimized cryptographic circuits.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Privacy-First Authentication</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Selective Disclosure</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Revocable Credentials</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Multi-Platform SDKs</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Enterprise-Grade Security</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Real-Time Analytics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">Compliance Ready</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium">24/7 Support</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "getting-started" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started</h1>
                  <p className="text-xl text-muted-foreground">Get up and running with MidKey in minutes.</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start Guide</CardTitle>
                    <CardDescription>Follow these steps to integrate MidKey into your application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Create Your Account</h4>
                          <p className="text-muted-foreground">
                            Sign up for a MidKey developer account and get your API keys.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Install the SDK</h4>
                          <p className="text-muted-foreground">
                            Choose your preferred SDK and install it in your project.
                          </p>
                          <div className="mt-2 p-3 bg-muted rounded-lg">
                            <code className="text-sm">npm install @midkey/sdk</code>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Initialize MidKey</h4>
                          <p className="text-muted-foreground">
                            Configure the SDK with your API key and start authenticating users.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Test Integration</h4>
                          <p className="text-muted-foreground">
                            Use our sandbox environment to test your integration before going live.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available SDKs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Code className="h-5 w-5 text-primary" />
                          <span className="font-semibold">JavaScript/TypeScript</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">For web applications and Node.js</p>
                        <code className="text-xs bg-muted p-2 rounded block">npm install @midkey/sdk</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <span className="font-semibold">React Native</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">For mobile applications</p>
                        <code className="text-xs bg-muted p-2 rounded block">npm install @midkey/react-native</code>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="h-5 w-5 text-primary" />
                          <span className="font-semibold">REST API</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Direct HTTP integration</p>
                        <code className="text-xs bg-muted p-2 rounded block">https://api.midkey.com/v1</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "authentication" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">Authentication Flow</h1>
                  <p className="text-xl text-muted-foreground">
                    Understand how zero-knowledge authentication works with MidKey.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">User Initiates Authentication</h4>
                          <p className="text-muted-foreground">User clicks "Login with MidKey" in your application.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Proof Generation</h4>
                          <p className="text-muted-foreground">
                            MidKey generates a zero-knowledge proof based on the required claims.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Proof Verification</h4>
                          <p className="text-muted-foreground">
                            Your application verifies the proof using MidKey's verification API.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          ✓
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Authentication Complete</h4>
                          <p className="text-muted-foreground">
                            User is authenticated without revealing any personal information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supported Claims</CardTitle>
                    <CardDescription>Types of information that can be verified without disclosure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Identity Claims</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Unique identity verification</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Age verification (18+, 21+, etc.)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Citizenship/residency status</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Professional credentials</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Compliance Claims</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>KYC/AML verification</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Accredited investor status</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Credit score ranges</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Educational qualifications</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "api-reference" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">API Reference</h1>
                  <p className="text-xl text-muted-foreground">Complete reference for MidKey's REST API endpoints.</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>All API requests require authentication using your API key</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Base URL</h4>
                        <div className="p-3 bg-muted rounded-lg">
                          <code className="text-sm">https://api.midkey.com/v1</code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Authentication Header</h4>
                        <div className="p-3 bg-muted rounded-lg">
                          <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>POST /verify</CardTitle>
                        <CardDescription>Verify a zero-knowledge proof</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(codeExamples.curl, "curl-verify")}
                      >
                        {copiedCode === "curl-verify" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Request Body</h4>
                        <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{codeExamples.curl}</code>
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Response</h4>
                        <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{`{
  "success": true,
  "verified": true,
  "claims": {
    "identity": "verified",
    "age_over_18": true,
    "kyc_status": "approved"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GET /applications</CardTitle>
                    <CardDescription>List your registered applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Response</h4>
                        <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{`{
  "applications": [
    {
      "id": "app_123",
      "name": "My App",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z",
      "auth_count": 1250
    }
  ]
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "sdk" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">SDK Integration</h1>
                  <p className="text-xl text-muted-foreground">
                    Learn how to integrate MidKey using our JavaScript SDK.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Installation</CardTitle>
                        <CardDescription>Install the MidKey SDK in your project</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <code className="text-sm">npm install @midkey/sdk</code>
                      </div>
                      <p className="text-muted-foreground">Or if you're using Yarn:</p>
                      <div className="p-4 bg-muted rounded-lg">
                        <code className="text-sm">yarn add @midkey/sdk</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Basic Usage</CardTitle>
                        <CardDescription>Initialize and use the MidKey SDK</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(codeExamples.javascript, "js-basic")}
                      >
                        {copiedCode === "js-basic" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{codeExamples.javascript}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>React Integration</CardTitle>
                        <CardDescription>Use MidKey with React hooks</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(codeExamples.react, "react-hook")}
                      >
                        {copiedCode === "react-hook" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{codeExamples.react}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "examples" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">Examples</h1>
                  <p className="text-xl text-muted-foreground">
                    Real-world examples and use cases for MidKey integration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span>Web Application</span>
                      </CardTitle>
                      <CardDescription>Complete example for web apps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A complete implementation showing user registration, login, and profile management.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Demo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <span>Mobile App</span>
                      </CardTitle>
                      <CardDescription>React Native implementation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Mobile authentication with biometric integration and offline proof generation.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Demo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="h-5 w-5 text-primary" />
                        <span>DeFi Integration</span>
                      </CardTitle>
                      <CardDescription>Compliance-ready DeFi app</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          KYC verification for DeFi protocols with privacy-preserving compliance checks.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Demo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Enterprise SSO</span>
                      </CardTitle>
                      <CardDescription>Single sign-on solution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Enterprise-grade SSO with role-based access control and audit logging.
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Demo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Resources</CardTitle>
                    <CardDescription>Additional resources and community contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <Book className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground mb-1">Tutorials</h4>
                        <p className="text-sm text-muted-foreground">Step-by-step guides</p>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground mb-1">Community</h4>
                        <p className="text-sm text-muted-foreground">Join our Discord</p>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground mb-1">GitHub</h4>
                        <p className="text-sm text-muted-foreground">Open source examples</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

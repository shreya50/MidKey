"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Users, Zap, CheckCircle, ArrowRight } from "lucide-react"

interface MarketingHomepageProps {
  onLogin: () => void
  onSignUp: () => void
  hasAccount: boolean
  onLearnMore: () => void
}

export function MarketingHomepage({ onLogin, onSignUp, hasAccount, onLearnMore }: MarketingHomepageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">MidKey</span>
            </div>
            <div className="flex items-center space-x-4">
              {hasAccount ? (
                <Button onClick={onLogin} className="bg-primary hover:bg-primary/90">
                  Sign In
                </Button>
              ) : (
                <>
                  <Button onClick={onLogin} variant="ghost">
                    Sign In
                  </Button>
                  <Button onClick={onSignUp} className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Identity, <span className="text-primary">Your Control</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            MidKey uses zero-knowledge proofs to give you complete control over your digital identity. Authenticate
            securely without revealing personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onSignUp} size="lg" className="bg-primary hover:bg-primary/90">
              Create Your Secure Identity
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={onLogin} variant="outline" size="lg">
              {hasAccount ? "Sign In" : "Learn More"}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose MidKey?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of digital authentication with cutting-edge zero-knowledge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Zero-Knowledge Proofs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Prove your identity without revealing personal information. Your data stays private.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Complete Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You decide what information to share and with whom. Revoke access anytime.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Universal Login</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  One secure identity for all your applications. No more passwords to remember.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant verification with cryptographic proofs. No delays, no friction.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg mb-12">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">Free Trial</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Up to 100 authentications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Basic identity management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Community support</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-3xl font-bold">
                  $10<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Unlimited authentications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Priority support</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold">
                  $15<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">SLA guarantees</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Take Control?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of users who have already secured their digital identity with MidKey.
          </p>
          <Button onClick={onSignUp} size="lg" className="bg-primary hover:bg-primary/90">
            Create Your Secure Identity Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}

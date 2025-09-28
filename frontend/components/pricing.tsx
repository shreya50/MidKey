"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Check, Star, Zap, Crown } from "lucide-react"

interface PricingProps {
  user: string | null
  onLogout: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal" | "certificates" | "pricing") => void
}

export function Pricing({ user, onLogout, onNavigate }: PricingProps) {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "14 days",
      description: "Perfect for trying out MidKey's zero-knowledge authentication",
      icon: Star,
      features: [
        "Up to 100 authentications",
        "Basic ZK proof generation",
        "2 connected applications",
        "Email support",
        "Standard security features",
      ],
      buttonText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Starter",
      price: "$5",
      period: "per month",
      description: "Ideal for individuals and small projects",
      icon: Zap,
      features: [
        "Up to 1,000 authentications",
        "Advanced ZK proof generation",
        "10 connected applications",
        "Priority email support",
        "Enhanced security features",
        "Basic analytics dashboard",
      ],
      buttonText: "Choose Starter",
      popular: false,
    },
    {
      name: "Professional",
      price: "$10",
      period: "per month",
      description: "Great for growing businesses and teams",
      icon: Shield,
      features: [
        "Up to 10,000 authentications",
        "Premium ZK proof generation",
        "50 connected applications",
        "24/7 chat support",
        "Advanced security features",
        "Comprehensive analytics",
        "Custom branding",
        "API access",
      ],
      buttonText: "Choose Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$15",
      period: "per month",
      description: "For large organizations with advanced needs",
      icon: Crown,
      features: [
        "Unlimited authentications",
        "Enterprise ZK proof generation",
        "Unlimited connected applications",
        "Dedicated account manager",
        "Enterprise-grade security",
        "Advanced analytics & reporting",
        "White-label solutions",
        "Full API access",
        "Custom integrations",
        "SLA guarantee",
      ],
      buttonText: "Choose Enterprise",
      popular: false,
    },
  ]

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

            {/* Back Button */}
            <Button
              onClick={() => onNavigate("dashboard")}
              variant="outline"
              size="sm"
              className="border-border hover:bg-muted bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Secure your digital identity with zero-knowledge authentication. Start with our free trial and upgrade as
              you grow.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={index}
                  className={`relative hover:shadow-lg transition-all ${
                    plan.popular ? "border-primary/50 bg-primary/5 ring-2 ring-primary/20" : "hover:border-primary/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${plan.popular ? "bg-primary/20" : "bg-muted"}`}>
                        <IconComponent
                          className={`h-6 w-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/{plan.period}</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                          <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose MidKey?</CardTitle>
                <CardDescription>Experience the future of authentication with zero-knowledge proofs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Zero-Knowledge Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Prove your identity without revealing sensitive information. Your data stays private.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Zap className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced cryptographic proofs generated in milliseconds for seamless user experience.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Crown className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Enterprise Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      Scalable infrastructure with enterprise-grade security and compliance features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Can I change plans anytime?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">What happens after my free trial?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your account will be automatically downgraded to the free tier. You can upgrade anytime to
                      continue using premium features.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Is my data secure?</h4>
                    <p className="text-sm text-muted-foreground">
                      Absolutely. We use zero-knowledge proofs to ensure your sensitive data never leaves your device
                      while still providing secure authentication.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Lock, Users, CheckCircle, ArrowRight, ArrowLeft, Copy, Eye, EyeOff } from "lucide-react"

interface OnboardingFlowProps {
  step: "welcome" | "secure" | "recovery" | "complete"
  onStepChange: (step: "welcome" | "secure" | "recovery" | "complete") => void
  onComplete: () => void
  isModal?: boolean
}

export function OnboardingFlow({ step, onStepChange, onComplete, isModal = false }: OnboardingFlowProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [recoveryPhrase] = useState(
    "abandon ability able about above absent absorb abstract absurd abuse access accident",
  )
  const [recoveryConfirmed, setRecoveryConfirmed] = useState(false)
  const [recoveryInput, setRecoveryInput] = useState("")

  const handleNext = () => {
    if (step === "welcome") onStepChange("secure")
    else if (step === "secure") onStepChange("recovery")
    else if (step === "recovery") onStepChange("complete")
    else if (step === "complete") onComplete()
  }

  const handleBack = () => {
    if (step === "secure") onStepChange("welcome")
    else if (step === "recovery") onStepChange("secure")
    else if (step === "complete") onStepChange("recovery")
  }

  const copyRecoveryPhrase = () => {
    navigator.clipboard.writeText(recoveryPhrase)
  }

  const validateRecovery = () => {
    return recoveryInput.trim().toLowerCase() === recoveryPhrase.toLowerCase()
  }

  return (
    <div className={`${isModal ? "py-4" : "min-h-screen"} flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex items-center space-x-2 ${step === "welcome" ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "welcome" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </div>
              <span className="text-sm font-medium">Welcome</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${step === "secure" ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "secure" ? "bg-primary text-primary-foreground" : step === "recovery" || step === "complete" ? "bg-success text-success-foreground" : "bg-muted"}`}
              >
                {step === "recovery" || step === "complete" ? <CheckCircle className="h-4 w-4" /> : "2"}
              </div>
              <span className="text-sm font-medium">Secure</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${step === "recovery" ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "recovery" ? "bg-primary text-primary-foreground" : step === "complete" ? "bg-success text-success-foreground" : "bg-muted"}`}
              >
                {step === "complete" ? <CheckCircle className="h-4 w-4" /> : "3"}
              </div>
              <span className="text-sm font-medium">Recovery</span>
            </div>
            <div
              className={`flex items-center space-x-2 ${step === "complete" ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "complete" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                4
              </div>
              <span className="text-sm font-medium">Complete</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: step === "welcome" ? "25%" : step === "secure" ? "50%" : step === "recovery" ? "75%" : "100%",
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        {step === "welcome" && (
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Welcome to MidKey</CardTitle>
              <CardDescription className="text-lg">
                Create your secure digital identity in just a few steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Zero-Knowledge</h3>
                  <p className="text-sm text-muted-foreground">Your data never leaves your device</p>
                </div>
                <div className="text-center p-4">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Secure</h3>
                  <p className="text-sm text-muted-foreground">Military-grade encryption</p>
                </div>
                <div className="text-center p-4">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Universal</h3>
                  <p className="text-sm text-muted-foreground">One identity for all apps</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  Create My Secure Identity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "secure" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Secure Your Account</CardTitle>
              <CardDescription>
                Create a primary secret to encrypt your keys. This secret never leaves your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Primary Secret</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a strong passphrase"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Primary Secret</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your passphrase"
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Security Note</h4>
                    <p className="text-sm text-muted-foreground">
                      This secret is used locally to encrypt your keys and never leaves your device. Make sure it's
                      strong and memorable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!password || password !== confirmPassword || password.length < 8}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "recovery" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Recovery Setup</CardTitle>
              <CardDescription>
                Save your recovery phrase. This is crucial for account recovery if you forget your primary secret.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Your Recovery Phrase</h4>
                    <Button onClick={copyRecoveryPhrase} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <p className="font-mono text-sm bg-background p-3 rounded border">{recoveryPhrase}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recoveryConfirm">Confirm Recovery Phrase</Label>
                  <Textarea
                    id="recoveryConfirm"
                    value={recoveryInput}
                    onChange={(e) => setRecoveryInput(e.target.value)}
                    placeholder="Type your recovery phrase to confirm you've saved it"
                    rows={3}
                  />
                </div>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-destructive">Important</h4>
                    <p className="text-sm text-muted-foreground">
                      Store this recovery phrase in a safe place. Without it, you cannot recover your account if you
                      lose access to your primary secret.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!validateRecovery()} className="bg-primary hover:bg-primary/90">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "complete" && (
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <CardTitle className="text-2xl">Your MidKey is Ready!</CardTitle>
              <CardDescription className="text-lg">You are now in control of your digital identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                  <CheckCircle className="h-6 w-6 text-success mb-2" />
                  <h3 className="font-semibold mb-1">Identity Created</h3>
                  <p className="text-sm text-muted-foreground">Your secure digital identity is ready to use</p>
                </div>
                <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                  <CheckCircle className="h-6 w-6 text-success mb-2" />
                  <h3 className="font-semibold mb-1">Recovery Secured</h3>
                  <p className="text-sm text-muted-foreground">Your account can be recovered safely</p>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={handleNext} size="lg" className="bg-primary hover:bg-primary/90">
                  Go to My Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

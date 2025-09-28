"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, X, AlertTriangle } from "lucide-react"

interface ConsentModalProps {
  app: {
    name: string
    logo: string
    permissions: string[]
  }
  onApprove: () => void
  onDeny: () => void
}

export function ConsentModal({ app, onApprove, onDeny }: ConsentModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <X className="h-4 w-4 text-muted-foreground" />
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">{app.logo}</span>
            </div>
          </div>
          <CardTitle className="text-xl">{app.name} wants to verify:</CardTitle>
          <CardDescription>This app is requesting permission to verify specific information about you</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* App Info */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Verified Domain</span>
            </div>
            <p className="text-sm text-muted-foreground">{app.name.toLowerCase()}.com</p>
          </div>

          {/* Permissions List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Requested Verifications:</h4>
            <div className="space-y-2">
              {app.permissions.map((permission, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 bg-success/5 rounded-lg border border-success/20"
                >
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-primary">Zero-Knowledge Proof</h4>
                <p className="text-xs text-muted-foreground">
                  Only the requested facts will be verified. Your actual personal data remains private and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/20">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-destructive">Security Reminder</h4>
                <p className="text-xs text-muted-foreground">
                  Only approve if you trust this application and want to grant these permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button onClick={onDeny} variant="outline" className="flex-1 bg-transparent">
              Deny
            </Button>
            <Button onClick={onApprove} className="flex-1 bg-primary hover:bg-primary/90">
              Approve & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

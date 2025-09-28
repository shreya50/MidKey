"use client"

import { Shield, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

const loadingMessages = [
  "Establishing secure connection...",
  "Generating your private proof...",
  "Verifying credentials on-chain...",
  "Finalizing secure authentication...",
]

export function LoadingModal() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 750)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Animated Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl shield-pulse" />
            <div className="relative bg-primary/10 rounded-full p-6">
              <Shield className="h-12 w-12 text-primary shield-pulse" />
              <Loader2 className="absolute inset-2 h-8 w-8 text-primary/60 animate-spin" />
            </div>
          </div>

          {/* Status Text */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Authenticating Securely</h3>
            <p className="text-muted-foreground transition-all duration-300">{loadingMessages[messageIndex]}</p>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "75%" }} />
            </div>
            <p className="text-xs text-muted-foreground">This may take a few seconds...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

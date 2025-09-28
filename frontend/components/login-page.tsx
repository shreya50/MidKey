"use client"

import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
  isModal?: boolean
}

export function LoginPage({ onLogin, isModal = false }: LoginPageProps) {
  return (
    <div className={`${isModal ? "py-4" : "min-h-screen"} flex items-center justify-center px-4`}>
      <div className="max-w-md w-full text-center space-y-8">
        {isModal && (
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-sans">MidKey</h1>
          </div>
        )}

        {!isModal && (
          <div className="flex items-center justify-center space-x-3 mb-12">
            <div className="relative">
              <Shield className="h-10 w-10 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-sans">MidKey</h1>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className={`${isModal ? "text-2xl" : "text-4xl"} font-bold text-foreground text-balance leading-tight`}>
              {isModal ? "Welcome Back" : "The Future of Secure Login"}
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Sign in seamlessly and privately with the power of zero-knowledge proofs.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={onLogin}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 pulse-glow"
            >
              <Lock className="mr-3 h-5 w-5" />
              Login with MidKey
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-success" />
              <span>Zero-knowledge proof technology</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-success" />
              <span>Your privacy is mathematically guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

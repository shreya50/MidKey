"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { LoadingModal } from "@/components/loading-modal"
import { Dashboard } from "@/components/dashboard"
import { ConnectedApps } from "@/components/connected-apps"
import { AdminPortal } from "@/components/admin-portal"
import { Certificates } from "@/components/certificates"
import { Pricing } from "@/components/pricing"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { ConsentModal } from "@/components/consent-modal"
import { MarketingHomepage } from "@/components/marketing-homepage"
import { Documentation } from "@/components/documentation"

export default function Home() {
  const [authState, setAuthState] = useState<"logged-out" | "verifying" | "logged-in" | "onboarding">("logged-out")
  const [user, setUser] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "connected-apps"
    | "admin-portal"
    | "certificates"
    | "pricing"
    | "marketing"
    | "consent"
    | "onboarding"
    | "documentation"
  >("marketing")
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [onboardingStep, setOnboardingStep] = useState<"welcome" | "secure" | "recovery" | "complete">("welcome")
  const [consentApp, setConsentApp] = useState<{ name: string; logo: string; permissions: string[] } | null>(null)
  const [hasAccount, setHasAccount] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleStartOnboarding = () => {
    setCurrentView("onboarding")
    setOnboardingStep("welcome")
  }

  const handleOnboardingComplete = () => {
    setHasAccount(true)
    setAuthState("logged-out")
    setCurrentView("marketing")
  }

  const handleLogin = async () => {
    setAuthState("verifying")
    setShowLoginModal(false)

    try {
      console.log('🔐 Starting real authentication...')
      
      // Call our API route which connects to the proof server
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log('🔐 Authentication response:', data)

      if (data.success) {
        setUser("user")
        setAuthState("logged-in")
        setCurrentView("dashboard")
        console.log('✅ Authentication successful!')
      } else {
        console.log('❌ Authentication failed:', data.message)
        setAuthState("logged-out")
        setShowLoginModal(true)
        alert(`Authentication failed: ${data.message}`)
      }
    } catch (error) {
      console.error('❌ Authentication error:', error)
      setAuthState("logged-out")
      setShowLoginModal(true)
      alert('Authentication service unavailable. Please try again.')
    }
  }

  const handleShowLogin = () => {
    setShowLoginModal(true)
  }

  const handleLogout = () => {
    setUser(null)
    setAuthState("logged-out")
    setCurrentView("marketing")
  }

  const handleNavigation = (
    view:
      | "dashboard"
      | "connected-apps"
      | "admin-portal"
      | "certificates"
      | "pricing"
      | "marketing"
      | "consent"
      | "documentation",
  ) => {
    setCurrentView(view)
  }

  const handleBackToMarketing = () => {
    setCurrentView("marketing")
    setOnboardingStep("welcome")
  }

  const toggleUserType = () => {
    setUserType((prev) => (prev === "user" ? "admin" : "user"))
    setCurrentView("dashboard")
  }

  const handleConsentRequest = (app: { name: string; logo: string; permissions: string[] }) => {
    setConsentApp(app)
    setCurrentView("consent")
  }

  const handleConsentApprove = () => {
    // Add app to connected apps list
    setCurrentView("dashboard")
    setConsentApp(null)
  }

  const handleConsentDeny = () => {
    setCurrentView("dashboard")
    setConsentApp(null)
  }

  const handleLearnMore = () => {
    setCurrentView("documentation")
  }

  return (
    <main className="min-h-screen">
      {currentView === "marketing" && (
        <MarketingHomepage
          onLogin={handleShowLogin}
          onSignUp={handleStartOnboarding}
          onLearnMore={handleLearnMore}
          hasAccount={hasAccount}
        />
      )}

      {currentView === "onboarding" && (
        <div className="min-h-screen bg-background">
          <div className="absolute top-4 left-4">
            <button
              onClick={handleBackToMarketing}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              ← Back to Home
            </button>
          </div>
          <OnboardingFlow
            step={onboardingStep}
            onStepChange={setOnboardingStep}
            onComplete={handleOnboardingComplete}
            isModal={false}
          />
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Sign In to MidKey</h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <LoginPage onLogin={handleLogin} isModal={true} />
            </div>
          </div>
        </div>
      )}

      {authState === "verifying" && <LoadingModal />}

      {currentView === "consent" && consentApp && (
        <ConsentModal app={consentApp} onApprove={handleConsentApprove} onDeny={handleConsentDeny} />
      )}

      {authState === "logged-in" && (
        <>
          {currentView === "dashboard" && (
            <Dashboard
              user={user}
              onLogout={handleLogout}
              onNavigate={handleNavigation}
              userType={userType}
              onToggleUserType={toggleUserType}
              onConsentRequest={handleConsentRequest}
              onLearnMore={handleLearnMore}
            />
          )}
          {currentView === "connected-apps" && (
            <ConnectedApps user={user} onLogout={handleLogout} onNavigate={handleNavigation} />
          )}
          {currentView === "admin-portal" && (
            <AdminPortal user={user} onLogout={handleLogout} onNavigate={handleNavigation} />
          )}
          {currentView === "certificates" && (
            <Certificates user={user} onLogout={handleLogout} onNavigate={handleNavigation} />
          )}
          {currentView === "pricing" && <Pricing user={user} onLogout={handleLogout} onNavigate={handleNavigation} />}
          {currentView === "documentation" && (
            <Documentation user={user} onLogout={handleLogout} onNavigate={handleNavigation} />
          )}
        </>
      )}
    </main>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  LogOut,
  ArrowLeft,
  FileText,
  Award,
  CheckCircle,
  Download,
  Share2,
  Eye,
  Calendar,
  Building,
  GraduationCap,
  CreditCard,
  Copy,
  ExternalLink,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface CertificatesProps {
  user: string | null
  onLogout: () => void
  onNavigate: (view: "dashboard" | "connected-apps" | "admin-portal" | "certificates") => void
}

export function Certificates({ user, onLogout, onNavigate }: CertificatesProps) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const certificates = [
    {
      id: "1",
      title: "Professional Developer Certificate",
      issuer: "TechCorp Academy",
      issueDate: "2024-01-15",
      expiryDate: "2026-01-15",
      status: "verified",
      type: "professional",
      description: "Certified full-stack developer with expertise in modern web technologies",
      verificationHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      icon: GraduationCap,
    },
    {
      id: "2",
      title: "Identity Verification Certificate",
      issuer: "SecureID Solutions",
      issueDate: "2024-02-20",
      expiryDate: "2025-02-20",
      status: "verified",
      type: "identity",
      description: "Government-backed identity verification with biometric authentication",
      verificationHash: "0x9876543210fedcba0987654321abcdef",
      icon: Shield,
    },
    {
      id: "3",
      title: "Financial Credit Score Certificate",
      issuer: "CreditMax Bureau",
      issueDate: "2024-03-10",
      expiryDate: "2024-09-10",
      status: "expiring",
      type: "financial",
      description: "Verified credit score and financial standing certificate",
      verificationHash: "0xabcdef1234567890fedcba0987654321",
      icon: CreditCard,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-success/10 text-success border-success/20"
      case "expiring":
        return "bg-warning/10 text-warning border-warning/20"
      case "expired":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "professional":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "identity":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "financial":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const handleViewCertificate = (cert: any) => {
    console.log("[v0] Viewing certificate:", cert.title)
    // In a real app, this would open a detailed view modal
    alert(
      `Viewing ${cert.title}\n\nIssuer: ${cert.issuer}\nStatus: ${cert.status}\nExpires: ${new Date(cert.expiryDate).toLocaleDateString()}`,
    )
  }

  const handleExportCertificate = (cert: any) => {
    console.log("[v0] Exporting certificate:", cert.title)
    // In a real app, this would generate and download a PDF or JSON file
    const certData = {
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
      verificationHash: cert.verificationHash,
      status: cert.status,
    }
    const blob = new Blob([JSON.stringify(certData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cert.title.replace(/\s+/g, "_")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareProof = (cert: any) => {
    console.log("[v0] Sharing proof for certificate:", cert.title)
    // In a real app, this would generate a zero-knowledge proof
    const proofUrl = `https://midkey.app/verify/${cert.verificationHash}`
    if (navigator.share) {
      navigator.share({
        title: `Verify ${cert.title}`,
        text: `Verify my ${cert.title} credential`,
        url: proofUrl,
      })
    } else {
      navigator.clipboard.writeText(proofUrl)
      alert("Verification link copied to clipboard!")
    }
  }

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleVerifyOnBlockchain = (cert: any) => {
    console.log("[v0] Verifying on blockchain:", cert.verificationHash)
    // In a real app, this would open a blockchain explorer
    window.open(`https://etherscan.io/tx/${cert.verificationHash}`, "_blank")
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Back Button */}
            <div className="flex items-center space-x-4">
              <Button onClick={() => onNavigate("dashboard")} variant="ghost" size="sm" className="hover:bg-muted">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground hidden sm:inline">MidKey</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm text-muted-foreground hidden md:inline">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Verifiable Certificates</h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Manage your digital credentials and share verified proofs with zero-knowledge privacy.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">3</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">2</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Verified Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-warning" />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">1</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Expiring Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your Certificates</h2>

            <div className="space-y-4">
              {certificates.map((cert) => {
                const IconComponent = cert.icon
                return (
                  <Card key={cert.id} className="hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                              <CardTitle className="text-base sm:text-lg break-words">{cert.title}</CardTitle>
                              <div className="flex flex-wrap gap-2">
                                <Badge className={getStatusColor(cert.status)}>
                                  {cert.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                                </Badge>
                                <Badge variant="outline" className={getTypeColor(cert.type)}>
                                  {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Building className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span className="truncate">{cert.issuer}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <CardDescription className="text-xs sm:text-sm">{cert.description}</CardDescription>
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-2 flex-shrink-0">
                          <div className="hidden lg:flex items-center space-x-3">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleViewCertificate(cert)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareProof(cert)}
                              className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 font-medium px-4"
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Proof
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-muted/80 px-3">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => handleExportCertificate(cert)}>
                                  <Download className="h-4 w-4 mr-3" />
                                  <span className="text-sm">Export Certificate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleVerifyOnBlockchain(cert)}>
                                  <ExternalLink className="h-4 w-4 mr-3" />
                                  <span className="text-sm">Verify on Blockchain</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex lg:hidden items-center space-x-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleViewCertificate(cert)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 py-2 h-9"
                            >
                              <Eye className="h-4 w-4 mr-1.5" />
                              <span className="text-sm">View</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareProof(cert)}
                              className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 font-medium px-3 py-2 h-9"
                            >
                              <Share2 className="h-4 w-4 mr-1.5" />
                              <span className="text-sm">Share</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-muted/80 px-2.5 py-2 h-9">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem onClick={() => handleExportCertificate(cert)} className="py-3">
                                  <Download className="h-4 w-4 mr-3" />
                                  <span className="text-sm">Export Certificate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleVerifyOnBlockchain(cert)} className="py-3">
                                  <ExternalLink className="h-4 w-4 mr-3" />
                                  <span className="text-sm">Verify on Blockchain</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Verification Hash</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-muted-foreground font-mono truncate">
                                {cert.verificationHash}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 flex-shrink-0"
                                onClick={() => handleCopyHash(cert.verificationHash)}
                              >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy hash</span>
                              </Button>
                              {copiedHash === cert.verificationHash && (
                                <span className="text-xs text-success">Copied!</span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/5 border-primary/20 hover:border-primary/40 flex-shrink-0 font-medium px-4 py-2 bg-transparent"
                            onClick={() => handleVerifyOnBlockchain(cert)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Verify on Blockchain</span>
                            <span className="sm:hidden">Verify</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* How It Works Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">How Zero-Knowledge Certificate Sharing Works</CardTitle>
              <CardDescription>Share verified credentials without revealing sensitive information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">1. Generate Proof</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Create a zero-knowledge proof of your certificate without revealing the actual data
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">2. Share Securely</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Share the proof with third parties while keeping your personal information private
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">3. Instant Verification</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Recipients can verify your credentials instantly without accessing sensitive data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

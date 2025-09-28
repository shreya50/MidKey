import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})


export const metadata = {
  title: "MidKey - The Future of Secure Login",
  description: "Sign in seamlessly and privately with the power of zero-knowledge proofs.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen geometric-bg">{children}</body>
    </html>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"

export default function ClientLoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication - in real app, this would be an API call
    if (credentials.username === "admin" && credentials.password === "pvcpipes2024") {
      localStorage.setItem("client-authenticated", "true")
      router.push("/client")
    } else {
      setError("Invalid credentials. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Card className="w-full max-w-md border-teal-200 dark:border-green-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-teal-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-teal-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl text-teal-600 dark:text-green-400">Client Portal</CardTitle>
          <p className="text-gray-600 dark:text-gray-300">Sign in to manage your PVC products</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="pl-10 border-teal-200 dark:border-green-800"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 border-teal-200 dark:border-green-800"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-green-600 dark:hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-teal-50 dark:bg-green-950 rounded-lg">
            <p className="text-sm text-teal-700 dark:text-green-300 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-teal-600 dark:text-green-400">Username: admin</p>
            <p className="text-xs text-teal-600 dark:text-green-400">Password: pvcpipes2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

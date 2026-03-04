'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { registerAction } from '@/app/actions/auth-actions'

export default function SecretRegisterPage() {
  const router = useRouter()
  const params = useParams()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [validToken, setValidToken] = useState(false)

  useEffect(() => {
    // Verify token
    const token = params.token as string
    fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setValidToken(true)
          setChecking(false)
        } else {
          router.push('/login')
        }
      })
      .catch(() => router.push('/login'))
  }, [params.token, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('token', params.token as string)
    
    const result = await registerAction(null, formData)

    if (result.success && result.message) {
      setSuccess(result.message)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else if (result.message) {
      setError(result.message)
    }
    
    setLoading(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Verifying access...</div>
      </div>
    )
  }

  if (!validToken) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Registration</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Buat akun baru dengan akses khusus
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Role</option>
                <option value="CEO">CEO - Chief Executive Officer</option>
                <option value="MANAGER">Manager</option>
                <option value="SEKRETARIS">Sekretaris</option>
                <option value="BENDAHARA">Bendahara</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

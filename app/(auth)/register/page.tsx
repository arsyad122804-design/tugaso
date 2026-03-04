'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { registerAction } from '@/app/actions/auth-actions'

// Komponen Bulan Sabit Ramadhan
const CrescentMoon = () => (
  <div className="absolute top-10 right-10 animate-moon-glow">
    <svg viewBox="0 0 100 100" className="w-32 h-32">
      <defs>
        <radialGradient id="moonGlowRegister">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#moonGlowRegister)" />
      <path 
        d="M 50 10 A 40 40 0 1 0 50 90 A 35 35 0 1 1 50 10" 
        fill="#FEF08A"
        className="drop-shadow-2xl"
      />
      <path 
        d="M 75 25 L 77 30 L 82 30 L 78 33 L 80 38 L 75 35 L 70 38 L 72 33 L 68 30 L 73 30 Z" 
        fill="#FEF08A"
        className="animate-twinkle"
      />
    </svg>
  </div>
)

// Komponen Bintang
const Star = ({ delay = 0, left = '10%', top = '20%', size = 'small' }: { 
  delay?: number; 
  left?: string; 
  top?: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  const sizeClass = size === 'large' ? 'w-6 h-6' : size === 'medium' ? 'w-4 h-4' : 'w-3 h-3'
  
  return (
    <div 
      className={`absolute ${sizeClass} animate-twinkle`}
      style={{ 
        left, 
        top,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="#FEF08A" className="drop-shadow-lg">
        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
      </svg>
    </div>
  )
}

// Komponen Masjid Siluet dengan Lampu
const MosqueSilhouette = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
    <svg viewBox="0 0 800 250" className="w-full h-64">
      <defs>
        <radialGradient id="lampGlowRegister">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <ellipse cx="400" cy="160" rx="25" ry="35" fill="url(#lampGlowRegister)" className="animate-lamp-flicker" />
      <ellipse cx="300" cy="180" rx="20" ry="30" fill="url(#lampGlowRegister)" className="animate-lamp-flicker" style={{ animationDelay: '0.5s' }} />
      <ellipse cx="500" cy="180" rx="20" ry="30" fill="url(#lampGlowRegister)" className="animate-lamp-flicker" style={{ animationDelay: '1s' }} />
      
      <ellipse cx="400" cy="130" rx="70" ry="50" fill="#0f172a" />
      <rect x="360" y="130" width="80" height="120" fill="#0f172a" />
      
      <rect x="385" y="150" width="12" height="25" fill="#FEF08A" className="animate-window-light" />
      <rect x="403" y="150" width="12" height="25" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.3s' }} />
      <rect x="385" y="185" width="12" height="25" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.6s' }} />
      <rect x="403" y="185" width="12" height="25" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.9s' }} />
      
      <rect x="240" y="90" width="40" height="160" fill="#0f172a" />
      <ellipse cx="260" cy="90" rx="25" ry="20" fill="#0f172a" />
      <path d="M 260 70 L 252 90 L 268 90 Z" fill="#0f172a" />
      <path d="M 260 60 A 10 10 0 1 0 260 40 A 8 8 0 1 1 260 60" fill="#FEF08A" className="animate-moon-pulse" />
      <rect x="252" y="110" width="8" height="15" fill="#FEF08A" className="animate-window-light" />
      <rect x="252" y="140" width="8" height="15" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.4s' }} />
      <rect x="252" y="170" width="8" height="15" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.8s' }} />
      
      <rect x="520" y="90" width="40" height="160" fill="#0f172a" />
      <ellipse cx="540" cy="90" rx="25" ry="20" fill="#0f172a" />
      <path d="M 540 70 L 532 90 L 548 90 Z" fill="#0f172a" />
      <path d="M 540 60 A 10 10 0 1 0 540 40 A 8 8 0 1 1 540 60" fill="#FEF08A" className="animate-moon-pulse" style={{ animationDelay: '0.5s' }} />
      <rect x="532" y="110" width="8" height="15" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.2s' }} />
      <rect x="532" y="140" width="8" height="15" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.6s' }} />
      <rect x="532" y="170" width="8" height="15" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '1s' }} />
      
      <ellipse cx="300" cy="150" rx="50" ry="35" fill="#0f172a" />
      <rect x="270" y="150" width="60" height="100" fill="#0f172a" />
      <rect x="285" y="170" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.5s' }} />
      <rect x="300" y="170" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.8s' }} />
      <rect x="285" y="200" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.3s' }} />
      <rect x="300" y="200" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.7s' }} />
      
      <ellipse cx="500" cy="150" rx="50" ry="35" fill="#0f172a" />
      <rect x="470" y="150" width="60" height="100" fill="#0f172a" />
      <rect x="485" y="170" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.4s' }} />
      <rect x="500" y="170" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.9s' }} />
      <rect x="485" y="200" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.2s' }} />
      <rect x="500" y="200" width="10" height="20" fill="#FEF08A" className="animate-window-light" style={{ animationDelay: '0.6s' }} />
      
      <path d="M 400 110 A 12 12 0 1 0 400 86 A 10 10 0 1 1 400 110" fill="#FEF08A" className="animate-moon-pulse" style={{ animationDelay: '0.3s' }} />
    </svg>
  </div>
)

// Komponen Lampu Gantung
const HangingLamp = ({ delay = 0, left = '10%' }: { delay?: number; left?: string }) => (
  <div 
    className="absolute top-0 animate-lamp-swing"
    style={{ 
      left, 
      animationDelay: `${delay}s`,
    }}
  >
    <div className="relative">
      <div className="w-0.5 h-12 bg-yellow-700/50 mx-auto"></div>
      <div className="relative">
        <div className="absolute inset-0 w-16 h-20 bg-yellow-400/30 blur-xl rounded-full animate-lamp-glow"></div>
        <div className="relative w-16 h-20 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl border-2 border-yellow-700">
          <div className="absolute inset-2 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg"></div>
          <div className="absolute inset-3 bg-yellow-200 rounded-lg animate-lamp-flicker"></div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-800 rounded"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-800 rounded"></div>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-yellow-400/40 to-transparent blur-sm"></div>
      </div>
    </div>
  </div>
)

// Komponen Partikel Cahaya
const LightParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float-slow"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          background: `radial-gradient(circle, ${
            Math.random() > 0.5 ? '#FEF08A' : '#E0F2FE'
          }, transparent)`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
          opacity: 0.7
        }}
      />
    ))}
  </div>
)

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if already logged in
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.push('/dashboard')
        } else {
          setChecking(false)
        }
      })
      .catch(() => setChecking(false))
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-900 px-4 relative overflow-hidden">
      {/* Background Stars Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #FEF08A 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Bulan Sabit Ramadhan */}
      <CrescentMoon />

      {/* Bintang-bintang */}
      <Star delay={0} left="10%" top="15%" size="small" />
      <Star delay={0.5} left="20%" top="25%" size="medium" />
      <Star delay={1} left="15%" top="40%" size="small" />
      <Star delay={1.5} left="85%" top="20%" size="large" />
      <Star delay={2} left="90%" top="35%" size="small" />
      <Star delay={2.5} left="80%" top="50%" size="medium" />
      <Star delay={3} left="25%" top="60%" size="small" />
      <Star delay={3.5} left="70%" top="65%" size="small" />
      <Star delay={4} left="50%" top="10%" size="medium" />

      {/* Lampu-lampu Gantung Masjid */}
      <HangingLamp delay={0} left="8%" />
      <HangingLamp delay={0.3} left="18%" />
      <HangingLamp delay={0.6} left="28%" />
      <HangingLamp delay={0.9} left="72%" />
      <HangingLamp delay={1.2} left="82%" />
      <HangingLamp delay={1.5} left="92%" />

      {/* Siluet Masjid */}
      <MosqueSilhouette />

      {/* Partikel Cahaya */}
      <LightParticles />

      {/* Card Register */}
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-blue-400/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <div className="text-center text-4xl mb-2">📝</div>
          <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Registrasi Akun
          </CardTitle>
          <p className="text-center text-sm text-slate-600 font-medium">
            Ramadhan Mubarak 🌙
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Buat akun baru untuk perusahaan
          </p>
          <div className="flex justify-center gap-2 text-xl">
            <span>✨</span>
            <span>🕌</span>
            <span>✨</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md border border-green-200">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@perusahaan.com"
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-slate-700">
                Role / Jabatan
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">-- Pilih Role --</option>
                <option value="CEO">🎯 CEO - Chief Executive Officer</option>
                <option value="MANAGER">👔 Manager</option>
                <option value="SEKRETARIS">📋 Sekretaris</option>
                <option value="BENDAHARA">💰 Bendahara</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300" 
              disabled={loading}
            >
              {loading ? '⏳ Loading...' : '✨ Register'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes moon-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(254, 240, 138, 0.5));
            transform: rotate(0deg);
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(254, 240, 138, 0.8));
            transform: rotate(5deg);
          }
        }

        @keyframes moon-pulse {
          0%, 100% { 
            opacity: 0.8;
            filter: drop-shadow(0 0 5px rgba(254, 240, 138, 0.8));
          }
          50% { 
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(254, 240, 138, 1));
          }
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes lamp-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes lamp-glow {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.6;
          }
        }

        @keyframes lamp-flicker {
          0%, 100% { 
            opacity: 0.9;
          }
          50% { 
            opacity: 1;
          }
        }

        @keyframes window-light {
          0%, 100% { 
            opacity: 0.7;
            filter: drop-shadow(0 0 5px rgba(254, 240, 138, 0.5));
          }
          50% { 
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(254, 240, 138, 0.9));
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(15px);
            opacity: 0.8;
          }
        }
        
        .animate-moon-glow {
          animation: moon-glow 4s ease-in-out infinite;
        }

        .animate-moon-pulse {
          animation: moon-pulse 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-lamp-swing {
          animation: lamp-swing 4s ease-in-out infinite;
        }

        .animate-lamp-glow {
          animation: lamp-glow 2s ease-in-out infinite;
        }

        .animate-lamp-flicker {
          animation: lamp-flicker 3s ease-in-out infinite;
        }

        .animate-window-light {
          animation: window-light 2.5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

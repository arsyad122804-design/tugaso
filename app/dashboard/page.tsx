'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Sistem Manajemen Perusahaan & Investasi Saham</p>
        </div>

        {/* Main Menu - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Perusahaan */}
          <Link href="/dashboard/users">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Perusahaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-2">Total Karyawan</p>
                  <p className="text-4xl font-bold">4</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90">CEO</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90">Manager</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90">Sekretaris</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90">Bendahara</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-sm opacity-90">Kelola data karyawan dan struktur organisasi perusahaan</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Portfolio */}
          <Link href="/dashboard/portfolio">
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span>Portfolio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-2">Total Saham</p>
                  <p className="text-4xl font-bold">4</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm">Stock Value</span>
                    <span className="text-lg font-bold">Rp 581.1K</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm">Market Value</span>
                    <span className="text-lg font-bold">Rp 573.0K</span>
                  </div>
                  <div className="bg-red-500/40 backdrop-blur rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm">Unrealized P/L</span>
                    <span className="text-lg font-bold">-Rp 8.1K</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-sm opacity-90">Laporan keuangan lengkap profit & loss investasi saham</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Akun */}
          <Link href="/dashboard/profile">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Akun</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-2">Status Akun</p>
                  <p className="text-3xl font-bold">Aktif</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90 mb-1">Informasi Profil</p>
                    <p className="text-sm">Kelola data pribadi Anda</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90 mb-1">Foto Profil</p>
                    <p className="text-sm">Upload & update foto</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="text-xs opacity-90 mb-1">Keamanan</p>
                    <p className="text-sm">Ubah password & settings</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-sm opacity-90">Kelola informasi akun dan pengaturan profil Anda</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

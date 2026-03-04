'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OverviewPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Overview & Ringkasan Perusahaan</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Pendapatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 125.5M</p>
              <p className="text-sm opacity-80 mt-1">+12.5% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Jumlah Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-sm opacity-80 mt-1">+8.2% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3,456</p>
              <p className="text-sm opacity-80 mt-1">+15.3% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Produk Terjual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8,901</p>
              <p className="text-sm opacity-80 mt-1">+10.1% dari bulan lalu</p>
            </CardContent>
          </Card>
        </div>

        {/* Grafik Penjualan */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Grafik Penjualan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-t from-blue-50 to-transparent rounded-lg relative">
              <svg className="w-full h-full" viewBox="0 0 600 300">
                <polyline
                  points="0,250 50,220 100,200 150,180 200,160 250,140 300,120 350,100 400,90 450,80 500,70 550,60 600,50"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="4"
                />
                <polyline
                  points="0,250 50,220 100,200 150,180 200,160 250,140 300,120 350,100 400,90 450,80 500,70 550,60 600,50 600,300 0,300"
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Labels */}
                <text x="25" y="290" fontSize="12" fill="#666">Jan</text>
                <text x="125" y="290" fontSize="12" fill="#666">Feb</text>
                <text x="225" y="290" fontSize="12" fill="#666">Mar</text>
                <text x="325" y="290" fontSize="12" fill="#666">Apr</text>
                <text x="425" y="290" fontSize="12" fill="#666">Mei</text>
                <text x="525" y="290" fontSize="12" fill="#666">Jun</text>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Statistik Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📊 Statistik Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Penjualan Hari Ini</span>
                  <span className="text-xl font-bold text-blue-600">Rp 4.2M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Penjualan Minggu Ini</span>
                  <span className="text-xl font-bold text-green-600">Rp 28.5M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Penjualan Bulan Ini</span>
                  <span className="text-xl font-bold text-purple-600">Rp 125.5M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Rata-rata per Hari</span>
                  <span className="text-xl font-bold text-orange-600">Rp 4.1M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🏆 Produk Terlaris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div>
                    <p className="font-bold text-gray-800">Produk A</p>
                    <p className="text-sm text-gray-600">1,234 terjual</p>
                  </div>
                  <span className="text-2xl">🥇</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <div>
                    <p className="font-bold text-gray-800">Produk B</p>
                    <p className="text-sm text-gray-600">987 terjual</p>
                  </div>
                  <span className="text-2xl">🥈</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div>
                    <p className="font-bold text-gray-800">Produk C</p>
                    <p className="text-sm text-gray-600">765 terjual</p>
                  </div>
                  <span className="text-2xl">🥉</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

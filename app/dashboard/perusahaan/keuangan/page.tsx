'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function KeuanganPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Laporan Keuangan & Cash Flow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Pemasukan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 125.5M</p>
              <p className="text-sm opacity-80 mt-1">Bulan ini</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 78.2M</p>
              <p className="text-sm opacity-80 mt-1">Bulan ini</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Laba Bersih</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 47.3M</p>
              <p className="text-sm opacity-80 mt-1">Margin 37.7%</p>
            </CardContent>
          </Card>
        </div>

        {/* Laporan Laba Rugi */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Laporan Laba Rugi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Pendapatan Penjualan</span>
                  <span className="text-xl font-bold text-green-600">Rp 125,500,000</span>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Beban Operasional</span>
                  <span className="text-xl font-bold text-red-600">Rp 78,200,000</span>
                </div>
                <div className="ml-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">• Gaji Karyawan</span>
                    <span className="text-gray-700">Rp 45,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">• Biaya Operasional</span>
                    <span className="text-gray-700">Rp 18,500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">• Biaya Marketing</span>
                    <span className="text-gray-700">Rp 8,200,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">• Lain-lain</span>
                    <span className="text-gray-700">Rp 6,500,000</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-lg">Laba Bersih</span>
                  <span className="text-2xl font-bold text-blue-600">Rp 47,300,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow */}
        <Card>
          <CardHeader>
            <CardTitle>💵 Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Kas Masuk</p>
                  <p className="text-lg font-bold text-green-600">Rp 125,500,000</p>
                </div>
                <span className="text-3xl">💰</span>
              </div>
              <div className="p-3 bg-red-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Kas Keluar</p>
                  <p className="text-lg font-bold text-red-600">Rp 78,200,000</p>
                </div>
                <span className="text-3xl">💸</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Saldo Kas</p>
                  <p className="text-lg font-bold text-blue-600">Rp 47,300,000</p>
                </div>
                <span className="text-3xl">🏦</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

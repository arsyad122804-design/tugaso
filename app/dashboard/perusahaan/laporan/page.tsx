'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LaporanPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Laporan & Export Data</p>
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-xl transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">📄</span>
                <span>Download PDF</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90">Export laporan dalam format PDF</p>
              <button className="mt-4 w-full py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 font-semibold">
                Download PDF
              </button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <span>Export Excel</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90">Export data dalam format Excel</p>
              <button className="mt-4 w-full py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 font-semibold">
                Export Excel
              </button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">📈</span>
                <span>Grafik Performa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-90">Lihat grafik performa perusahaan</p>
              <button className="mt-4 w-full py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Lihat Grafik
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Laporan Tersedia */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Laporan Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Laporan Penjualan Bulanan</h3>
                    <p className="text-sm text-gray-600 mt-1">Maret 2024 • 456 transaksi</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      PDF
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Excel
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Laporan Keuangan</h3>
                    <p className="text-sm text-gray-600 mt-1">Laba Rugi & Cash Flow Maret 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      PDF
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Excel
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Laporan Stok Produk</h3>
                    <p className="text-sm text-gray-600 mt-1">125 produk • Update 15 Mar 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      PDF
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Excel
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Laporan Karyawan</h3>
                    <p className="text-sm text-gray-600 mt-1">Absensi & Gaji Maret 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      PDF
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grafik Performa */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Grafik Performa Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg relative">
              <svg className="w-full h-full" viewBox="0 0 600 250">
                <polyline
                  points="0,200 100,180 200,150 300,120 400,90 500,70 600,50"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="4"
                />
                <polyline
                  points="0,200 100,180 200,150 300,120 400,90 500,70 600,50 600,250 0,250"
                  fill="url(#gradientGreen)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

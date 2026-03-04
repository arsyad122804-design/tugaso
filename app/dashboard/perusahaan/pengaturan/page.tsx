'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PengaturanPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Pengaturan Perusahaan</p>
        </div>

        {/* Profil Perusahaan */}
        <Card>
          <CardHeader>
            <CardTitle>🏢 Profil Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
                  <input 
                    type="text" 
                    defaultValue="PT Sumber Rezeki"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="info@sumberrezeki.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                  <input 
                    type="tel" 
                    defaultValue="021-12345678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input 
                    type="url" 
                    defaultValue="www.sumberrezeki.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea 
                  rows={3}
                  defaultValue="Jl. Raya Bisnis No. 123, Jakarta Selatan 12345"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Simpan Perubahan
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Role & Akses Admin */}
        <Card>
          <CardHeader>
            <CardTitle>👥 Role & Akses Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">CEO</h3>
                    <p className="text-sm text-gray-600 mt-1">Full access ke semua fitur</p>
                  </div>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    Full Access
                  </span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Manager</h3>
                    <p className="text-sm text-gray-600 mt-1">Akses ke penjualan, produk, pelanggan, laporan</p>
                  </div>
                  <span className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
                    Manager Access
                  </span>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Sekretaris</h3>
                    <p className="text-sm text-gray-600 mt-1">Akses ke data pelanggan, transaksi, laporan</p>
                  </div>
                  <span className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">
                    Limited Access
                  </span>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Bendahara</h3>
                    <p className="text-sm text-gray-600 mt-1">Akses ke keuangan, laporan laba rugi, cash flow</p>
                  </div>
                  <span className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold">
                    Finance Access
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card>
          <CardHeader>
            <CardTitle>🔔 Pengaturan Notifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notifikasi Transaksi Baru</p>
                  <p className="text-sm text-gray-600">Terima notifikasi saat ada transaksi baru</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notifikasi Stok Rendah</p>
                  <p className="text-sm text-gray-600">Terima notifikasi saat stok produk menipis</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Notifikasi Laporan Harian</p>
                  <p className="text-sm text-gray-600">Terima ringkasan laporan setiap hari</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Simpan Pengaturan
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

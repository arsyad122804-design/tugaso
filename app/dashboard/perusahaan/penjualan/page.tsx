'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PenjualanPage() {
  const transaksi = [
    { id: 'TRX001', tanggal: '2024-03-15', pelanggan: 'PT Maju Jaya', total: 5200000, status: 'Lunas' },
    { id: 'TRX002', tanggal: '2024-03-15', pelanggan: 'CV Berkah', total: 3500000, status: 'Pending' },
    { id: 'TRX003', tanggal: '2024-03-14', pelanggan: 'UD Sejahtera', total: 7800000, status: 'Lunas' },
    { id: 'TRX004', tanggal: '2024-03-14', pelanggan: 'PT Sukses Mandiri', total: 4200000, status: 'Lunas' },
    { id: 'TRX005', tanggal: '2024-03-13', pelanggan: 'CV Makmur', total: 6100000, status: 'Pending' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Data Penjualan & Transaksi</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Penjualan Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 4.2M</p>
              <p className="text-sm opacity-80 mt-1">15 transaksi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Invoice Lunas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm opacity-80 mt-1">80% dari total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Invoice Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm opacity-80 mt-1">20% dari total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Transaksi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>💰 Daftar Transaksi</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                + Transaksi Baru
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">ID Transaksi</th>
                    <th className="py-3 px-4 text-left font-semibold">Tanggal</th>
                    <th className="py-3 px-4 text-left font-semibold">Pelanggan</th>
                    <th className="py-3 px-4 text-right font-semibold">Total</th>
                    <th className="py-3 px-4 text-center font-semibold">Status</th>
                    <th className="py-3 px-4 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transaksi.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-blue-600">{item.id}</td>
                      <td className="py-3 px-4">{item.tanggal}</td>
                      <td className="py-3 px-4">{item.pelanggan}</td>
                      <td className="py-3 px-4 text-right font-semibold">Rp {item.total.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Lunas' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium mr-2">
                          Invoice
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-medium">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Laporan Harian/Bulanan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📅 Laporan Harian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Senin, 15 Mar 2024</span>
                    <span className="text-lg font-bold text-blue-600">Rp 4.2M</span>
                  </div>
                  <p className="text-xs text-gray-600">15 transaksi • 45 produk terjual</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Minggu, 14 Mar 2024</span>
                    <span className="text-lg font-bold text-gray-600">Rp 3.8M</span>
                  </div>
                  <p className="text-xs text-gray-600">12 transaksi • 38 produk terjual</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Laporan Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Maret 2024</span>
                    <span className="text-lg font-bold text-green-600">Rp 125.5M</span>
                  </div>
                  <p className="text-xs text-gray-600">456 transaksi • 1,234 produk terjual</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Februari 2024</span>
                    <span className="text-lg font-bold text-gray-600">Rp 112.3M</span>
                  </div>
                  <p className="text-xs text-gray-600">398 transaksi • 1,089 produk terjual</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

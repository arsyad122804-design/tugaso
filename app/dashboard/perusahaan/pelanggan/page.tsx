'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PelangganPage() {
  const pelanggan = [
    { id: 1, nama: 'PT Maju Jaya', email: 'info@majujaya.com', telp: '021-1234567', transaksi: 45, total: 125000000, membership: 'Gold' },
    { id: 2, nama: 'CV Berkah', email: 'cv@berkah.com', telp: '021-7654321', transaksi: 32, total: 89000000, membership: 'Silver' },
    { id: 3, nama: 'UD Sejahtera', email: 'ud@sejahtera.com', telp: '021-9876543', transaksi: 28, total: 67000000, membership: 'Silver' },
    { id: 4, nama: 'PT Sukses Mandiri', email: 'info@sukses.com', telp: '021-5432109', transaksi: 15, total: 42000000, membership: 'Bronze' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Data Pelanggan & Customer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Gold Member</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">45</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-400 to-gray-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Silver Member</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">128</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Bronze Member</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">356</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>👥 Daftar Pelanggan</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                + Tambah Pelanggan
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Nama</th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-left font-semibold">Telepon</th>
                  <th className="py-3 px-4 text-center font-semibold">Transaksi</th>
                  <th className="py-3 px-4 text-right font-semibold">Total Belanja</th>
                  <th className="py-3 px-4 text-center font-semibold">Membership</th>
                  <th className="py-3 px-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelanggan.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.nama}</td>
                    <td className="py-3 px-4">{item.email}</td>
                    <td className="py-3 px-4">{item.telp}</td>
                    <td className="py-3 px-4 text-center font-semibold">{item.transaksi}x</td>
                    <td className="py-3 px-4 text-right font-semibold">Rp {item.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.membership === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                        item.membership === 'Silver' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {item.membership}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

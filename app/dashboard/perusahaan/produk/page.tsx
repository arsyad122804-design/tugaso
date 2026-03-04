'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProdukPage() {
  const produk = [
    { id: 1, nama: 'Produk A', kategori: 'Elektronik', stok: 150, harga: 250000, status: 'Tersedia' },
    { id: 2, nama: 'Produk B', kategori: 'Fashion', stok: 85, harga: 180000, status: 'Tersedia' },
    { id: 3, nama: 'Produk C', kategori: 'Makanan', stok: 12, harga: 45000, status: 'Stok Rendah' },
    { id: 4, nama: 'Produk D', kategori: 'Elektronik', stok: 0, harga: 320000, status: 'Habis' },
    { id: 5, nama: 'Produk E', kategori: 'Kesehatan', stok: 200, harga: 95000, status: 'Tersedia' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Manajemen Produk & Layanan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">125</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Stok Tersedia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8,450</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Stok Rendah</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Stok Habis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>📦 Daftar Produk</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                + Tambah Produk
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Nama Produk</th>
                  <th className="py-3 px-4 text-left font-semibold">Kategori</th>
                  <th className="py-3 px-4 text-right font-semibold">Stok</th>
                  <th className="py-3 px-4 text-right font-semibold">Harga</th>
                  <th className="py-3 px-4 text-center font-semibold">Status</th>
                  <th className="py-3 px-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produk.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.nama}</td>
                    <td className="py-3 px-4">{item.kategori}</td>
                    <td className="py-3 px-4 text-right font-semibold">{item.stok}</td>
                    <td className="py-3 px-4 text-right">Rp {item.harga.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Tersedia' ? 'bg-green-100 text-green-700' :
                        item.status === 'Stok Rendah' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium mr-2">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium">
                        Hapus
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

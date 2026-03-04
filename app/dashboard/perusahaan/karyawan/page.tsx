'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function KaryawanPage() {
  const karyawan = [
    { id: 1, nama: 'Ahmad Rizki', jabatan: 'CEO', email: 'ceo@sumberrezeki.com', gaji: 15000000, status: 'Aktif' },
    { id: 2, nama: 'Siti Nurhaliza', jabatan: 'Manager', email: 'manager@sumberrezeki.com', gaji: 10000000, status: 'Aktif' },
    { id: 3, nama: 'Budi Santoso', jabatan: 'Sekretaris', email: 'sekretaris@sumberrezeki.com', gaji: 7000000, status: 'Aktif' },
    { id: 4, nama: 'Dewi Lestari', jabatan: 'Bendahara', email: 'bendahara@sumberrezeki.com', gaji: 8000000, status: 'Aktif' },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">PT Sumber Rezeki</h1>
          <p className="text-gray-600 mt-2">Manajemen Tim & Karyawan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Karyawan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Hadir Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm opacity-80 mt-1">100%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Gaji</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp 40M</p>
              <p className="text-sm opacity-80 mt-1">Per bulan</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Cuti Bulan Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Karyawan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>👔 Data Karyawan</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                + Tambah Karyawan
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Nama</th>
                  <th className="py-3 px-4 text-left font-semibold">Jabatan</th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-right font-semibold">Gaji</th>
                  <th className="py-3 px-4 text-center font-semibold">Status</th>
                  <th className="py-3 px-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karyawan.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.nama}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {item.jabatan}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.email}</td>
                    <td className="py-3 px-4 text-right font-semibold">Rp {item.gaji.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium mr-2">
                        Detail
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-medium">
                        Absensi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Absensi & Gaji */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📅 Absensi Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {karyawan.map((item) => (
                  <div key={item.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{item.nama}</p>
                      <p className="text-xs text-gray-600">{item.jabatan}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">✓ Hadir 08:00</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💰 Ringkasan Gaji</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {karyawan.map((item) => (
                  <div key={item.id} className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{item.nama}</p>
                      <p className="text-xs text-gray-600">{item.jabatan}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600">Rp {item.gaji.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

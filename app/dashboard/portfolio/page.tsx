'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PortfolioPage() {
  // Data laporan keuangan
  const laporanRugi = [
    { 
      kategori: 'ACES - PT Aspirasi Hidup Indonesia', 
      avgPrice: 403, 
      marketPrice: 400, 
      lot: 400, 
      rugi: -1200,
      stockValue: 161200,
      marketValue: 160000
    },
    { 
      kategori: 'BRIS - Bank Syariah Indonesia', 
      avgPrice: 2420, 
      marketPrice: 2360, 
      lot: 100, 
      rugi: -6000,
      stockValue: 242000,
      marketValue: 236000
    },
    { 
      kategori: 'KAEF - Kimia Farma', 
      avgPrice: 520, 
      marketPrice: 515, 
      lot: 200, 
      rugi: -1000,
      stockValue: 104000,
      marketValue: 103000
    },
  ]

  const laporanProfit = [
    { 
      kategori: 'LABS - UBC Medical Indonesia', 
      avgPrice: 148, 
      marketPrice: 148, 
      lot: 500, 
      profit: 100,
      stockValue: 73900,
      marketValue: 74000
    },
  ]

  const totalRugi = laporanRugi.reduce((sum, item) => sum + item.rugi, 0)
  const totalProfit = laporanProfit.reduce((sum, item) => sum + item.profit, 0)
  const netProfit = totalProfit + totalRugi

  const totalStockValue = [...laporanRugi, ...laporanProfit].reduce((sum, item) => sum + item.stockValue, 0)
  const totalMarketValue = [...laporanRugi, ...laporanProfit].reduce((sum, item) => sum + item.marketValue, 0)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Laporan Keuangan Portfolio</h1>
            <p className="text-gray-600 mt-1">Ringkasan profit dan loss investasi saham</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">IHSG</p>
            <p className="text-2xl font-bold text-green-600">7,245.50 <span className="text-sm">+0.85%</span></p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">📉 Total Rugi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp {Math.abs(totalRugi / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">{laporanRugi.length} transaksi rugi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">📈 Total Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp {(totalProfit / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">{laporanProfit.length} transaksi profit</p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} text-white`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">💰 Net Profit/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{netProfit >= 0 ? '+' : ''}Rp {(netProfit / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">{netProfit >= 0 ? 'Untung' : 'Rugi'} bersih</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Laporan Rugi */}
          <Card className="border-l-4 border-red-500">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                📉 Laporan Rugi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {laporanRugi.map((item, idx) => (
                  <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{item.kategori}</h3>
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">RUGI</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Avg Price</p>
                        <p className="font-bold text-gray-800">Rp {item.avgPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Market Price</p>
                        <p className="font-bold text-gray-800">Rp {item.marketPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Lot</p>
                        <p className="font-bold text-gray-800">{item.lot} lot</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Selisih/Lot</p>
                        <p className="font-bold text-red-600">-Rp {(item.avgPrice - item.marketPrice).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t-2 border-red-300 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Total Rugi:</span>
                        <span className="text-2xl font-bold text-red-600">-Rp {Math.abs(item.rugi).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-red-600 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-lg font-bold">TOTAL RUGI:</span>
                    <span className="text-3xl font-bold">-Rp {Math.abs(totalRugi).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Laporan Profit */}
          <Card className="border-l-4 border-green-500">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                📈 Laporan Profit
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {laporanProfit.map((item, idx) => (
                  <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{item.kategori}</h3>
                      <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">PROFIT</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Avg Price</p>
                        <p className="font-bold text-gray-800">Rp {item.avgPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Market Price</p>
                        <p className="font-bold text-gray-800">Rp {item.marketPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Lot</p>
                        <p className="font-bold text-gray-800">{item.lot} lot</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-gray-600 text-xs">Selisih/Lot</p>
                        <p className="font-bold text-green-600">+Rp {(item.marketPrice - item.avgPrice).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t-2 border-green-300 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Total Profit:</span>
                        <span className="text-2xl font-bold text-green-600">+Rp {item.profit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-green-600 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-lg font-bold">TOTAL PROFIT:</span>
                    <span className="text-3xl font-bold">+Rp {totalProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Portfolio Lengkap */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Detail Portfolio Saham</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-3 text-left font-semibold text-gray-700">Stock</th>
                    <th className="py-3 px-3 text-center font-semibold text-gray-700">Lot</th>
                    <th className="py-3 px-3 text-right font-semibold text-gray-700">Avg Price</th>
                    <th className="py-3 px-3 text-right font-semibold text-gray-700">Stock Value</th>
                    <th className="py-3 px-3 text-right font-semibold text-gray-700">Market Price</th>
                    <th className="py-3 px-3 text-right font-semibold text-gray-700">Market Value</th>
                    <th className="py-3 px-3 text-right font-semibold text-gray-700">Unrealized</th>
                    <th className="py-3 px-3 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanRugi.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-red-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-gray-800">{item.kategori.split(' - ')[0]}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.lot}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{item.avgPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">{item.stockValue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{item.marketPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">{item.marketValue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold text-red-600">
                        {item.rugi.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                          RUGI
                        </span>
                      </td>
                    </tr>
                  ))}
                  {laporanProfit.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-green-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-gray-800">{item.kategori.split(' - ')[0]}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.lot}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{item.avgPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">{item.stockValue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{item.marketPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">{item.marketValue.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold text-green-600">
                        +{item.profit.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          PROFIT
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold text-gray-800">
                    <td colSpan={3} className="py-4 px-3 text-right text-lg">TOTAL:</td>
                    <td className="py-4 px-3 text-right text-lg">{totalStockValue.toLocaleString()}</td>
                    <td className="py-4 px-3"></td>
                    <td className="py-4 px-3 text-right text-lg">{totalMarketValue.toLocaleString()}</td>
                    <td className={`py-4 px-3 text-right text-lg font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netProfit >= 0 ? '+' : ''}{netProfit.toLocaleString()}
                    </td>
                    <td className="py-4 px-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Ringkasan */}
        <Card className="border-2 border-blue-500 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-xl">📊 Ringkasan Laporan Keuangan</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <p className="text-sm text-gray-600 mb-1">Total Transaksi Rugi</p>
                <p className="text-3xl font-bold text-red-600">{laporanRugi.length}</p>
                <p className="text-xl font-semibold text-red-600 mt-2">-Rp {Math.abs(totalRugi).toLocaleString()}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-1">Total Transaksi Profit</p>
                <p className="text-3xl font-bold text-green-600">{laporanProfit.length}</p>
                <p className="text-xl font-semibold text-green-600 mt-2">+Rp {totalProfit.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Total Portfolio</p>
                <p className="text-3xl font-bold text-blue-600">{laporanRugi.length + laporanProfit.length}</p>
                <p className="text-xl font-semibold text-blue-600 mt-2">Rp {totalStockValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl shadow-lg ${netProfit >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90 mb-1">Net Profit/Loss</p>
                  <p className="text-5xl font-bold">{netProfit >= 0 ? '+' : ''}Rp {netProfit.toLocaleString()}</p>
                  <p className="text-lg mt-2 opacity-90">Return: {((netProfit / totalStockValue) * 100).toFixed(2)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90 mb-1">Status</p>
                  <p className="text-4xl font-bold">{netProfit >= 0 ? '✅ UNTUNG' : '❌ RUGI'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
}

interface IHSGData {
  price: number
  change: number
  changePercent: number
}

export default function SahamPage() {
  const [ihsg, setIhsg] = useState<IHSGData>({ price: 7234.56, change: 45.23, changePercent: 0.63 })
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: 'BBCA', name: 'Bank Central Asia Tbk', price: 9875, change: 125, changePercent: 1.28, volume: '45234567' },
    { symbol: 'BBRI', name: 'Bank Rakyat Indonesia Tbk', price: 4520, change: -35, changePercent: -0.77, volume: '89456123' },
    { symbol: 'BMRI', name: 'Bank Mandiri Tbk', price: 6150, change: 75, changePercent: 1.23, volume: '67234890' },
    { symbol: 'TLKM', name: 'Telkom Indonesia Tbk', price: 3890, change: 45, changePercent: 1.17, volume: '34567234' },
    { symbol: 'ASII', name: 'Astra International Tbk', price: 5275, change: -50, changePercent: -0.94, volume: '23456789' },
    { symbol: 'UNVR', name: 'Unilever Indonesia Tbk', price: 2650, change: 25, changePercent: 0.95, volume: '12345678' },
    { symbol: 'BBNI', name: 'Bank Negara Indonesia Tbk', price: 4890, change: 60, changePercent: 1.24, volume: '45678901' },
    { symbol: 'GOTO', name: 'GoTo Gojek Tokopedia Tbk', price: 52, change: -2, changePercent: -3.70, volume: '234567890' },
    { symbol: 'BRIS', name: 'Bank Syariah Indonesia Tbk', price: 2420, change: 30, changePercent: 1.26, volume: '56789012' },
    { symbol: 'AMMN', name: 'Amman Mineral Internasional Tbk', price: 8750, change: 150, changePercent: 1.74, volume: '34567123' },
    { symbol: 'ADRO', name: 'Adaro Energy Indonesia Tbk', price: 3125, change: -25, changePercent: -0.79, volume: '78901234' },
    { symbol: 'INDF', name: 'Indofood Sukses Makmur Tbk', price: 6890, change: 90, changePercent: 1.32, volume: '23456123' },
  ])
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Fungsi untuk update harga saham dengan pergerakan random
  const updateStockPrices = () => {
    // Update IHSG
    setIhsg(prev => {
      const changePercent = (Math.random() - 0.5) * 2 // -1% sampai +1%
      const change = prev.price * (changePercent / 100)
      return {
        price: prev.price + change,
        change: prev.change + change,
        changePercent: prev.changePercent + changePercent
      }
    })

    // Update semua saham
    setStocks(prev => prev.map(stock => {
      const changePercent = (Math.random() - 0.5) * 3 // -1.5% sampai +1.5%
      const change = stock.price * (changePercent / 100)
      const newPrice = stock.price + change
      const newChange = stock.change + change
      const newChangePercent = stock.changePercent + changePercent
      const volumeChange = Math.floor(Math.random() * 1000000)
      
      return {
        ...stock,
        price: newPrice,
        change: newChange,
        changePercent: newChangePercent,
        volume: (parseInt(stock.volume) + volumeChange).toString()
      }
    }))

    setLastUpdate(new Date())
  }

  // Auto update setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      updateStockPrices()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pasar Saham</h1>

      {/* IHSG Card */}
      <Card className="mb-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">IHSG (Indeks Harga Saham Gabungan)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-bold mb-2">{(ihsg.price || 0).toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-semibold ${(ihsg.change || 0) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {(ihsg.change || 0) >= 0 ? '▲' : '▼'} {Math.abs(ihsg.change || 0).toFixed(2)}
                </span>
                <span className={`text-xl ${(ihsg.change || 0) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  ({(ihsg.changePercent || 0) >= 0 ? '+' : ''}{(ihsg.changePercent || 0).toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Update otomatis setiap 3 detik</p>
              <p className="text-xs opacity-60">{lastUpdate.toLocaleString('id-ID')}</p>
              <div className="mt-2 flex items-center justify-end gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Live</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saham Populer */}
      <Card>
        <CardHeader>
          <CardTitle>Saham Populer Indonesia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Kode</th>
                  <th className="py-3 px-4 text-left">Nama Perusahaan</th>
                  <th className="py-3 px-4 text-right">Harga</th>
                  <th className="py-3 px-4 text-right">Perubahan</th>
                  <th className="py-3 px-4 text-right">%</th>
                  <th className="py-3 px-4 text-right">Volume</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => {
                  const isProfit = stock.changePercent >= 0
                  return (
                    <tr key={stock.symbol} className="border-b hover:bg-gray-50 transition-all duration-300">
                      <td className="py-4 px-4 font-bold text-blue-600">{stock.symbol}</td>
                      <td className="py-4 px-4">{stock.name}</td>
                      <td className="py-4 px-4 text-right font-semibold transition-all duration-300">
                        Rp {stock.price.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </td>
                      <td className={`py-4 px-4 text-right font-semibold transition-all duration-300 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                        {isProfit ? '+' : ''}{stock.change.toFixed(2)}
                      </td>
                      <td className={`py-4 px-4 text-right font-bold transition-all duration-300 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                        {isProfit ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600 transition-all duration-300">
                        {parseInt(stock.volume).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isProfit ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs animate-pulse">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Naik
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-xs animate-pulse">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Turun
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Data harga saham bergerak real-time setiap 3 detik</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">LIVE TRADING</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchMultipleStocks, fetchIHSG, fetchStockNews } from '@/lib/stock-api'

export const revalidate = 60 // Revalidate setiap 60 detik

export default async function DashboardPage() {
  // Portfolio data (ini bisa disimpan di database per user)
  const portfolioData = [
    {
      no: 1,
      stock: 'ACES-PT Aspirasi Hidup Indonesia Tbk',
      symbol: 'ACES',
      lotBalance: 400,
      avgPrice: 403,
    },
    {
      no: 2,
      stock: 'BRIS-BANK SYARIAH INDONESIA Tbk',
      symbol: 'BRIS',
      lotBalance: 100,
      avgPrice: 2420,
    },
    {
      no: 3,
      stock: 'KAEF-KIMIA FARMA Tbk',
      symbol: 'KAEF',
      lotBalance: 200,
      avgPrice: 520,
    },
    {
      no: 4,
      stock: 'LABS-UBC MEDICAL INDONESIA Tbk',
      symbol: 'LABS',
      lotBalance: 500,
      avgPrice: 148,
    },
  ]

  // Fetch harga real-time dari API
  const symbols = portfolioData.map(p => p.symbol)
  const currentPrices = await fetchMultipleStocks(symbols)
  const ihsgData = await fetchIHSG()
  const newsData = await fetchStockNews()

  // Hitung portfolio dengan harga real-time
  const portfolio = portfolioData.map(item => {
    const marketPrice = currentPrices[item.symbol] || item.avgPrice
    const stockValue = item.lotBalance * item.avgPrice * 100 // 1 lot = 100 saham
    const marketValue = item.lotBalance * marketPrice * 100
    const unrealized = marketValue - stockValue

    return {
      ...item,
      marketPrice,
      stockValue,
      marketValue,
      unrealized
    }
  })

  const totalStockValue = portfolio.reduce((sum, item) => sum + item.stockValue, 0)
  const totalMarketValue = portfolio.reduce((sum, item) => sum + item.marketValue, 0)
  const totalUnrealized = totalMarketValue - totalStockValue

  const news = newsData.slice(0, 3).map((item: any) => ({
    title: item.title,
    time: new Date(item.pubDate).toLocaleDateString('id-ID'),
    category: 'Market'
  }))

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Saham Real-Time</h1>
            <p className="text-gray-600 mt-1">Data dari Yahoo Finance API • Update otomatis setiap 60 detik</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">IHSG</p>
            <p className={`text-2xl font-bold ${ihsgData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {ihsgData.price.toFixed(2)} <span className="text-sm">{ihsgData.change >= 0 ? '+' : ''}{ihsgData.changePercent.toFixed(2)}%</span>
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">💵 Total Nilai Portofolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp {(totalStockValue / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">Stock Value</p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${totalUnrealized >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">📊 Profit / Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUnrealized >= 0 ? '+' : ''}Rp {(totalUnrealized / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">{((totalUnrealized / totalStockValue) * 100).toFixed(2)}% return</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">🏦 Market Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Rp {(totalMarketValue / 1000).toFixed(1)}K</p>
              <p className="text-sm opacity-80 mt-1">Nilai pasar real-time</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>📊 Portfolio Saham (Real-Time)</span>
              <span className="text-xs text-green-600 animate-pulse">● Live</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 text-left font-semibold text-gray-600">Stock</th>
                    <th className="py-2 px-3 text-center font-semibold text-gray-600">Lot</th>
                    <th className="py-2 px-3 text-right font-semibold text-gray-600">Avg Price</th>
                    <th className="py-2 px-3 text-right font-semibold text-gray-600">Market Price</th>
                    <th className="py-2 px-3 text-right font-semibold text-gray-600">Market Value</th>
                    <th className="py-2 px-3 text-right font-semibold text-gray-600">Unrealized</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item) => (
                    <tr key={item.no} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-800">{item.symbol}</td>
                      <td className="py-3 px-3 text-center text-gray-700">{item.lotBalance}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{item.avgPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-gray-700 font-medium">{item.marketPrice.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">{item.marketValue.toLocaleString()}</td>
                      <td className={`py-3 px-3 text-right font-semibold ${
                        item.unrealized >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.unrealized >= 0 ? '+' : ''}{item.unrealized.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan={4} className="py-3 px-3 text-right text-gray-800">Total:</td>
                    <td className="py-3 px-3 text-right text-gray-800">{totalMarketValue.toLocaleString()}</td>
                    <td className={`py-3 px-3 text-right font-bold ${
                      totalUnrealized >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalUnrealized >= 0 ? '+' : ''}{totalUnrealized.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Berita Real-Time */}
        <Card>
          <CardHeader>
            <CardTitle>📰 Berita Saham Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {news.map((item: any, idx: number) => (
                <div key={idx} className="pb-3 border-b last:border-0 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

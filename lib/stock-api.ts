// Stock API Integration
// Menggunakan API publik untuk data saham Indonesia

export interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  lastUpdate: string
}

// Fungsi untuk fetch data saham real-time
export async function fetchStockPrice(symbol: string): Promise<number> {
  try {
    // Menggunakan Yahoo Finance API (free)
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.JK?interval=1d&range=1d`,
      { next: { revalidate: 60 } } // Cache 60 detik
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data')
    }

    const data = await response.json()
    const quote = data.chart.result[0].meta.regularMarketPrice
    
    return quote || 0
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error)
    return 0
  }
}

// Fungsi untuk fetch multiple stocks sekaligus
export async function fetchMultipleStocks(symbols: string[]): Promise<Record<string, number>> {
  try {
    const symbolsQuery = symbols.map(s => `${s}.JK`).join(',')
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolsQuery}`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch stocks data')
    }

    const data = await response.json()
    const quotes = data.quoteResponse.result

    const prices: Record<string, number> = {}
    quotes.forEach((quote: any) => {
      const symbol = quote.symbol.replace('.JK', '')
      prices[symbol] = quote.regularMarketPrice || 0
    })

    return prices
  } catch (error) {
    console.error('Error fetching multiple stocks:', error)
    return {}
  }
}

// Fungsi untuk fetch IHSG (Indeks Harga Saham Gabungan)
export async function fetchIHSG() {
  try {
    const response = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EJKSE?interval=1d&range=1d',
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch IHSG')
    }

    const data = await response.json()
    const meta = data.chart.result[0].meta
    
    return {
      price: meta.regularMarketPrice,
      change: meta.regularMarketChange,
      changePercent: meta.regularMarketChangePercent
    }
  } catch (error) {
    console.error('Error fetching IHSG:', error)
    return { price: 0, change: 0, changePercent: 0 }
  }
}

// Fungsi untuk fetch berita saham dari RSS feed
export async function fetchStockNews() {
  try {
    // Menggunakan RSS feed dari berbagai sumber berita saham
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.cnbcindonesia.com/market/rss',
      { next: { revalidate: 300 } } // Cache 5 menit
    )

    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await response.json()
    return data.items.slice(0, 5).map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

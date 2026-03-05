import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/session'
import { logoutAction } from '@/app/actions/auth-actions'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import AIAssistant from '@/components/AIAssistant'
import InstallPWA from '@/components/InstallPWA'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  if (!session) {
    redirect('/login')
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard Template</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Profile Avatar */}
              <div className="flex items-center gap-3">
                {profile?.fotoProfil ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm hover:border-blue-400 transition-colors">
                    <Image
                      src={profile.fotoProfil}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-2 border-gray-300 shadow-sm">
                    <span className="text-lg font-bold text-white">
                      {session.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{session.email}</span>
                  <span className="text-xs text-gray-500">{session.role}</span>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-300"></div>
              
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-64 bg-white border-r shadow-sm overflow-y-auto">
          <nav className="p-4 space-y-2 pb-24">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </a>

            {/* Perusahaan Menu */}
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Perusahaan</div>
              
              <a href="/dashboard/perusahaan/overview" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>📊 Overview</span>
              </a>
              
              <a href="/dashboard/perusahaan/penjualan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>💰 Data Penjualan</span>
              </a>
              
              <a href="/dashboard/perusahaan/produk" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>📦 Produk / Layanan</span>
              </a>
              
              <a href="/dashboard/perusahaan/pelanggan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>👥 Pelanggan</span>
              </a>
              
              <a href="/dashboard/perusahaan/keuangan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>💵 Keuangan</span>
              </a>
              
              <a href="/dashboard/perusahaan/karyawan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>👔 Tim / Karyawan</span>
              </a>
              
              <a href="/dashboard/perusahaan/laporan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>📄 Laporan</span>
              </a>
              
              <a href="/dashboard/perusahaan/pengaturan" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <span>⚙️ Pengaturan</span>
              </a>
            </div>

            <div className="border-t pt-2 mt-2"></div>

            <a href="/dashboard/portfolio" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Portfolio</span>
            </a>

            <a href="/dashboard/saham" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Saham</span>
            </a>
            
            <a href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </a>
            
            {(session.role === 'CEO' || session.role === 'MANAGER') && (
              <a href="/dashboard/users" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>User Management</span>
              </a>
            )}
          </nav>

          {/* Download Button - Fixed at Bottom */}
          <div className="fixed bottom-0 w-64 bg-white border-t border-r p-4">
            <button
              id="installButton"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Download Aplikasi</span>
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">Install untuk akses lebih cepat</p>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <AIAssistant />
      <script dangerouslySetInnerHTML={{
        __html: `
          let deferredPrompt;
          const installButton = document.getElementById('installButton');
          
          window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (installButton) {
              installButton.style.display = 'flex';
            }
          });
          
          if (installButton) {
            installButton.addEventListener('click', async () => {
              if (!deferredPrompt) {
                alert('Aplikasi sudah terinstall atau browser tidak support PWA');
                return;
              }
              
              deferredPrompt.prompt();
              const { outcome } = await deferredPrompt.userChoice;
              
              if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
              }
              
              deferredPrompt = null;
            });
          }
          
          window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            if (installButton) {
              installButton.style.display = 'none';
            }
          });
        `
      }} />
    </div>
  )
}

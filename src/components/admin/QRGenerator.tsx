'use client'
import { useState, useEffect } from 'react'

export default function QRGenerator({ menuUrl }: { menuUrl: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQR() {
      try {
        const QRCode = (await import('qrcode')).default
        const url = await QRCode.toDataURL(menuUrl, {
          width: 400, margin: 2, color: { dark: '#1c1917', light: '#ffffff' }, errorCorrectionLevel: 'H',
        })
        setQrDataUrl(url)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadQR()
  }, [menuUrl])

  function handleDownload() {
    const link = document.createElement('a')
    link.href = '/api/qr'
    link.download = 'menu-qr.png'
    link.click()
  }

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-64 h-64 border-2 border-dashed border-stone-200 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-stone-400 animate-pulse">Generating…</div>
        ) : qrDataUrl ? (
          <img src={qrDataUrl} alt="Menu QR Code" className="w-full h-full object-contain p-3" />
        ) : (
          <div className="text-stone-400">Failed to generate</div>
        )}
      </div>

      <div>
        <p className="text-sm text-stone-500 mb-1">Encodes this URL:</p>
        <code className="text-xs bg-stone-100 px-3 py-1.5 rounded-lg text-stone-700 break-all">{menuUrl}</code>
      </div>

      <button
        onClick={handleDownload}
        disabled={loading}
        className="bg-stone-900 hover:bg-stone-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        ⬇ Download QR Code (1200×1200 PNG)
      </button>

      <p className="text-xs text-stone-400">
        Update the Menu URL in <a href="/admin/settings" className="text-amber-600 hover:underline">Settings</a> to change what the QR code points to.
      </p>
    </div>
  )
}

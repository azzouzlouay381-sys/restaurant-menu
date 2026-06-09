import QRCode from 'qrcode'

export interface QROptions {
  url: string
  size?: number
  margin?: number
  color?: { dark: string; light: string }
}

export async function generateQRDataUrl(options: QROptions): Promise<string> {
  const { url, size = 400, margin = 2, color = { dark: '#1a1a1a', light: '#ffffff' } } = options
  return QRCode.toDataURL(url, { width: size, margin, color, errorCorrectionLevel: 'H' })
}

export async function generateQRBuffer(options: QROptions): Promise<Buffer> {
  const { url, size = 1200, margin = 4 } = options
  return QRCode.toBuffer(url, { width: size, margin, errorCorrectionLevel: 'H' }) as Promise<Buffer>
}

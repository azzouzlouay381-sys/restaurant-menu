'use client'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ToastType } from '@/hooks/useToast'

interface ToastItemProps {
  message: string
  type: ToastType
  onClose: () => void
}

export function ToastItem({ message, type, onClose }: ToastItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg text-sm font-medium animate-slide-up',
        type === 'success' && 'bg-green-600 text-white',
        type === 'error' && 'bg-red-600 text-white',
        type === 'info' && 'bg-gray-800 text-white'
      )}
    >
      {type === 'success' && <CheckCircle className="h-4 w-4 shrink-0" />}
      {type === 'error' && <XCircle className="h-4 w-4 shrink-0" />}
      {type === 'info' && <Info className="h-4 w-4 shrink-0" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: { id: string; message: string; type: ToastType }[]
  removeToast: (id: string) => void
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )
}

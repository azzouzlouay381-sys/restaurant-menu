import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
  const restaurant = await prisma.restaurant.findFirst()
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Settings</h1>
        <p className="text-stone-500 text-sm mt-1">Update your restaurant information</p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-xl">
        <SettingsForm restaurant={restaurant} />
      </div>
    </div>
  )
}

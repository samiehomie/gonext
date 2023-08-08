import { Suspense } from 'react'
import TopBanner from '../index/topBanner'
import fetchJson from '@/lib/fetchJson'
import { queryTopBanners } from '@/lib/queries'
import type { users } from '@/types'
import IndexTopNavigation from '../index/indexTopNavigation'
import NavigationFallback from '@/components/navigations/navigationFallback'

export default async function TopNavigationContainer() {
  const banners = await fetchJson<users>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users?` + queryTopBanners
  )
  return (
    <>
      <div className="overflow-y-auto overflow-x-auto">
        <Suspense fallback={<div className="w-full h-[60px] bg-[#F2F2F4]" />}>
          <TopBanner banners={banners} />
        </Suspense>
      </div>
      <Suspense fallback={<NavigationFallback />}>
        <IndexTopNavigation />
      </Suspense>
    </>
  )
}

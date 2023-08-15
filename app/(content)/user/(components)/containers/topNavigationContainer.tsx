import { Suspense } from 'react'
import { user } from '@/types'
import TopNavigation from '@/components/navigations/topNavigation'
import TopProfile from '../../(components)/topProfile'

export default async function TopNavigationContainer({
  userData
}: {
  userData: user
}) {
  
  return (
    <Suspense fallback={<div className="bg-[#f8f8f8] h-[120px] relative" />}>
      <TopNavigation isBlack={true}>
        <TopProfile userData={userData} />
      </TopNavigation>
    </Suspense>
  )
}

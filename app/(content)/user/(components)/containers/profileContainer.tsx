import { Suspense } from 'react'
import Profile from '@/app/(content)/user/(components)/profile'
import { user } from '@/types'

export default async function ProfileContainer({ userData }: { userData: user }) {
  return (
    <Suspense
      fallback={
        <div className="w-[700px] relative pt-[35px] mx-auto mb-[97px] bg-white" />
      }
    >
      <Profile userData={userData} />
    </Suspense>
  )
}

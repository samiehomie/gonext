import IndexContainer from '@/app/(index)/(components)/index/indexContainer'
import IndexFooter from '@/app/(index)/(components)/index/indexFooter'
import SwrProvider from '@/components/swrProvider'

export default function Page() {
  return (
    <SwrProvider>
      <IndexContainer />
      <IndexFooter />
    </SwrProvider>
  )
}

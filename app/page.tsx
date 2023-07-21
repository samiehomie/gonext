import IndexContainer from '@/components/index/indexContainer'
import IndexFooter from '@/components/index/indexFooter'
import SwrProvider from '@/components/swrProvider'

export default function Page() {
  return (
    <SwrProvider>
      <IndexContainer />
      <IndexFooter />
    </SwrProvider>
  )
}

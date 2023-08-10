import IndexContainer from '@/app/(index)/(components)/index/indexContainer'
import IndexFooter from '@/app/(index)/(components)/index/indexFooter'
import WritersWeekly from './(components)/index/writersWeekly'
import Keywords from './(components)/index/keywords'
import TopNavigationContainer from './(components)/containers/topNavigationContainer'
import TopContentContainer from './(components)/containers/topContentContainer'
import SwrProvider from '@/components/swrProvider'
import RecommendContainer from './(components)/containers/recommendContainer'

export default function Page() {
  return (
    <SwrProvider>
      <TopNavigationContainer />
      <IndexContainer>
        <>
          <TopContentContainer />
          {/* <Keywords /> */}
          <WritersWeekly />
          <RecommendContainer />
          <IndexFooter />
        </>
      </IndexContainer>
    </SwrProvider>
  )
}

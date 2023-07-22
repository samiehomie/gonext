import Form from './form'
import TopNavigation from '@/components/navigations/topNavigation'

export default function MyComponent() {
  return (
    <div className="w-[1000px] m-auto">
      <TopNavigation inBookPage={true}>
        <div>write</div>
      </TopNavigation>
      <Form />
    </div>
  )
}

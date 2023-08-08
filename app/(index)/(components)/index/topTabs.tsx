'use client'

export default function TopTabs({ tags }: { tags: string[] }) {
  return (
    <div className="mt-[43px] text-center">
      {tags.map((tag, i) => (
        <button
          id={`button-${i}`}
          key={i}
          onClick={() => {
            const tabs = Array.from(
              document.querySelectorAll<HTMLElement>('[id^="tab-"]')
            )
            const buttons = Array.from(
              document.querySelectorAll<HTMLElement>('[id^="button-"]')
            )
            const merged = tabs.map((item, index) => [item, buttons[index]])
            merged.forEach(([tab, button]) => {
              console.log(tab.id, button.id)
              if (tab.id === `tab-${i}`) {
                tab.style.display = 'block'
                button.style.borderColor = '#00c6be'
                button.style.color = '#00c6be'
              } else {
                tab.style.display = 'none'
                button.style.borderColor = '#eee'
                button.style.color = '#959595'
              }
            })
          }}
          type="button"
          className={`bg-white border rounded-[25px] inline-block mx-[2px]
              font-noto_sans_demlight text-[15px] leading-[18px] 
              overflow-hidden p-[7px_16px_6px] outline-none cursor-pointer
            ${
              i === 0
                ? 'text-[#00c6be] border-[#00c6be]'
                : 'text-[#959595] border-[#eee]'
            }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

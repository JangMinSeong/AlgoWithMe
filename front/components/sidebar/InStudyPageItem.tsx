'use client'
import { useState } from 'react'
import ItemModifier from './ItemModifier'

interface IPage {
  id: number
  desc: string
  type: string
  subPages: IPage[] | undefined
}

const InStudyPageItem = (props: { page: IPage; depth: number }) => {
  const [isSubPagesOpen, setIsSubPagesOpen] = useState(false)
  const handleSubPageOpen = () => {
    setIsSubPagesOpen(!isSubPagesOpen)
  }
  const menuItemWrapper =
    'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center text-xs'

  const pl = props.depth * 10

  const [isModifierShowing, setIsModifierShowing] = useState(false)
  const handleShowModifier = () => {
    setIsModifierShowing(true)
  }
  const handleUnShowModifier = () => {
    setIsModifierShowing(false)
  }
  return (
    <div style={{ paddingLeft: pl }}>
      <div
        onClick={handleSubPageOpen}
        className={menuItemWrapper}
        onMouseOver={handleShowModifier}
        onMouseOut={handleUnShowModifier}
      >
        <div style={{ width: 192 - pl }} className="truncate ">
          {props.page.desc}
        </div>
        {isModifierShowing && <ItemModifier />}
      </div>
      {props.page.subPages !== undefined &&
        isSubPagesOpen &&
        props.page.subPages.map((el) => (
          <div>
            <InStudyPageItem page={el} key={el.id} depth={props.depth + 1} />
          </div>
        ))}
    </div>
  )
}

export default InStudyPageItem

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSidebar from '@/hooks/useSidebar'
import DeleteButton from './DeleteButton'
import PageCreateButton from './PageCreateButton'

interface IPage {
  pageId: number
  title: string
  docs: boolean
  children: IPage[] | undefined
}

const InStudyPageItem = (props: {
  groupId: number
  page: IPage
  depth: number
}) => {
  const router = useRouter()
  const [isSubPagesOpen, setIsSubPagesOpen] = useState(false)
  const { setPId } = useSidebar()
  const handleSubPageOpen = () => {
    setIsSubPagesOpen(!isSubPagesOpen)
    setPId(props.page.pageId)
    if (props.page.docs)
      router.push(`/${props.groupId}/docs/${props.page.pageId}`)
    else router.push(`/${props.groupId}/editor/${props.page.pageId}`)
  }
  const menuItemWrapper =
    'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center text-sm'

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
          {props.page.title ? props.page.title : '빈 페이지'}
        </div>
        {isModifierShowing && (
          <div className="flex items-center">
            {props.page.docs && (
              <PageCreateButton
                pageId={props.page.pageId}
                groupId={props.groupId}
              />
            )}
            <DeleteButton />
          </div>
        )}
      </div>
      {props.page.children?.length !== 0 &&
        isSubPagesOpen &&
        props.page.children?.map((el) => (
          <div>
            <InStudyPageItem
              groupId={props.groupId}
              page={el}
              key={el.pageId}
              depth={props.depth + 1}
            />
          </div>
        ))}
    </div>
  )
}

export default InStudyPageItem

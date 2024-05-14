import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import StudyGroupNavigator from './StudyGroupNavigator'
import InStudyPageItem from './InStudyPageItem'
import fetch from '@/lib/fetch'
import useSidebar from '@/hooks/useSidebar.ts'
import { useEffect, useState } from 'react'
import useStudy from '@/hooks/useStudy'
import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '@/hooks/useWebSocket.ts'

interface Study {
  id: number
  name: string
  imageUrl: string
}

interface IPage {
  pageId: number
  title: string
  docs: boolean
  children: IPage[]
}

const SideBar = ({ groupId }: { groupId: number }) => {
  const navigate = useNavigate()
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const user = useSelector((state: RootState) => state.auth.user)
  const [studyList, setStudyList] = useState<Study[]>([])
  const menuItemWrapper =
    'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors  flex items-center text-sm'

  const studyUpdate = useSelector(
    (state: RootState) => state.socket.messageStudyUpdate,
  )
  const {handleEditName} = useStudy()

  const { setGId, setPages, setStudys } = useSidebar()

  const { connectToServer, sendUpdateMessage } = useWebSocket()

  useEffect(() => {
    connectToServer(groupId)
  }, [user, groupId])

  useEffect(() => {
    fetchStudyList()
  }, [user])

  const fetchStudyList = async () => {
    const response = await fetch(`/user/study`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const responseData = await response.json()
      setStudyList(responseData)
      setStudys(responseData)

      console.log(responseData)
    }
  }

  const fetchPageData = async () => {
    try {
      const response = await fetch(`/page/team/${groupId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPages(data.pageInfoList)
        console.log(data.pageInfoList)
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    if(studyUpdate.startsWith('"updateTitle')) {
      console.log("inttinetinewaitn aasaaaaa")

      fetchStudyList()
    }
    else {
      console.log(studyUpdate)
      console.log("asdasdasdawwwwwwwww")
      fetchPageData()
    }
  }, [studyUpdate])

  useEffect(() => {
    fetchPageData()
    setGId(groupId)
  }, [groupId])

  const { handleFetchStudyInfo } = useStudy()

  const handleGoStudyMain = () => {
    handleFetchStudyInfo(groupId)
    navigate(`/${groupId}/study`)
  }

  const movePage = async (draggedId, targetId) => {
    const isDescendant = (parent, childId) => {
      if (!parent.children) return false
      return parent.children.some(
        (child) => child.pageId === childId || isDescendant(child, childId),
      )
    }

    const deepCopyPages = (pages) =>
      pages.map((page) => ({
        ...page,
        children: page.children ? deepCopyPages(page.children) : [],
      }))

    const findPage = (pages, pageId, parent = null, index) => {
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].pageId === pageId) {
          return { page: pages[i], parent, index: index + 1 }
        }
        if (pages[i].children) {
          const result = findPage(pages[i].children, pageId, pages[i], 0)
          if (result.page) return result
        }
      }
      return { page: null, parent: null, index: 0 }
    }

    const updatePageList = async (pages, draggedPageId, targetPageId) => {
      let updatedPages = deepCopyPages(pages)
      const { page: draggedPage, parent: draggedParent } = findPage(
        updatedPages,
        draggedPageId,
        null,
        0,
      )
      const { page: targetPage, index: order } = findPage(
        updatedPages,
        targetPageId,
        null,
        0,
      )

      if (targetPage.children.some((child) => child.pageId === draggedPageId))
        return pages

      if (
        !targetPage ||
        !draggedPage ||
        !targetPage.docs ||
        isDescendant(draggedPage, targetPage.pageId)
      ) {
        console.error('Invalid operation: Move operation is not allowed.')
        return pages
      }

      if (!targetPage.children) {
        targetPage.children = []
      }
      targetPage.children.push(draggedPage)

      // Remove draggedPage from its old parent
      if (draggedParent && draggedParent.children) {
        draggedParent.children = draggedParent.children.filter(
          (child) => child.pageId !== draggedPageId,
        )
      }

      const dataToPut = {
        pageId: draggedPageId,
        parentPageId: targetPageId,
        order: order !== 0 ? order - 1 : 0,
      }
      try {
        const response = await fetch(`/page/position`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToPut),
        })

        if (!response.ok)
          throw new Error('Failed to update the parent on the server.')

        sendUpdateMessage(
          `/app/study/${groupId}`,
          `update${draggedPageId} to ${targetPageId}`,
        )

        return updatedPages
      } catch (error) {
        console.error('Error updating page parent:', error)
        return pages // 에러가 발생하면 원본 페이지 반환
      }
    }

    // 업데이트된 페이지 리스트로 상태 업데이트
    const updatedPageList = await updatePageList(pageList, draggedId, targetId)
    console.log(updatedPageList)
    setPages(updatedPageList)
  }

  return (
    <div>
      <div
        style={{
          maxWidth: '12rem',
          minWidth: '12rem',
        }}
        className="h-full mb-10 relative bg-white bg-opacity-50 rounded-lg transition-all duration-700"
      >
        <StudyGroupNavigator groupId={groupId} studyList={studyList} />
        <div onClick={handleGoStudyMain} className={menuItemWrapper}>
          스터디 메인 페이지
        </div>
        <div className={' h-full max-h-dvh overflow-auto'}>
          {pageList.map((el) => (
            <div>
              <InStudyPageItem
                groupId={groupId}
                page={el}
                key={el.pageId}
                depth={0}
                onMovePage={movePage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar

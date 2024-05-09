import { useDispatch } from 'react-redux'
import {
  viewPageList,
  addDocsPage,
  addProblemPage,
  deletePage,
} from '@/features/sidebar/pageSlice'
import fetch from '@/lib/fetch'

interface IPageState {
  pageId: number
  title: string
  docs: boolean
}

const usePages = (teamId: number) => {
  const dispatch = useDispatch()

  const handleViewPageList = async () => {
    await fetch(`/page/team/${teamId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        const newPageList = json.pageInfoList
        dispatch(viewPageList(newPageList))
      })
      .catch((err) => console.error(err))
  }

  // 팀 아이디와 상위 페이지 아이디를 입력하여, 페이지를 생성한다.
  const handleAddDocsPage = async (pageId: number) => {
    await fetch('/page/docs', {
      method: 'POST',
      body: {
        teamId,
        pageId,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch(addDocsPage(json.pageId))
      })
  }

  const handleAddProblemPage = (prop: IPageState) => {
    dispatch(addProblemPage(prop))
  }

  const handleDeletePage = (prop: number) => {
    dispatch(deletePage(prop))
  }

  return { handleViewPageList, handleAddPage, handleDeletePage }
}

export default usePages

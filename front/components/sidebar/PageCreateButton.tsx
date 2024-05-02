'use client'
import { LuFilePlus2 } from 'react-icons/lu'
import { usePathname } from 'next/navigation'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const PageCreateButton = () => {
  const pathname = usePathname()
  const groupId = pathname.split('/') // 해서 잘라야함
  // default : 문서 페이지 생성
  const handlePageCreate = async () => {
    try {
      await fetch(`${API_URL}/page/docs`, {
        method: 'GET',
        body: {
          group_id: groupId,
          parent_id: parentPageId, // 최상위 경우 null
        },
        credentials: 'include',
      })
    } catch (error) {
      console.error(error)
    }
  }
  return <LuFilePlus2 onClick={handlePageCreate} />
}

export default PageCreateButton

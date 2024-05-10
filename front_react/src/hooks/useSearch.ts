import { useDispatch } from 'react-redux'
import {
  setInitialPageSearchResult,
  //   setNextPageSearchResult,
  setIsLevel,
  setSearchTitle,
} from '@/features/search/searchSlice'
import fetch from '@/lib/fetch'

const useSearch = () => {
  const dispatch = useDispatch()

  const handleFetchResultByName = async (title, page) => {
    await fetch(`/problem/search?title=${title}&page=${page}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('요청한 페이지 정보 이름', json)
        dispatch(setInitialPageSearchResult(json))
        dispatch(setIsLevel(false))
        dispatch(setSearchTitle(title))
      })
      .catch((err) => console.error(err))
  }

  //   const handleFetchNextPageResultByName = (prop) => {
  //     dispatch(setNextPageSearchResult(prop))
  //   }

  const handleFetchResultByLevel = async (levels, page) => {
    await fetch(`/problem/search/tag?levels=${levels}&page=${page}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('요청한 페이지 정보 레벨', json)
        dispatch(setInitialPageSearchResult(json))
        dispatch(setIsLevel(true))
      })
      .catch((err) => console.error(err))
  }

  //   const handleFetchNextPageResultByLevel = (prop) => {
  //     dispatch(setNextPageSearchResult(prop))
  //   }

  return {
    handleFetchResultByName,
    // handleFetchNextPageResultByName,
    handleFetchResultByLevel,
    // handleFetchNextPageResultByLevel,
  }
}

export default useSearch

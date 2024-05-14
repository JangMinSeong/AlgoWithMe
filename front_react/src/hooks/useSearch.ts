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

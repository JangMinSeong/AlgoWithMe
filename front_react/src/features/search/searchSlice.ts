import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  resultCount: number
  page: number
  totalPages: number
  problemInfoList: Array<IProblemInfo>
  isLevel: boolean
  searchTitle: string
}

export interface IProblemInfo {
  problemId: number
  provider: string
  number: number
  title: string
  level: string
  url: string
}

const initialState: ISearchState = {
  resultCount: 0,
  page: 0,
  totalPages: 0,
  problemInfoList: [
    {
      problemId: 0,
      provider: '',
      number: 0,
      title: '',
      level: '',
      url: '',
    },
  ],
  isLevel: false,
  searchTitle: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInitialPageSearchResult: (
      state: ISearchState,
      action: PayloadAction<ISearchState>,
    ) => {
      state.resultCount = action.payload.resultCount
      state.page = 1
      state.totalPages = action.payload.totalPages
      state.problemInfoList = [...action.payload.problemInfoList]
    },
    setIsLevel: (state: ISearchState, action: PayloadAction<boolean>) => {
      state.isLevel = action.payload
    },
    setSearchTitle: (state: ISearchState, action: PayloadAction<string>) => {
      state.searchTitle = action.payload
    },
    // setNextPageSearchResult: (
    //   // to prefetch
    //   state: ISearchState,
    //   action: PayloadAction<ISearchState>,
    // ) => {
    //   state.page = state.page + 1
    //   state.problemInfoList = [...action.payload.problemInfoList]
    // },
  },
})

export const { setInitialPageSearchResult, setIsLevel, setSearchTitle } =
  searchSlice.actions
export default searchSlice.reducer

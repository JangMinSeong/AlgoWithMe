import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  resultCount: number
  page: number
  totalPages: number
  problemInfoList: Array<IProblemInfo>
  isLevel: boolean
  searchTitle: string
  chosenProblem: IProblemInfo
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
  chosenProblem: {
    problemId: 0,
    provider: '',
    number: 0,
    title: '',
    level: '',
    url: '',
  },
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
    setProblemChosen: (
      state: ISearchState,
      action: PayloadAction<IProblemInfo>,
    ) => {
      state.chosenProblem.problemId = action.payload.problemId
      state.chosenProblem.level = action.payload.level
      state.chosenProblem.number = action.payload.number
      state.chosenProblem.title = action.payload.title
      state.chosenProblem.provider = action.payload.provider
      state.chosenProblem.url = action.payload.url
    },
  },
})

export const {
  setInitialPageSearchResult,
  setIsLevel,
  setSearchTitle,
  setProblemChosen,
} = searchSlice.actions
export default searchSlice.reducer

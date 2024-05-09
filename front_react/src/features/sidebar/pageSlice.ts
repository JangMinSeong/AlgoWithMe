import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IPageState {
  pageId: number
  title: string
  docs: boolean
}

interface IProblemPageState {
  pageId: number
  site: string
  number: number
  title: string
  content: string
  exampleList: [
    {
      problem: string
      answer: string
    },
  ]
  editCodesList: [
    {
      language: string
      frameCode: string
    },
  ]
}

interface IPageListState {
  pageList: Array<IPageState | IProblemPageState>
}

const initialState: IPageListState = {
  pageList: [],
}

const pageListState = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    viewPageList: (
      state: IPageListState,
      action: PayloadAction<IPageListState>,
    ) => {
      state.pageList = [...action.payload.pageList]
    },
    addDocsPage: (state: IPageListState, action: PayloadAction<number>) => {
      const pageInfo = {
        pageId: action.payload,
        title: '',
        docs: true,
      }
      state.pageList.push(pageInfo)
    },
    addProblemPage: (
      state: IPageListState,
      action: PayloadAction<IProblemPageState>,
    ) => {
      state.pageList.push(action.payload)
    },
    deletePage: (state: IPageListState, action: PayloadAction<number>) => {
      state.pageList.filter((item) => item.pageId !== action.payload)
    },
  },
})

export const { viewPageList, addDocsPage, addProblemPage, deletePage } =
  pageListState.actions

export default pageListState.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IProblemState {
  problemList: IProblem[]
}

interface IProblem {
  id: number
  url: string
  provider: string
  number: number
  name: string
  level: string
}

const initialState = {
  problemList: [
    { id: 0, url: '', provider: '', number: 0, name: '', level: '' },
  ],
}

const problemSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    viewProblems(state: IProblemState, action: PayloadAction<IProblem[]>) {
      state.problemList = [...action.payload]
    },
  },
})

export const { viewProblems } = problemSlice.actions
export default problemSlice.reducer

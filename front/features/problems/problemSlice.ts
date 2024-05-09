import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IProblemState {
  problemList: IProblem[]
  chosen: IProblem
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
  chosen: { id: 0, url: '', provider: '', number: 0, name: '', level: '' },
}

const problemSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    viewProblems(state: IProblemState, action: PayloadAction<IProblem[]>) {
      state.problemList = [...action.payload]
    },
    setProblemChosen(state: IProblemState, action: PayloadAction<IProblem>) {
      state.chosen.id = action.payload.id
      state.chosen.level = action.payload.level
      state.chosen.name = action.payload.name
      state.chosen.number = action.payload.number
      state.chosen.provider = action.payload.provider
      state.chosen.url = action.payload.url
    },
  },
})

export const { viewProblems, setProblemChosen } = problemSlice.actions
export default problemSlice.reducer

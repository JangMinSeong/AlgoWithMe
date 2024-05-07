import { createSlice } from '@reduxjs/toolkit'

interface ISolvingState {
  isSolving: boolean
}

const initialState: ISolvingState = {
  isSolving: false,
}

const solvingSlice = createSlice({
  name: 'solving',
  initialState,
  reducers: {
    startSolving: (state: ISolvingState) => {
      state.isSolving = true
    },
    endSolving: (state: ISolvingState) => {
      state.isSolving = false
    },
  },
})

export const { startSolving, endSolving } = solvingSlice.actions
export default solvingSlice.reducer

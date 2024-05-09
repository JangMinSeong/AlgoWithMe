import { createSlice } from '@reduxjs/toolkit'

interface solvingState {
  isSolving: boolean
}

const initialState: solvingState = {
  isSolving: false,
}

const solvingSlice = createSlice({
  name: 'solving',
  initialState,
  reducers: {
    startSolving: (state: solvingState) => {
      state.isSolving = true
    },
    endSolving: (state: solvingState) => {
      state.isSolving = false
    },
  },
})

export const { startSolving, endSolving } = solvingSlice.actions
export default solvingSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITime } from './timerTypes'
interface timerState {
  hour: number
  min: number
}

const initialState: timerState = {
  hour: 0,
  min: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    changeTimer: (state: timerState, action: PayloadAction<ITime>) => {
      state.hour = action.payload.hour
      state.min = action.payload.min
    },
  },
})

export const { changeTimer } = timerSlice.actions

export default timerSlice.reducer

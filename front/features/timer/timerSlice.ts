import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITime } from './timerTypes'
interface ITimerState {
  hour: number
  min: number
}

const initialState: ITimerState = {
  hour: 0,
  min: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    changeTimer: (state: ITimerState, action: PayloadAction<ITime>) => {
      state.hour = action.payload.hour
      state.min = action.payload.min
    },
  },
})

export const { changeTimer } = timerSlice.actions

export default timerSlice.reducer

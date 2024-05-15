import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITime } from './timerTypes'
interface ITimerState {
  initialhour: number
  initialmin: number
  initialsec: number
  hour: number
  min: number
  sec: number
}

const initialState: ITimerState = {
  initialhour: 0,
  initialmin: 0,
  initialsec: 0,
  hour: 0,
  min: 0,
  sec: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state: ITimerState, action: PayloadAction<ITime>) => {
      state.initialhour = action.payload.hour
      state.initialmin = action.payload.min
      state.initialsec = action.payload.sec
    },
    changeTimer: (state: ITimerState, action: PayloadAction<ITime>) => {
      state.hour = action.payload.hour
      state.min = action.payload.min
      state.sec = action.payload.sec
    },
  },
})

export const { changeTimer, setTimer } = timerSlice.actions

export default timerSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import timerReducer from '../features/timer/timerSlice'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import solvingReducer from '@/features/solving/solvingSlice'

const rootReducer = combineReducers({
  timer: timerReducer,
  sidebar: sidebarReducer,
  solving: solvingReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

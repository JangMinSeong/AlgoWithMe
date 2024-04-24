import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import sidebarReducer from '@/features/sidebar/sidebarSlice'
import timerReducer from '@/features/timer/timerSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      sidebar: sidebarReducer,
      timer: timerReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

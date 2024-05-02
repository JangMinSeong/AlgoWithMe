import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import sidebarReducer from '@/features/sidebar/sidebarSlice'
import timerReducer from '@/features/timer/timerSlice'
import solvingReducer from '@/features/solving/solvingSlice'
import websocketReducer from '@/features/socket/webSocketSlic'
import groupcallReducer from '@/features/groupcall/groupcallSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      sidebar: sidebarReducer,
      timer: timerReducer,
      solving: solvingReducer,
      socket: websocketReducer,
      groupcall: groupcallReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

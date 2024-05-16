import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '@/features/auth/authSlice'
import sidebarReducer from '@/features/sidebar/sidebarSlice'
import timerReducer from '@/features/timer/timerSlice'
import solvingReducer from '@/features/solving/solvingSlice'
import websocketReducer from '@/features/socket/webSocketSlice.ts'
import callReducer from '@/features/groupcall/callSlice'
import modalReducer from '@/features/modal/modalSlice'
import levelReducer from '@/features/levels/levelSlice'
import studyReducer from '@/features/study/studySlice'
import userReducer from '@/features/user/userSlice'
import searchReducer from '@/features/search/searchSlice'
import codeReducer from '@/features/code/codeSlice'
import memberReducer from '@/features/study/memberSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isAuthenticated', 'user'],
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      sidebar: sidebarReducer,
      timer: timerReducer,
      solving: solvingReducer,
      socket: websocketReducer,
      call: callReducer,
      modal: modalReducer,
      levels: levelReducer,
      study: studyReducer,
      userInfo: userReducer,
      search: searchReducer,
      code: codeReducer,
      member: memberReducer,
    },
  })

  const persistor = persistStore(store)
  return { store, persistor }
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['store']['getState']>
export type AppDispatch = AppStore['store']['dispatch']

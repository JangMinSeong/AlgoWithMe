import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import authReducer from '@/features/auth/authSlice'
import sidebarReducer from '@/features/sidebar/sidebarSlice'
import timerReducer from '@/features/timer/timerSlice'
import solvingReducer from '@/features/solving/solvingSlice'
import websocketReducer from '@/features/socket/webSocketSlic'
import groupcallReducer from '@/features/groupcall/groupcallSlice'
import problemReducer from '@/features/problems/problemSlice'
import modalReducer from '@/features/modal/modalSlice'
import levelReducer from '@/features/levels/levelSlice'
import studyReducer from '@/features/study/studySlice'

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	whitelist: ['isAuthenticated', 'user']
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
			groupcall: groupcallReducer,
			problems: problemReducer,
			modal: modalReducer,
			levels: levelReducer,
			study: studyReducer,
		},
	})

	const persistor = persistStore(store)
	return { store, persistor }
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['store']['getState']>
export type AppDispatch = AppStore['store']['dispatch']

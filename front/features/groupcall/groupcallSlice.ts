import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, Publisher, Subscriber } from 'openvidu-browser'

interface IGroupcallState {
  mySessionId: string
  myUserName: string
  session: Session | undefined
  mainStreamManager: Publisher | Subscriber | undefined // publisher 또는 subscribers 중 한명임
  publisher: Publisher | undefined
  subscribers: Subscriber[]
  isMicOn: boolean
}

const initialState: IGroupcallState = {
  mySessionId: '',
  myUserName: '',
  session: undefined,
  mainStreamManager: undefined, // publisher 또는 subscribers 중 한명임
  publisher: undefined,
  subscribers: [],
  isMicOn: false,
}

const groupcallSlice = createSlice({
  name: 'groupcall',
  initialState,
  reducers: {
    setMySessionId(state, action: PayloadAction<string>) {
      state.mySessionId = action.payload
    },
    setMyUserName(state, action: PayloadAction<string>) {
      state.myUserName = action.payload
    },
    setSession(state, action: PayloadAction<Session>) {
      state.session = action.payload // 왜안됨
    },
    setMainStreamManager(state, action: PayloadAction<Publisher | Subscriber>) {
      state.mainStreamManager = action.payload
    },
    setPublisher(state, action: PayloadAction<Publisher>) {
      state.publisher = action.payload
    },
    setSubscribers(state, action: PayloadAction<Subscriber[]>) {
      state.subscribers = [...action.payload]
    },
    turnMicOff(state) {
      state.isMicOn = false
    },
    turnMicOn(state) {
      state.isMicOn = true
    },
  },
})

export const {
  setMySessionId,
  setMyUserName,
  setSession,
  setMainStreamManager,
  setPublisher,
  setSubscribers,
  turnMicOff,
  turnMicOn,
} = groupcallSlice.actions

export default groupcallSlice.reducer

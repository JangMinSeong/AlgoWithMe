import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, Publisher, Subscriber } from 'openvidu-browser'

interface IGroupcallState {
  mySessionId: string
  myUserName: string
  session: Session | undefined
  mainStreamManager: Publisher | Subscriber | undefined // publisher 또는 subscribers 중 한명임
  publisher: Publisher | undefined
  subscriber: Subscriber | undefined
  participants: []
  isMicOn: boolean
  isHeadphoneOn: boolean
}

const initialState: IGroupcallState = {
  mySessionId: '',
  myUserName: '',
  session: undefined,
  mainStreamManager: undefined, // publisher 또는 subscribers 중 한명임
  publisher: undefined,
  subscriber: undefined,
  participants: [],
  isMicOn: false,
  isHeadphoneOn: true,
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
    setSubscriber(state, action: PayloadAction<Subscriber>) {
      state.subscriber = action.payload
    },
    setParticipants(state, action: PayloadAction<[]>) {
      state.participants = [...action.payload]
    },
    turnMicOff(state) {
      state.isMicOn = false
    },
    turnMicOn(state) {
      state.isMicOn = true
    },
    turnHeadphoneOn(state) {
      state.isHeadphoneOn = true
    },
    turnHeadphoneOff(state) {
      state.isHeadphoneOn = false
    },
  },
})

export const {
  setMySessionId,
  setMyUserName,
  setSession,
  setMainStreamManager,
  setPublisher,
  setSubscriber,
  setParticipants,
  turnMicOff,
  turnMicOn,
  turnHeadphoneOn,
  turnHeadphoneOff,
} = groupcallSlice.actions

export default groupcallSlice.reducer

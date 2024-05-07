import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, Publisher, Subscriber } from 'openvidu-browser'

interface IGroupcallState {
  myNickname: string

  participants: string[]
  isMicOn: boolean
  isHeadphoneOn: boolean
  activeSpeaker: string | undefined
}

const initialState: IGroupcallState = {
  myNickname: '',

  participants: [],
  isMicOn: false,
  isHeadphoneOn: true,
  activeSpeaker: undefined,
}

const groupcallSlice = createSlice({
  name: 'groupcall',
  initialState,
  reducers: {
    setMyNickname: (state, action: PayloadAction<string>) => {
      state.myNickname = action.payload
    },
    addParticipants: (state, action: PayloadAction<string>) => {
      state.participants.push(action.payload)
    },
    removeParticipants: (state, action: PayloadAction<string>) => {
      state.participants = state.participants.filter(
        (item) => item !== action.payload,
      )
    },
    turnMicOff: (state) => {
      state.isMicOn = false
    },
    turnMicOn: (state) => {
      state.isMicOn = true
    },
    turnHeadphoneOn: (state) => {
      state.isHeadphoneOn = true
    },
    turnHeadphoneOff: (state) => {
      state.isHeadphoneOn = false
    },
    setActiveSpeaker: (state, action: PayloadAction<string | undefined>) => {
      state.activeSpeaker = action.payload
    },
  },
})

export const {
  setMyNickname,
  addParticipants,
  removeParticipants,
  turnMicOff,
  turnMicOn,
  turnHeadphoneOn,
  turnHeadphoneOff,
  setActiveSpeaker,
} = groupcallSlice.actions

export default groupcallSlice.reducer

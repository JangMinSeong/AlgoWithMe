import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICallState {
  participants: Array<IParticipant>
}

export interface IParticipant {
  nickname: string
  isSpeaking: boolean
}

const initialState: ICallState = {
  participants: [],
}

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    addParticipant(state: ICallState, action: PayloadAction<IParticipant>) {
      state.participants = [...state.participants, action.payload]
    },
    removeParticipant(state: ICallState, action: PayloadAction<string>) {
      state.participants = state.participants.filter(
        (item) => item.nickname !== action.payload,
      )
    },
    setActiveSpeaker(state: ICallState, action: PayloadAction<string>) {
      const target = state.participants.find(
        (p) => p.nickname === action.payload,
      )
      target.isSpeaking = true
    },
    unsetActiveSpeaker(state: ICallState, action: PayloadAction<string>) {
      const target = state.participants.find(
        (p) => p.nickname === action.payload,
      )
      target.isSpeaking = false
    },
  },
})

export const {
  addParticipant,
  removeParticipant,
  setActiveSpeaker,
  unsetActiveSpeaker,
} = callSlice.actions

export default callSlice.reducer

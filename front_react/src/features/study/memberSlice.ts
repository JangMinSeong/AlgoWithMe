import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IMemberSlice {
  onlineMembers: Array<IMember>
  offlineMembers: Array<IMember>
}

export interface IMember {
  nickname: string
  imageUrl: string
  isSpeaking: boolean
}

const initialState: IMemberSlice = {
  onlineMembers: [],
  offlineMembers: [],
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    fetchAllMembers: (
      state: IMemberSlice,
      action: PayloadAction<Array<IMember>>,
    ) => {
      state.offlineMembers = [...action.payload]
    },
    setOnline: (state: IMemberSlice, action: PayloadAction<IMember>) => {
      state.onlineMembers = [...state.onlineMembers, action.payload]
      state.offlineMembers = state.offlineMembers.filter(
        (item) => item.nickname !== action.payload.nickname,
      )
    },
    setOffline: (state: IMemberSlice, action: PayloadAction<IMember>) => {
      state.offlineMembers = [...state.offlineMembers, action.payload]
      state.onlineMembers = state.onlineMembers.filter(
        (item) => item.nickname !== action.payload.nickname,
      )
    },
    setSpeaker: (state: IMemberSlice, action: PayloadAction<string>) => {
      const target = state.onlineMembers.find(
        (p) => p.nickname === action.payload,
      )
      target.isSpeaking = true
    },
    unsetSpeaker: (state: IMemberSlice, action: PayloadAction<string>) => {
      const target = state.onlineMembers.find(
        (p) => p.nickname === action.payload,
      )
      target.isSpeaking = false
    },
  },
})

export const {
  fetchAllMembers,
  setOnline,
  setOffline,
  setSpeaker,
  unsetSpeaker,
} = memberSlice.actions

export default memberSlice.reducer

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
    setOnline: (state: IMemberSlice, action: PayloadAction<IMember>) => {
      const isDuplicate = state.onlineMembers.findIndex(
        (item) => item.nickname === action.payload.nickname,
      )
      if (isDuplicate === -1) {
        state.onlineMembers = [...state.onlineMembers, action.payload]
      }
    },

    unsetOnline: (state: IMemberSlice, action: PayloadAction<string>) => {
      state.onlineMembers = state.onlineMembers.filter(
        (item) => item.nickname !== action.payload,
      )
    },

    emptyOnline: (state: IMemberSlice) => {
      state.onlineMembers = []
    },

    emptyOffline: (state: IMemberSlice) => {
      state.offlineMembers = []
    },

    setOffline: (state: IMemberSlice, action: PayloadAction<IMember>) => {
      const isDuplicate = state.offlineMembers.findIndex(
        (item) => item.nickname === action.payload.nickname,
      )
      if (isDuplicate === -1) {
        state.offlineMembers = [...state.offlineMembers, action.payload]
      }
    },

    unsetOffline: (state: IMemberSlice, action: PayloadAction<string>) => {
      state.offlineMembers = state.offlineMembers.filter(
        (item) => item.nickname !== action.payload,
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
  setOnline,
  unsetOnline,
  emptyOnline,
  emptyOffline,
  setOffline,
  unsetOffline,
  setSpeaker,
  unsetSpeaker,
} = memberSlice.actions

export default memberSlice.reducer

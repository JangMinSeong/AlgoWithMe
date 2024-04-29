import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Client } from '@stomp/stompjs'

interface WebSocketState {
  client: Client | null
  connected: boolean
  message: string
  subscription: string
}

const initialState: WebSocketState = {
  client: null,
  connected: false,
  message: '',
  subscription: '',
}

const webSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<Client>) {
      state.client = action.payload
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload
    },
    addMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    subscribe(state, action: PayloadAction<string>) {
      state.subscription = action.payload
    },
    unsubscribe(state) {
      state.subscription = ''
    },
  },
})

export const { setClient, setConnected, addMessage, subscribe, unsubscribe } =
  webSocketSlice.actions
export default webSocketSlice.reducer

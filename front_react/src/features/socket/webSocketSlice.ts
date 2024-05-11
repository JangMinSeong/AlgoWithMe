import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Client } from '@stomp/stompjs'

interface WebSocketState {
  client: Client | null
  connected: boolean
  message: Code
  subscription: string
  subscriptionUser: string
  messageUserTabUpdate: string
  messageStudyUpdate: string
}

interface Code {
  language:string
  code:string
}

const initialState: WebSocketState = {
  client: null,
  connected: false,
  message: {language:'',code:''},
  subscription: '',
  subscriptionUser: '',
  messageUserTabUpdate: '',
  messageStudyUpdate:'',
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
    addMessage(state, action: PayloadAction<Code>) {
      state.message = action.payload
    },
    subscribe(state, action: PayloadAction<string>) {
      state.subscription = action.payload
    },
    unsubscribe(state) {
      state.subscription = ''
    },
    initMessage(state) {
      state.message = {language:'',code:''}
    },
    subscribeUser(state, action: PayloadAction<string>) {
      state.subscriptionUser = action.payload
    },
    unsubscribeUser(state) {
      state.subscriptionUser = ''
    },
    setMessageUpdateUserTab(state, action : PayloadAction<string>) {
      state.messageUserTabUpdate = action.payload
    },
    initMessageUpdateUserTab(state) {
      state.messageUserTabUpdate = ''
    },
    setMessageUpdateStudy(state, action:PayloadAction<string>) {
      state.messageStudyUpdate = action.payload
    }
  },
})

export const { setClient, setConnected, addMessage, subscribe, unsubscribe,initMessage,subscribeUser, unsubscribeUser,setMessageUpdateUserTab, initMessageUpdateUserTab,setMessageUpdateStudy } =
  webSocketSlice.actions
export default webSocketSlice.reducer

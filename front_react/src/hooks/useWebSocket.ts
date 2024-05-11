import { Client } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMessage,
  setClient,
  setConnected,
  subscribe,
  unsubscribe,
} from '@/features/socket/webSocketSlic'
import SockJS from 'sockjs-client'
import { RootState } from '@/lib/store'

export function useWebSocket() {
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.socket.client)
  const connectToServer = (groupId:number) => {
    if (client !== null) {
      console.log('already connect')
      return
    }
    const newClient = new Client({
      webSocketFactory: () =>
        new SockJS(
          `${import.meta.env.VITE_API_DEV_URL}/algowithme-websocket`,
        ),
      onConnect: () => {
        console.log('success')
        dispatch(setConnected(true))
      },
      onStompError: (frame) => {
        console.error(
          `Broker reported error: ${frame.headers.message}`,
          frame.body,
        )
      },
      debug(str) {
        console.log(`Debug: ${str}`)
      },
      reconnectDelay: 5000,
    })

    newClient.activate()
    dispatch(setClient(newClient))
  }
  const disconnectToServer = () => {
    client?.deactivate()
  }

  const subscribeToTopic = (topic: string) => {
    if (client && client.connected) {
      client.subscribe(topic, (message) => {
        console.log("message receive " + message.body.toString())
        dispatch(addMessage(message.body.toString()))
      })
      dispatch(subscribe(topic))
    } else {
      console.error('Attempted to sub while STOMP client is disconnected.')
    }
  }

  const unsubscribeFromTopic = (topic: string) => {
    if (client && client.connected) {
      client.unsubscribe(topic)
      dispatch(unsubscribe())
    }
  }

  const sendMessage = (destination: string, body: string, headers = {}) => {
    if (client && client.connected) {
      client.publish({ destination, body, headers })
    } else {
      console.error(
        'Attempted to send message while STOMP client is disconnected.',
      )
    }
  }

  return {
    disconnectToServer,
    connectToServer,
    subscribeToTopic,
    unsubscribeFromTopic,
    sendMessage,
  }
}

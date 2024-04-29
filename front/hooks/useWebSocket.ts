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
  const connectToServer = () => {
    if (client !== null) {
      console.log('already connect')
      return
    }
    const newClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8085/ws-test'),
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
    console.log('asdasdawdwadawd')
    if (client && client.connected) {
      console.log('in sub')
      client.subscribe(topic, (message) => {
        console.log(message.body)
        dispatch(addMessage(message.body))
      })
      dispatch(subscribe(topic))
    } else {
      console.log(client)
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

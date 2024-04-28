import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

class StompClientService {
  private client: Client

  private connected: boolean = false

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('https://localhost:8085/test/code'),
      onConnect: () => {
        console.log('Connected to WebSocket server')
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`)
        console.error(`Additional details: ${frame.body}`)
      },
      debug(str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
  }

  connect() {
    if (!this.connected) {
      this.client.activate()
    }
    this.client.onConnect = (frame) => {
      this.connected = true
      console.log('STOMP Connection Established')
      this.client.subscribe('/topic/message', (message) => {
        const data = JSON.parse(message.body)
        console.log('Received message:', data)
      })
    }
    this.client.onDisconnect = () => {
      this.connected = false
      console.log('STOMP Disconnected')
    }
  }

  disconnect() {
    if (this.connected) {
      this.client.deactivate()
      this.connected = false
    }
  }

  send(destination: string, body: string, headers = {}) {
    if (this.connected) {
      this.client.publish({ destination, headers, body })
    } else {
      console.error(
        'Attempted to send message while STOMP client is disconnected.',
      )
    }
  }
}

const stompClientService = new StompClientService()
export default stompClientService

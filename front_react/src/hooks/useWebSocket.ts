import { Client, StompSubscription } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  setClient,
  setConnected,
  subscribe,
  unsubscribe,
  initMessage
} from '@/features/socket/webSocketSlice';
import SockJS from 'sockjs-client';
import { RootState } from '@/lib/store';
import { useState } from 'react';

export function useWebSocket() {
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.socket.client);
  const [subscriptions, setSubscriptions] = useState<{ [key: string]: StompSubscription }>({});

  const connectToServer = () => {
    if (client !== null) {
      console.log('Already connected');
      return;
    }
    const newClient = new Client({
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_DEV_URL}/algowithme-websocket`),
      onConnect: () => {
        console.log('Connection successful');
        dispatch(setConnected(true));
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`, frame.body);
      },
      debug: (str) => {
        console.log(`Debug: ${str}`);
      },
      reconnectDelay: 5000,
    });

    newClient.activate();
    dispatch(setClient(newClient));
  };

  const disconnectToServer = () => {
    Object.values(subscriptions).forEach((sub) => sub.unsubscribe());
    setSubscriptions({});
    client?.deactivate();
  };

  const subscribeToTopic = (topic: string) => {
    if (client && client.connected) {
      const subscription = client.subscribe(topic, (message) => {
        console.log("Message received: " + message.body);
        dispatch(addMessage(message.body));
      });
      setSubscriptions((subs) => ({ ...subs, [topic]: subscription }));
      dispatch(subscribe(topic));
    } else {
      console.error('Attempted to subscribe while STOMP client is disconnected.');
    }
  };

  const unsubscribeFromTopic = (topic: string) => {
    const subscription = subscriptions[topic];
    if (subscription) {
      subscription.unsubscribe();
      console.log(`Unsubscribed from ${topic}`);
      setSubscriptions((subs) => {
        const { [topic]: _, ...rest } = subs;
        return rest;
      });
      dispatch(unsubscribe());
      dispatch(initMessage());
    } else {
      console.error(`No subscription found for topic ${topic}`);
    }
  };

  const sendMessage = (destination: string, body: string, headers = {}) => {
    if (client && client.connected) {
      client.publish({ destination, body, headers });
    } else {
      console.error('Attempted to send message while STOMP client is disconnected.');
    }
  };

  return {
    disconnectToServer,
    connectToServer,
    subscribeToTopic,
    unsubscribeFromTopic,
    sendMessage,
  };
}

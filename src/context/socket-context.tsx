import { createContext, useEffect, useState, useRef, type ReactNode } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BASE_URL } from '@/const';
import { useAuthStore } from '@/stores/auth-store';

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Client | null>(null);
export default SocketContext;

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const clientRef = useRef<Client | null>(null);

  const accessToken = useAuthStore(state => state.accessToken);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      const client = new Client({
        webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),

        beforeConnect: () => {
          const currentState = useAuthStore.getState();
          if (!currentState.isAuthenticated()) {
            client.deactivate().catch(console.error);
            return;
          }

          client.connectHeaders = {
            Authorization: `Bearer ${currentState.accessToken}`,
          };
        },

        reconnectDelay: 5000,

        onConnect: () => {
          setStompClient(client);
        },

        onStompError: (frame) => {
          console.error('Socket error:', frame.headers['message']);
          console.error('Details:', frame.body);

          if (frame.headers['message']?.includes('Failed to send message')) {
            client.deactivate().catch(console.error);
            setStompClient(null);
          }
        },

        onDisconnect: () => {
          setStompClient(null);
        }
      });

      clientRef.current = client;
      client.activate();

      return () => {
        if (clientRef.current) {
          clientRef.current.deactivate().catch(console.error);
          clientRef.current = null;
        }
        setStompClient(null);
      };
    } else {
      if (stompClient?.connected) {
        stompClient.deactivate().catch(console.error);
      }
      setStompClient(null);
    }
  }, [accessToken, isAuthenticated]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
};

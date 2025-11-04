import { createContext, useEffect, useState, type ReactNode } from 'react';
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

  const accessToken = useAuthStore(state => state.accessToken);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      console.log('🔌 Connecting socket with token:', accessToken.substring(0, 10) + '...');

      const client = new Client({
        webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),

        beforeConnect: () => {
          // Always use fresh token from store
          const currentToken = useAuthStore.getState().accessToken;
          client.connectHeaders = {
            Authorization: `Bearer ${currentToken}`,
          };
        },

        reconnectDelay: 5000,

        onConnect: () => {
          console.log('WebSocket connected');
          setStompClient(client);
        },

        onStompError: (frame) => {
          console.error('Socket error:', frame.headers['message']);
          console.error('Details:', frame.body);
        },

        onDisconnect: () => {
          console.log('WebSocket disconnected');
          setStompClient(null);
        }
      });

      client.activate();

      return () => {
        console.log('Cleaning up socket connection');
        if (client.connected) {
          client.deactivate();
        }
        setStompClient(null);
      };
    } else {
      // No auth = no socket
      console.log('No authentication, disconnecting socket');
      setStompClient(null);
    }
  }, [accessToken, isAuthenticated]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
};

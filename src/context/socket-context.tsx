import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BASE_URL } from '@/const';

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Client | null>(null);
export default SocketContext

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // Đọc token một lần khi render
  const authToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (authToken) {
      const client = new Client({
        webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),

        beforeConnect: () => {
          const freshToken = localStorage.getItem('access_token');

          client.connectHeaders = {
            Authorization: `Bearer ${freshToken}`,
          };
        },

        reconnectDelay: 5000,

        onConnect: () => {
          setStompClient(client);
        },

        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },

        onDisconnect: () => {
          console.log('WebSocket disconnected');
        }
      });

      client.activate();

      // Hàm dọn dẹp (cleanup)
      return () => {
        // Sẽ chạy khi authToken thay đổi (logout) hoặc component unmount
        if (client.connected) {
          client.deactivate().then(() => {
            console.log("WebSocket deactivated");
          });
        }
        setStompClient(null);
      };
    }

    setStompClient(null);
  }, [authToken]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
};
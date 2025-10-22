import { useEffect } from 'react';
import { useSocket } from '@/hooks/use-socket.tsx';

type NotificationCallback = (notification: any) => void;

export const useNotificationSubscription = (
  destination: string,
  onNewNotification: NotificationCallback
) => {
  const stompClient = useSocket();

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(destination, (message) => {
        try {
          const newNotification = JSON.parse(message.body);

          if (onNewNotification) {
            onNewNotification(newNotification);
          }

        } catch (e) {
          console.error("Lỗi parse tin nhắn:", e);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, destination, onNewNotification]);
};
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'
import { notificationsKeys } from './query-keys.ts'
import { useSocket } from '@/hooks/use-socket.tsx'

type Notification = {
  notificationRecipientId: string;
  type: string;
  title: string;
  content: string;
  data: {
    companyId: string;
    companyName: string;
  };
  category: string;
  priority: string;
  deepLink: string;
  sentAt: string;
  readStatus: boolean;
};

type ApiResponse = {
  data: Notification[];
};

export const useGetUserNotifications = (userId: string) =>
  useQuery({
    queryKey: notificationsKeys.getNotificationsByUserId(userId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/notifications/users/${userId}`)
      return data
    },
    enabled: !!userId,
  });

export const useGetUserNotificationsUnread = (userId: string) =>
  useQuery({
    queryKey: notificationsKeys.getUnreadNotificationsByUserId(userId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/notifications/users/${userId}/unread`)
      return data
    },
    enabled: !!userId,
  });

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const stompClient = useSocket();

  return useMutation({
    mutationFn: async ({ userId, notificationRecipientId }: {
      userId: string;
      notificationRecipientId: string;
    }) => {
      if (!stompClient?.connected) {
        throw new Error('STOMP client not connected');
      }

      const destination = `/users/${userId}/notifications/${notificationRecipientId}/read`;
      stompClient.publish({ destination, body: JSON.stringify({}) });

      return { userId, notificationRecipientId };
    },
    onSuccess: (_, { userId, notificationRecipientId }) => {
      // Update both all notifications and unread notifications cache
      queryClient.setQueryData(
        notificationsKeys.getNotificationsByUserId(userId),
        (oldData: ApiResponse | undefined) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((notification: Notification) =>
              notification.notificationRecipientId === notificationRecipientId
                ? { ...notification, readStatus: true }
                : notification
            )
          };
        }
      );

      queryClient.setQueryData(
        notificationsKeys.getUnreadNotificationsByUserId(userId),
        (oldData: ApiResponse | undefined) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((notification: Notification) =>
              notification.notificationRecipientId !== notificationRecipientId
            )
          };
        }
      );
    }
  });
};

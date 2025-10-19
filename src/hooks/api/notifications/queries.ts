import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'
import { notificationsKeys } from '@/hooks/api/notifications/query-keys.ts'

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


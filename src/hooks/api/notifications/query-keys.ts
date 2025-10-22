export const notificationsKeys = {
  getNotificationsByUserId: (userId: string) =>  ["notifications", { userId }] as const,
  getUnreadNotificationsByUserId: (userId: string) =>  ["unread-notifications", { userId }] as const,
}
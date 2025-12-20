import { useMemo, useCallback, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BellIcon } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'
import { notificationsKeys, useGetUserNotifications, useGetUserNotificationsUnread } from '@/hooks/api/notifications'
import { useNotificationSubscription } from '@/hooks/use-notifications'
import { Link } from '@tanstack/react-router'
import { useMarkNotificationAsRead } from '@/hooks/api/notifications/queries.ts'
import { Spinner } from './ui/spinner'

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
}

export function NotificationDropdown() {
  const userId = localStorage.getItem('user_id') || '';
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const {
    data: allNotifications,
    isLoading: isLoadingAll,
    isError: isErrorAll
  } = useGetUserNotifications(userId);

  const {
    data: unreadNotifications,
    isLoading: isLoadingUnread,
    isError: isErrorUnread
  } = useGetUserNotificationsUnread(userId);

  const markAsReadMutation = useMarkNotificationAsRead();

  const notificationTopic = `/user/queue/notifications`;

  const onNewNotification = useCallback((newNotification: Notification) => {
    queryClient.setQueryData(
      notificationsKeys.getNotificationsByUserId(userId),
      (oldData: ApiResponse | undefined) => {
        const currentData = oldData?.data || [];
        return {
          ...oldData,
          data: [newNotification, ...currentData]
        };
      }
    );

    queryClient.setQueryData(
      notificationsKeys.getUnreadNotificationsByUserId(userId),
      (oldData: ApiResponse | undefined) => {
        const currentData = oldData?.data || [];
        return {
          ...oldData,
          data: [newNotification, ...currentData]
        };
      }
    );
  }, [queryClient, userId]);

  useNotificationSubscription(
    notificationTopic,
    onNewNotification
  );

  const unreadCount = useMemo(() => {
    return unreadNotifications?.data?.length || 0;
  }, [unreadNotifications]);

  const formatNotificationTime = (sentAt: string) => {
    try {
      return formatDistanceToNow(new Date(sentAt), { addSuffix: true })
    } catch {
      return 'Recently'
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.readStatus) {
      markAsReadMutation.mutate({
        userId,
        notificationRecipientId: notification.notificationRecipientId
      });
    }
  };

  const renderNotificationList = (
    list: Notification[] | undefined,
    isLoading: boolean,
    isError: boolean,
    emptyMessage: string
  ) => {
    if (isError) {
      return (
        <div className='p-4 text-center text-sm text-destructive'>
          <p>Không thể tải thông báo.</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className='p-4 text-center text-sm text-muted-foreground'>
          <Spinner className="h-32 w-32" />
        </div>
      );
    }

    if (!list || list.length === 0) {
      return (
        <div className='p-4 text-center text-sm text-muted-foreground'>
          <BellIcon className='mx-auto mb-2 h-8 w-8 text-muted-foreground/50' />
          <p>{emptyMessage}</p>
        </div>
      );
    }

    // Render danh sách
    return list.map((item: Notification) => (
      <DropdownMenuItem
        key={item.notificationRecipientId}
        className={cn(
          'flex flex-col items-start gap-1 cursor-pointer p-3 min-h-fit',
          'focus:bg-accent hover:bg-accent/50',
          !item.readStatus && 'bg-accent/30 border-l-2 border-l-primary'
        )}
        onClick={() => handleNotificationClick(item)}
      >
        <Link to={item.deepLink} className='w-full'>
          <div className='flex items-start justify-between w-full'>
            <p className={cn(
              'font-medium text-sm leading-tight',
              !item.readStatus && 'font-bold'
            )}>
              {item.title}
            </p>
            {!item.readStatus && (
              <div className='w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1' />
            )}
          </div>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {item.content}
          </p>
          <p className='text-xs text-muted-foreground'>
            {formatNotificationTime(item.sentAt)}
          </p>
        </Link>
      </DropdownMenuItem>
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative me-5">
          <Button
            variant='ghost'
            size='icon'
            className={cn('rounded-full size-9')}
          >
            <BellIcon className='hover:cursor-pointer size-4' />
          </Button>
          {unreadCount > 0 && (
            <span
              className="text-white absolute top-0 right-0 px-1 min-w-4 translate-x-1/2 -translate-y-1/3 origin-center flex items-center justify-center rounded-full text-xs bg-destructive"
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-96' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex items-center justify-between'>
            <p className='text-sm leading-none font-medium'>Thông báo</p>
            {unreadCount > 0 && (
              <Button
                variant='link'
                size='sm'
                className='h-auto p-0 text-xs'
              // onClick={handleMarkAllAsRead}
              >
                Đánh dấu tất cả đã đọc
              </Button>
            )}
          </div>
        </DropdownMenuLabel>

        {/* --- 6. Phần Tabs --- */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'unread')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mt-1 px-2">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="unread">
              Chưa đọc ({unreadCount > 99 ? '99+' : unreadCount})
            </TabsTrigger>
          </TabsList>

          <DropdownMenuSeparator className="mt-2" />

          {/* Tab "Tất cả" */}
          <TabsContent value="all">
            <DropdownMenuGroup className='max-h-80 overflow-y-auto'>
              {renderNotificationList(
                allNotifications?.data,
                isLoadingAll,
                isErrorAll,
                "Bạn không có thông báo nào."
              )}
            </DropdownMenuGroup>
          </TabsContent>

          {/* Tab "Chưa đọc" */}
          <TabsContent value="unread">
            <DropdownMenuGroup className='max-h-80 overflow-y-auto'>
              {renderNotificationList(
                unreadNotifications?.data,
                isLoadingUnread,
                isErrorUnread,
                "Bạn không có thông báo chưa đọc."
              )}
            </DropdownMenuGroup>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
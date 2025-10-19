import { useContext } from 'react';
import SocketContext from '@/context/socket-context';

export const useSocket = () => {
  const socketContext = useContext(SocketContext);

  return socketContext;
};
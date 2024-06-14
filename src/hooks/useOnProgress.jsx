// useTaskQueries.jsx

import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from './useAxiosSecure';

export const useTodoList = () => {
  const { user } = useAuth();
  const { refetch: refetchTodo, data: todo = [] } = useQuery(
    {
      queryKey: ['todo', user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/todoCollection?email=${user?.email}`);
        return res.data;
      }
    }
  );

  return [todo, refetchTodo];
};

export const useOnProgress = () => {
  const { user } = useAuth();
  const { refetch: refetchOnProgress, data: onProgress = [] } = useQuery(
    {
      queryKey: ['onProgress', user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/onProgressCollection?email=${user?.email}`);
        return res.data;
      }
    }
  );

  return [onProgress, refetchOnProgress];
};

export const useDoneList = () => {
  const { user } = useAuth();
  const { refetch: refetchDoneList, data: doneList = [] } = useQuery(
    {
      queryKey: ['doneList', user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/doneCollection?email=${user?.email}`);
        return res.data;
      }
    }
  );

  return [doneList, refetchDoneList];
};

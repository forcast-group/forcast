import useSWR from 'swr';
import { Port } from '../types';

type PortResponse = {
  result: Port[];
};
export const useGetPort = (): {
  data?: PortResponse;
  error?: Error;
  isLoading: boolean;
} => {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
    });

    return await response.json();
  };

  const { data, error, isLoading } = useSWR<PortResponse, Error>(`/api/home/ports`, fetcher);

  return { data, error, isLoading };
};

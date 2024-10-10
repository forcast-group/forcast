import useSWR from 'swr';
import { City } from '../types';

type CityResponse = {
  result: City[];
};
export const useGetCity = (): {
  data?: CityResponse;
  error?: Error;
  isLoading: boolean;
} => {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
    });

    return await response.json();
  };

  const { data, error, isLoading } = useSWR<CityResponse, Error>('/api/home/cities', fetcher);

  return { data, error, isLoading };
};

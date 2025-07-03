import { fetchEvent } from '@/lib/api';
import type { EventResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useEvent(id: number | undefined) {
  return useQuery<EventResponse, Error>({
    queryKey: ['event', id],
    queryFn: () => {
      if (id === undefined) throw new Error('No ID');
      return fetchEvent(id);
    },
    enabled: id !== undefined
  });
}

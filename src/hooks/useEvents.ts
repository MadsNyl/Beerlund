import { fetchEvents } from '@/lib/api';
import type { EventListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useEvents(
  page: number,
  limit: number,
  ended: boolean
) {
  return useQuery<EventListResponse, Error>({
    queryKey: ['events', page, limit, ended],
    queryFn: () => fetchEvents(page, limit, ended),
  });
}

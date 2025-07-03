import type { EventListResponse, EventResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchEvents(
  page: number,
  limit: number,
  ended: boolean
): Promise<EventListResponse> {
  const params = new URLSearchParams({ page: `${page}`, limit: `${limit}`, ended: `${ended}` });
  const res = await fetch(`${API_URL}/events?${params}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function fetchEvent(id: number): Promise<EventResponse> {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function joinEvent(
  eventId: number,
  getToken: () => Promise<string | null>
) {
  // 1. Fetch a fresh Clerk JWT
  const token = await getToken();

  // 2. POST to your backend
  const res = await fetch(`${API_URL}/participate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ event_id: eventId }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body);
  }
}

export async function leaveEvent(
  eventId: number,
  getToken: () => Promise<string | null>
) {
  const token = await getToken();

  const res = await fetch(`${API_URL}/leave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ event_id: eventId }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body);
  }
}
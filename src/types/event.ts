import type { LeaderboardEntry } from "./leaderboard";
import type { Participant } from "./participant";

export interface EventList {
  id: number;
  name: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  start_time: string;
  end_time: string;  
  image_url: string;
  participants: number;
  max_participants: number;
}

export interface EventListResponse {
  events: EventList[];
  next_page: number;
  prev_page: number;
  total_count: number;
}

export interface EventResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  start_time: string;     
  end_time: string;       
  image_url: string;
  max_participants: number;
  participants: Participant[];
  leaderboard: LeaderboardEntry[];
}


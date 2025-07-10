import { type UserDataJSON } from "@clerk/types";

export interface Participant {
  id: number;
  event_id: number;
  user_id: string;
  user: UserDataJSON;
  created_at: string;
  updated_at: string;
}
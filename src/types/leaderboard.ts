import type { UserDataJSON } from "@clerk/types";


export interface LeaderboardEntry {
    id: number;
    event_id: number;
    participant_id: number;
    user: UserDataJSON;
    score: number;
    rank: number;
};
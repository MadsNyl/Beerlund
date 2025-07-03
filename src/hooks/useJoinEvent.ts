import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinEvent } from "@/lib/api";
import { toast } from "sonner";

export function useJoinEvent(eventId: number | undefined) {
    if (eventId === undefined) {
        throw new Error("No event ID provided for joining event");
    }

  const { getToken } = useAuth();
  const qc = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => joinEvent(eventId, getToken),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["event", eventId] });
      qc.invalidateQueries({ queryKey: ["events"] });
      toast.success("Du har meldt deg på arrangementet!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

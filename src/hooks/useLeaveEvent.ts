import { leaveEvent } from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLeaveEvent(eventId: number | undefined) {
  if (eventId === undefined) {
    throw new Error("No event ID provided for leaving event");
  }

  const { getToken } = useAuth();
  const qc = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => leaveEvent(eventId, getToken),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["event", eventId] });
      qc.invalidateQueries({ queryKey: ["events"] });
      toast.success("Du har meldt deg av arrangementet!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
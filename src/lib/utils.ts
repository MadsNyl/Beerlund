import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(ms: number) {
  if (ms <= 0) return "Ukjent tid";

  const totalSec = Math.floor(ms / 1000);
  const minutes  = Math.floor(totalSec / 60);
  const seconds  = totalSec % 60;
  const centis   = Math.floor((ms % 1000) / 10);
  return `${minutes}:${seconds.toString().padStart(2,'0')}:${centis.toString().padStart(2,'0')}`;
}
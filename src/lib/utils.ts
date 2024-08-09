import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  // Helper functions to format date and time components
  const padTo2Digits = (num: number): string => num.toString().padStart(2, "0");
  const get12HourFormat = (hour: number): number => hour % 12 || 12;
  const getAMPM = (hour: number): string => (hour >= 12 ? "PM" : "AM");

  const month: string = padTo2Digits(date.getMonth() + 1); // Months are zero-indexed
  const day: string = padTo2Digits(date.getDate());
  const year: string = date.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const hours24: number = date.getHours();
  const hours12: number = get12HourFormat(hours24);
  const minutes: string = padTo2Digits(date.getMinutes());
  const ampm: string = getAMPM(hours24);

  return `${day}/${month}/${year}, ${hours12}:${minutes}${ampm}`;
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromNow(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds <= 44) {
    return "a few seconds ago";
  } else if (diffInSeconds <= 89) {
    return "a minute ago";
  } else if (diffInSeconds <= 44 * 60) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds <= 89 * 60) {
    return "an hour ago";
  } else if (diffInSeconds <= 21 * 60 * 60) {
    const hours = Math.floor(diffInSeconds / (60 * 60));
    return `${hours} hours ago`;
  } else if (diffInSeconds <= 35 * 60 * 60) {
    return "a day ago";
  } else if (diffInSeconds <= 25 * 24 * 60 * 60) {
    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    return `${days} days ago`;
  } else if (diffInSeconds <= 45 * 24 * 60 * 60) {
    return "a month ago";
  } else if (diffInSeconds <= 10 * 30 * 24 * 60 * 60) {
    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
    return `${months} months ago`;
  } else if (diffInSeconds <= 17 * 30 * 24 * 60 * 60) {
    return "a year ago";
  } else {
    const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
    return `${years} years ago`;
  }
}

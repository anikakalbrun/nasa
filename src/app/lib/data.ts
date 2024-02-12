"use server";
import { subWeeks, format } from "date-fns";
import { Post } from "@/app/interfaces";

export const fetchPosts = async (pageParam: string) => {
  const currentDate = pageParam;
  const twoWeeksAgo = subWeeks(currentDate, 2);

  // Format the new date as YYYY-MM-DD
  const end_date = format(currentDate, "yyyy-MM-dd");
  const start_date = format(twoWeeksAgo, "yyyy-MM-dd");

  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}&thumbs=true`;

  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json() as Promise<Post[]>;
};

export const fetchPost = async (day: string) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${day}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json() as Promise<Post>;
};

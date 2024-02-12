"use client";
import { subWeeks, format } from "date-fns";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";

import ArticleItem from "@/app/ui/article-item";
import { Suspense } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";
import { fetchPosts } from "@/app/lib/data";

export interface Post {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface LastPage {
  data: Post[]; // Assuming ImageData is the interface representing each image object
}

interface PostsPages {
  pages: [Post[]];
}

export default function ArticleList() {
  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["planetary"],
    queryFn: (queryFunctionContext) => {
      return fetchPosts(queryFunctionContext.pageParam);
    },
    initialPageParam: new Date().toISOString().split("T")[0],
    getNextPageParam: (lastPage: Post[], b, c) => {
      const lastItemDate = lastPage[0].date;
      return lastItemDate; // Use the date of the last item as the next page parameter
    },
  });

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      ) {
        return;
      }
      fetchNextPage();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, fetchNextPage]);

  if (isFetching) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-center flex-col overflow-y-auto">
      {posts?.pages.flat().map((post: Post) => (
        <ArticleItem key={post.date} {...post} />
      ))}
    </div>
  );
}

"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useDeferredValue } from "react";

import ArticleItem from "@/app/ui/article-item";
import DashboardSkeleton from "@/app/ui/skeletons";
import { fetchPosts } from "@/app/lib/data";
import { Post } from "@/app/interfaces";
import { add, format } from "date-fns";

interface PostsPages {
  pages: [Post[]];
}

export default function ArticleList() {
  const {
    data: posts,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["planetary"],
    queryFn: (queryFunctionContext) => {
      return fetchPosts(queryFunctionContext.pageParam);
    },
    initialPageParam: format(new Date(), "yyyy-MM-dd"),
    getNextPageParam: (lastPage: Post[]) => {
      const lastItemDate = lastPage.at(-1)?.date;
      // Handle case where lastPage is empty or date is missing

      if (!lastItemDate) return "";

      const nextDay = add(new Date(lastItemDate), { days: 1 });
      return format(nextDay, "yyyy-MM-dd"); // Use the date of the last item as the next page parameter
    },
  });

  const deferredQuery = useDeferredValue(posts);

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

  if (isFetching && !isFetchingNextPage) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-center flex-col overflow-y-auto">
      {deferredQuery?.pages.flat().map((post: Post) => (
        <ArticleItem key={post.date} {...post} />
      ))}
    </div>
  );
}

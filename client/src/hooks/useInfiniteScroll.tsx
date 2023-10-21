import { handleInfinitScroll } from "@/lib/handleInfiniteScroll";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

const useInfiniteScroll = (
  element: HTMLElement | null,
  query: UseInfiniteQueryResult,
  dep?: any[]
) => {
  let dependencies = [
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isFetching,
  ];

  if (dep) {
    dependencies = [...dependencies, ...dep];
  }

  return useEffect(() => {
    if (!element) return;

    const onScrollInfinite = async () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        await query.fetchNextPage();
      }
    };
    const [addEvent, removeEvent] = handleInfinitScroll(
      onScrollInfinite,
      element
    );

    addEvent();

    return () => {
      removeEvent();
    };
  }, dependencies);
};

export default useInfiniteScroll;

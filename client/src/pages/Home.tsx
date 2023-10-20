import { ContactPanel } from "@/components/contact";
import { useGetContacts } from "@/hooks/contacts.hook";
import { handleInfinitScroll } from "@/lib/handleInfiniteScroll";
import { useEffect, useRef } from "react";

export const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const getConactsQuery = useGetContacts();

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onScrollInfinite = async () => {
      if (getConactsQuery.hasNextPage && !getConactsQuery.isFetchingNextPage) {
        await getConactsQuery.fetchNextPage();
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
  }, [getConactsQuery.hasNextPage, getConactsQuery.isFetchingNextPage]);

  return <ContactPanel query={getConactsQuery} ref={ref} />;
};

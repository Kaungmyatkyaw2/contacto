import { ContactPanel } from "@/components/contact";
import { useGetContactsByLabel } from "@/hooks/contacts.hook";
import { handleInfinitScroll } from "@/lib/handleInfiniteScroll";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const LabelPage = () => {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const query = useGetContactsByLabel(id || "");

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onScrollInfinite = async () => {
      const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

      if (hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
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
  }, [query.hasNextPage, query.isFetchingNextPage]);

  return <ContactPanel query={query} ref={ref} />;
};

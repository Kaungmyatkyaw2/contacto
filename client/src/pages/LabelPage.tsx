import { ContactPanel } from "@/components/contact";
import { useGetContactsByLabel } from "@/hooks/contacts.hook";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export const LabelPage = () => {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const query = useGetContactsByLabel(id || "");

  useInfiniteScroll(ref.current, query);

  return <ContactPanel query={query} ref={ref} />;
};

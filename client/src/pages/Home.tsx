import { ContactPanel } from "@/components/contact";
import { useGetContacts } from "@/hooks/contacts.hook";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRef } from "react";

export const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const query = useGetContacts();

  useInfiniteScroll(ref.current, query);

  return <ContactPanel query={query} ref={ref} />;
};

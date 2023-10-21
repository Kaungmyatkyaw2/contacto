import { Ref, forwardRef } from "react";
import { LayoutChildWrapper } from "../layout";
import { HorizontalLoader } from "@/sharers/other";
import { ContactTable } from "./ContactTable";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ResponseDataArray } from "@/types/queryData.types";
import { ContactType } from "@/types/contact.types";
import { splitPagesData } from "@/lib/handleInfiniteScroll";

interface Prop {
  query: UseInfiniteQueryResult<ResponseDataArray<ContactType>>;
}

export const ContactPanel = forwardRef(
  ({ query }: Prop, ref: Ref<HTMLDivElement>) => {
    const contacts = splitPagesData(query.data);

    return (
      <LayoutChildWrapper ref={ref}>
        {query.isLoading && !query.isFetchingNextPage ? (
          <HorizontalLoader />
        ) : (
          <ContactTable contacts={contacts || []} />
        )}

        {(query.isFetchingNextPage || query.isFetching) &&
          !query.isInitialLoading && <HorizontalLoader />}
      </LayoutChildWrapper>
    );
  }
);

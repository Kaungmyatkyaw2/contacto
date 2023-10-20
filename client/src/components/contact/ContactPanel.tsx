import { Ref, forwardRef } from "react";
import { LayoutChildWrapper } from "../layout";
import { HorizontalLoader } from "@/sharers/other";
import { ContactTable } from "./ContactTable";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ResponseDataArray } from "@/types/queryData.types";
import { ContactType } from "@/types/contact.types";

interface Prop {
  query: UseInfiniteQueryResult<ResponseDataArray<ContactType>>;
}

export const ContactPanel = forwardRef(
  ({ query }: Prop, ref: Ref<HTMLDivElement>) => {
    const pagesData: any[] =
      query.data?.pages.map(
        (page: ResponseDataArray<ContactType>) => page.data.data
      ) || [];
    const contacts: ContactType[] = [].concat(...pagesData);

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

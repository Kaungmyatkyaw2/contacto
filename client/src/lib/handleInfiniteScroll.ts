import { ContactType } from "@/types/contact.types";
import { LabelType } from "@/types/label.types";
import {
  InfiniteQueryResponse,
  ResponseDataArray,
} from "@/types/queryData.types";

export const handleInfinitScroll = (fn: any, element: HTMLElement) => {
  const onScroll = async (_: Event) => {
    if (
      element.scrollHeight - element.scrollTop <=
      element.clientHeight * 1.5
    ) {
      await fn();
    }
  };

  const addEventListener = () => {
    element.addEventListener("scroll", onScroll);
  };

  const removeEventListener = () => {
    element.removeEventListener("scroll", onScroll);
  };

  return [addEventListener, removeEventListener];
};

export const splitPagesData = <T extends ContactType | LabelType>(
  data: InfiniteQueryResponse<T> | undefined
) => {
  if (!data) return data;
  const pagesData: any[] =
    data?.pages.map((page: ResponseDataArray<T>) => page.data.data) || [];
  const finalResult: T[] = [].concat(...pagesData);

  return finalResult;
};

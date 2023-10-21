import { ContactType } from "@/types/contact.types";
import { LabelType } from "@/types/label.types";
import { InfiniteQueryResponse } from "@/types/queryData.types";

export const updatedQueryResponseArrayData = <
  E extends LabelType | ContactType
>(
  prevData: InfiniteQueryResponse<E>,
  updatedData: E
) => {
  let pages = prevData.pages;

  let updatedDataArray = pages.map((el) => ({
    ...el,
    data: {
      data: el.data.data.map((i) =>
        i._id == updatedData._id ? updatedData : i
      ),
    },
  }));

  prevData = {
    ...prevData,
    pages: updatedDataArray,
  };

  return prevData;
};

export const filteredQueryResponseArrayData = <
  E extends LabelType | ContactType
>(
  prevData: InfiniteQueryResponse<E>,
  removeId: string
) => {
  let pages = prevData.pages;

  let filteredArray = pages.map((el) => ({
    ...el,
    data: { data: el.data.data.filter((i) => i._id !== removeId) },
  }));

  prevData = {
    ...prevData,
    pages: filteredArray,
  };
  return prevData;
};

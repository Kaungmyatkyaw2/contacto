import { ContactType } from "@/types/contact.types";
import { LabelType } from "@/types/label.types";
import { ResponseDataArray } from "@/types/queryData.types";

export const updatedQueryResponseArrayData = <
  E extends LabelType | ContactType
>(
  prevData: ResponseDataArray<E>,
  updatedData: E
) => {
  let prevDataArray = prevData?.data?.data?.map((el: E) =>
    el._id == updatedData._id ? updatedData : el
  );

  prevData = {
    ...prevData,
    data: {
      data: prevDataArray,
    },
  };

  return prevData;
};

export const filteredQueryResponseArrayData = <
  E extends LabelType | ContactType
>(
  prevData: ResponseDataArray<E>,
  removeId: string
) => {
  let filteredArray = prevData?.data?.data?.filter(
    (i: E) => i._id !== removeId
  );

  prevData = {
    ...prevData,
    data: {
      data: filteredArray,
    },
    result: (prevData.result || 0) - 1,
  };
  return prevData;
};

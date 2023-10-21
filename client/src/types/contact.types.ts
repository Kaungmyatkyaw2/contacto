import { LabelType } from "./label.types";

export interface ContactType {
  email?: string | undefined;
  name: string;
  phoneNumber: string;
  _id: string;
  photo?: string;
  bgColor: string;
  labels: LabelType[];
}

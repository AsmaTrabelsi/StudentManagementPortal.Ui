import { Address } from "cluster";
import { Gender } from "./gender.model";

export interface Student{
  id: string,
  firstName:string,
  lastName: string,
  dateofBirth: string,
  email: string,
  mobile:number,
  profileImageUrl:string,
  genderId: string,
  gender : Gender,
  address: Address
}

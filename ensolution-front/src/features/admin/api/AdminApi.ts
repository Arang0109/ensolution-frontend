import { axiosPrivate } from "@/common/api";
import type { ApiResponseMessage } from "@/common/model";
import type { UserResponse } from "@auth/model";

export const getUsers = async (): Promise<ApiResponseMessage<UserResponse[]>> => {
  const res = await axiosPrivate.get("/admin/users");
  return res.data;
}
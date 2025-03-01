import { instance } from "@/utils/axios";

export async function userSearch(params: {
  username: string;
  nickName: string;
  email: string;
  pageNo: number;
  pageSize: number;
}) {
  return await instance.get("/user/list", {
    params,
  });
}

export async function freeze(id: number) {
  return await instance.get("/user/freeze", {
    params: {
      id,
    },
  });
}

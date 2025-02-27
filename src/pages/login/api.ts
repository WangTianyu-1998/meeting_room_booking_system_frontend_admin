import { instance } from "../../utils/axios";

export async function login(params: { username: string; password: string }) {
  return await instance.post("/user/admin/login", params);
}

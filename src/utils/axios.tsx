import { message } from "antd";
import axios, { type Method } from "axios";

const baseURL = "http://localhost:3005/";
const instance = axios.create({
  baseURL, // 基地址
  timeout: 10000, // 超时时间
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const { data, config } = error.response;
    console.log("🚀 ~ data:", data);
    if (data.code !== 200 && data.code !== 201 && data.code !== 401) {
      message.error(data.message);
      return Promise.reject(error);
    }
    if (data.code === 401 && !config.url.includes("/user/admin/refresh")) {
      const res = await refreshToken();

      if (res.code === 200 || res.code === 201) {
        return instance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);

type Data<T> = {
  code: number;
  message: string;
  data: T;
};

const request = <T,>(
  url: string,
  method: Method = "GET",
  submitData?: object
) => {
  // return instance.request<{ name: 'jack'; age: 20 }, { name: 'jack'; age: 20 }>(
  return instance.request<T, Data<T>>({
    url,
    method,
    // 针对的get -> params / post -> data
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};

export { baseURL, instance, request };

async function refreshToken() {
  try {
    const res: any = await instance.get("/user/refresh", {
      params: {
        refresh_token: localStorage.getItem("refresh_token"),
      },
    });

    // 检查响应是否成功
    if (res?.code === 200) {
      localStorage.setItem("access_token", res.data.access_token || "");
      localStorage.setItem("refresh_token", res.data.refresh_token || "");
      return res;
    }
    throw new Error(res.data?.message || "刷新token失败");
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return Promise.reject(error);
  }
}

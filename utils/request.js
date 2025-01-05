import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.defaults.timeout = 12000;

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // const requestUrl = config.url || ''; // 请求路径
    // const token = getStorage(ACCESS_TOKEN);
    // if (requestUrl && !noTokenUrl.includes(requestUrl)) {
    //   if (token) {

    //     config.headers['Authorization'] = token;
    //   }
    // }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;

import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://netease-cloud-music-api-mu-eosin.vercel.app',
  timeout: 5000,
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data as any;
  },
  function (error) {
    // 对响应错误做点什么
    return error;
  }
);

export default axiosApi;
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://netease-cloud-music-api-mu-eosin.vercel.app',
  timeout: 5000,
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么
    console.log('config:', config);
    // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
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
    console.log('response:', response);
    const { code, data } = response.data;
    if (code === 200) return data;
      return Promise.reject(data);
  },
  function (error) {
    // 对响应错误做点什么
    console.log('error-response:', error.response);
    console.log('error-config:', error.config);
    console.log('error-request:', error.request);
    return Promise.reject(error);
  }
);

export default axiosApi;
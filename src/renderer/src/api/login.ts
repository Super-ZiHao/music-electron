import { LoginApi, LoginStatusResponse, LogoutResponse, QRKeyResponse, QRStatusResponse, QRUrlResponse } from '@renderer/typings/api/login';
import axiosApi from './axios';

/** 获取二维码 key */
const getQRKey = () => axiosApi.get('login/qr/key').then((data: any) => data.data as QRKeyResponse);

/** 获取二维码 url */
const getQRUrl = (key: string) => axiosApi.get(`login/qr/create?key=${key}`).then((data: any) =>  data.data as QRUrlResponse);

/** 获取二维码当前状态 */
const getQRStatus = (key: string) => new Promise<QRStatusResponse>((resolve, rej) => {
  const time = new Date().getTime();
  axiosApi.get(`login/qr/check?key=${key}&time=${time}`).then(res => resolve(res as any)).catch(err => rej(err));
});

/** 登陆状态 */
const getLoginStatus = () => new Promise<LoginStatusResponse | undefined>((resolve, reject) => {
  axiosApi.get('login/status').then((res: any) => {
    const data = res.data.profile;
    resolve(data ? ({
      id: data.userId,
      name: data.nickname,
      signature: data.signature,
      backgroundUrl: data.backgroundUrl,
      avatarUrl: data.avatarUrl,
    }) : undefined);
  }).catch(err => reject(err));
});

/** 登出 */
const logout = () => new Promise<LogoutResponse>((resolve, reject) => axiosApi.get(`logout?cookie=${localStorage.getItem('cookie')}`)
  .then(res => resolve(res as any))
  .catch(err => reject(err)));

export const loginApi: LoginApi = {
  getQRKey,
  getQRUrl,
  getQRStatus,
  getLoginStatus,
  logout,
};
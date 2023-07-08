import axiosApi from './axios';

type QEKeyData = { code: number, unikey: string };
/** 获取二维码 key */
export const getQRKeyApi = () => new Promise<QEKeyData>((resolve, reject) => {
  axiosApi.get('login/qr/key').then((data: any) => {
    resolve(data.data);
  })
  .catch(err => reject(err));
});

type QEUrlData = { qrimg: string, qrurl: string };
/** 获取二维码 url */
export const getQRUrlApi = (key: string) => new Promise<QEUrlData>((resolve, reject) => {
  axiosApi.get(`login/qr/create?key=${key}`).then((data: any) => {
    resolve(data.data);
  })
  .catch(err => reject(err));
});

type StatusType = {
  code: number;
  message: string;
  cookie: string;
}
/** 获取二维码当前状态 */
export const getQRStatusApi = (key: string) => new Promise<StatusType>((resolve, reject) => {
  const time = new Date().getTime();
  axiosApi.get(`login/qr/check?key=${key}&time=${time}`).then((data: any) => {
    resolve(data);
  })
  .catch(err => reject(err));
});

type LoginStatus = {
  /** 头像 */
  avatarImgId: number;
  avatarUrl: string;
  /** 用户昵称 */
  name: string;
  /** 用户id */
  id: number;
  /** 个签 */
  signature: string;
  /** 封面图 */
  backgroundImgId: number;
  backgroundUrl: string;
}
/** 登陆状态 */
export const getLoginStatusApi = () => new Promise<LoginStatus | undefined>((resolve, reject) => {
  axiosApi.get('login/status').then((res: any) => {
    const data = res.data.profile;
    resolve(data ? ({
      id: data.userId,
      name: data.nickname,
      signature: data.signature,
      backgroundImgId: data.backgroundImgId,
      backgroundUrl: data.backgroundUrl,
      avatarImgId: data.avatarImgId,
      avatarUrl: data.avatarUrl,
    }) : undefined);
  })
  .catch(err => reject(err));
});

export const loginOutApi = () => new Promise((resolve, reject) => {
  axiosApi.get(`logout?cookie=${localStorage.getItem('cookie')}`).then((res: any) => {
    resolve(res);
  })
  .catch(err => reject(err));
});
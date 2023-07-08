/**
 * 登录请求接口响应数据
 */

/** 二维码key */
export type QRKeyResponse = { code: number, unikey: string };

/** 二维码地址 */
export type QRUrlResponse = { qrimg: string, qrurl: string };

/** 二维码状态 */
export type QRStatusResponse = {
  code: number;
  message: string;
  cookie: string;
}

/** 登录状态 */
export type LoginStatusResponse = {
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

/** 退出登录 */
export type LogoutResponse = { code: number };

export type LoginApiType = {
  getQRKey(): Promise<QRKeyResponse>;
  getQRUrl(key: string): Promise<QRUrlResponse>;
  getQRStatus(key: string): Promise<QRStatusResponse>;
  getLoginStatus(): Promise<LoginStatusResponse | undefined>;
  logout(): Promise<LogoutResponse>;
}
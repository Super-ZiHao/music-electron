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
  /** 用户id */
  id: number;
  /** 头像 */
  avatarUrl: string;
  /** 用户昵称 */
  name: string;
  /** 个签 */
  signature: string;
  /** 封面图 */
  backgroundUrl: string;
}

/** 退出登录 */
export type LogoutResponse = { code: number };

/** 登录模块 */
export interface LoginApi {
  getQRKey(): Promise<QRKeyResponse>;
  /**
   * 获取登录二维码url
   * @param key 二维码唯一 key
   */
  getQRUrl(key: string): Promise<QRUrlResponse>;
  /**
   * 获取扫码后响应登录状态
   * @param key 二维码唯一 key
   */
  getQRStatus(key: string): Promise<QRStatusResponse>;
  /** 获取登录状态 */
  getLoginStatus(): Promise<LoginStatusResponse | undefined>;
  /** 退出登录 */
  logout(): Promise<LogoutResponse>;
}
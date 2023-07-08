import { IpcKey } from '@typings';

const { ipcRenderer } = window.electron;

/** 打开二维码登陆窗口 */
export const openQRWindows = () => {
  ipcRenderer?.send(IpcKey.OPEN_QR_WINDOWS);
};

/** 关闭二维码窗口 */
export const closeQRWindows = (cookie?: string) => {
  ipcRenderer?.send(IpcKey.CLOSE_QR_WINDOWS, cookie);
};
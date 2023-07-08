import { IpcKey } from '@renderer/types';

const { ipcRenderer } = window.electron;

/** 打开二维码登陆窗口 */
export const openQRWindows = () => {
  ipcRenderer?.send(IpcKey.OPEN_QR_WINDOWS);
};

export const closeQRWindows = (cookie?: string) => {
  ipcRenderer?.send(IpcKey.CLOSE_QR_WINDOWS, cookie);
};
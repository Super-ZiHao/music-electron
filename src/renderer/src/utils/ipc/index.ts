import { QR_Ipc_Key } from '@typings/ipcEnum';

const electron = window?.electron;
const ipcRenderer = electron?.ipcRenderer;

/** 打开二维码登陆窗口 */
export const openQRWindows = () => {
  ipcRenderer?.send(QR_Ipc_Key.OPEN_QR_WINDOWS);
};

/** 关闭二维码窗口 */
export const closeQRWindows = (cookie?: string) => {
  ipcRenderer?.send(QR_Ipc_Key.CLOSE_QR_WINDOWS, cookie);
};
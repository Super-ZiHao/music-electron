import { IpcKey } from '@typings/index';

export const openQRWindows = () => {
  console.log(window.electron.ipcRenderer.send(IpcKey.OPEN_QR_WINDOWS));
};
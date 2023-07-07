import { IpcKey } from '@typings/index';
import { ipcMain } from 'electron';

export default function ipcMainOn () {
  /** 创建二维码窗口 */
  ipcMain.on(IpcKey.OPEN_QR_WINDOWS, (e) => {
    console.log(123, e);
  });
}

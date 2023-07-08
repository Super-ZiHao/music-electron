import { is } from '@electron-toolkit/utils';
import { IpcKey } from '@typings/index';
import { BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { mainWindow } from './index';

let qr_window: BrowserWindow | undefined;
/** 创建二维码窗口 */
ipcMain.on(IpcKey.OPEN_QR_WINDOWS, () => {
  if (!qr_window) {
    qr_window = new BrowserWindow({
      width: 300,
      height: 400,
      resizable: false,
      frame: false, // 使用无边框
      titleBarStyle: 'default',
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      },
    });
    if (is.dev) {
      qr_window.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/qr-code');
    } else {
      qr_window.loadFile(join(__dirname, '../renderer/index.html') + '/qr-code');
    }
    qr_window.on('ready-to-show', () => {
      qr_window?.show();
    });
  } else {
    qr_window.show();
  }
});

/** 关闭二维码窗口 */
ipcMain.on(IpcKey.CLOSE_QR_WINDOWS, (e, cookie?: string) => {
  if (cookie) { // 发送cookie返回给主窗口
    mainWindow?.webContents.send(IpcKey.QR_TO_INDEX, cookie);
  }
  qr_window?.close();
  qr_window = undefined;
});
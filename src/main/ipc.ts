import { is } from '@electron-toolkit/utils';
import { IpcKey } from '@renderer/types';
import { BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
let qr_window: BrowserWindow | undefined;
/** 创建二维码窗口 */
ipcMain.on(IpcKey.OPEN_QR_WINDOWS, () => {
  if (!qr_window) {
    qr_window = new BrowserWindow({
      maxWidth: 300,
      minWidth: 300,
      width: 300,
      maxHeight: 400,
      minHeight: 400,
      height: 400,
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
ipcMain.on(IpcKey.CLOSE_QR_WINDOWS, () => {
  qr_window?.close();
  qr_window = undefined;
});
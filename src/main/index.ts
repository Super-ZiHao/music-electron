import { app, shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import './ipc';

function createWindow(): void {
  // 创建浏览器窗口。
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false, // 使用无边框
    titleBarStyle: 'hidden', // 使用 mac 原生自带的小绿灯
  });

  // const child = new BrowserWindow({ parent: mainWindow, width: 300, height: 400, titleBarStyle: 'hidden', frame: false, maxWidth: 300, maxHeight: 400, minWidth: 300, minHeight: 400 });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // 基于electronic vite cli的渲染器HMR。
  // 加载用于开发的远程URL或用于生产的本地html文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// 这种方法将在Electron完成后调用
// 初始化，并准备创建浏览器窗口。
// 某些API只能在此事件发生后使用。
app.whenReady().then(() => {
  // 设置窗口的应用程序用户模型id
  electronApp.setAppUserModelId('com.electron');

  // 开发中默认按F12打开或关闭DevTools
  // 在生产中忽略CommandOrControl+R。
  // 看 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // 在macOS上，当点击停靠图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口后退出，macOS除外。在那里，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
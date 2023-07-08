import { NodeProcess } from '@electron-toolkit/preload';
import { IpcRenderer, WebFrame } from 'electron';

/** 定义渲染进程全局 electron 类型 */
declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
      process: NodeProcess;
      webFrame: WebFrame;
    }
  }
}
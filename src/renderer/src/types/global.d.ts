import { NodeProcess } from '@electron-toolkit/preload';
import { IpcRenderer, WebFrame } from 'electron';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
      process: NodeProcess;
      webFrame: WebFrame;
    }
  }
}
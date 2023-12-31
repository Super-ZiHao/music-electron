/**
 * 本文件存储进程之间交互的 Key
 */


/** 二维码窗口相关Key */
export enum QR_Ipc_Key {
  /** 打开二维码窗口 */
  OPEN_QR_WINDOWS = 'open-qr-windows',
  /** 关闭二维码窗口 */
  CLOSE_QR_WINDOWS = 'close-qr-windows',
  /** 从 QR 返回 cookies 给主页面 */
  QR_TO_INDEX = 'qr-to-index',
}

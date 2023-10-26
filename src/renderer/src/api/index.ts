import { LoginApi } from '@renderer/typings/api/login';
import { PlayListApi } from '@renderer/typings/api/paylist';
import { loginApi } from './login';
import { playListApi } from './playList';

interface API {
  /** 用户登录模块 */
  login(): LoginApi;
  /** 音乐歌单模块 */
  playList(): PlayListApi;
}

class Api implements API {
  login() {
    return loginApi;
  }
  playList(): PlayListApi {
    return playListApi;
  }
}

/** 全局 api 调用总接口 */
export default new Api();
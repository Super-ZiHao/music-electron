import { LoginApi } from '@renderer/typings/api/login';
import { PlayListApi } from '@renderer/typings/api/paylist';
import { loginApi } from './login';
import { playListApi } from './playList';

interface API {
  login(): LoginApi;
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

export default new Api();
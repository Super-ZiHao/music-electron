import { LoginApi } from '@renderer/typings/api/login';
import { UserApi } from '@renderer/typings/api/user';
import { loginApi } from './login';
import { userApi } from './user';

interface API {
  login(): LoginApi;
  user(): UserApi;
}

class Api implements API {
  login() {
    return loginApi;
  }
  user(): UserApi {
    return userApi;
  }
}

export default new Api();
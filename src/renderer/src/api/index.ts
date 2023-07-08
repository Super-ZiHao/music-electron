import { LoginApiType } from '@renderer/typings/login';
import { loginApi } from './login';

interface API {
  login():LoginApiType;
}

class Api implements API {
  login() {
    return loginApi;
  }
}

export default new Api();
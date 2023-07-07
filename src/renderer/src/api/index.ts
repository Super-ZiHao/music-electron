interface ApiInterface {
  /** 游客登陆 */
  Anonimous: () => void;
}

class Api implements ApiInterface {
  Anonimous() {
    console.log('游客登陆');
  }
}

let api: any = null;
const useApi: () => ApiInterface = () => {
  if (!api) {
    api = new Api();
  }
  return api;
};

export default useApi;
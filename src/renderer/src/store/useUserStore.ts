import { getLoginStatusApi } from '@renderer/api/login';

/**
 * 当前登陆用户的状态和信息
 */
type UserInfoType = {
  id?: number;
  name?: string;
  /** 头像 */
  avatarImgId?: number;
  avatarUrl?: string;
  /** 个签 */
  signature?: string;
  /** 封面图 */
  backgroundImgId?: number;
  backgroundUrl?: string;
}
type StatusType = {
  isLogin?: boolean;
}
const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfoType>({
    name: '',
    avatarUrl: '',
    signature: '',
    backgroundUrl: '',
  });
  const status = reactive<StatusType>({
    isLogin: false,
  });

  /** 更新 login 状态 */
  const updateLogin = () => {
    getLoginStatusApi().then(res => {
      if (res)  {
        console.log(res);
        status.isLogin = true;
        userInfo.id = res.id;
        userInfo.avatarImgId = res.avatarImgId;
        userInfo.avatarUrl = res.avatarUrl;
        userInfo.backgroundImgId = res.backgroundImgId;
        userInfo.backgroundUrl = res.backgroundUrl;
        userInfo.name = res.name;
        userInfo.signature = res.signature;
      } else {
        status.isLogin = false;
      }
    })
    .catch(err => {
      console.log(err, '错误');
      status.isLogin = false;
    });
  };

  return {
    ...toRefs(userInfo),
    ...toRefs(status),
    updateLogin
  };
});

export default useUserStore;
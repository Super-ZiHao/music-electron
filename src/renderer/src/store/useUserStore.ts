import api from '@renderer/api';
import { LoginStatusResponse } from '@renderer/typings/api/login';
import { UserPlayListResponse } from '@renderer/typings/api/paylist';

/**
 * 当前登陆用户的状态和信息
 */
interface UserInfoType extends Partial<LoginStatusResponse> {
  playList: UserPlayListResponse[]
}
type StatusType = {
  isLogin?: boolean;
}
const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfoType>({
    id: undefined,
    name: '',
    avatarUrl: '',
    signature: '',
    backgroundUrl: '',
    playList: [],
  });
  const status = reactive<StatusType>({
    isLogin: false,
  });

  /** 更新 login 状态 */
  const updateLogin = () => {
    api.login().getLoginStatus().then(res => {
      if (res)  {
        status.isLogin = true;
        userInfo.id = res.id;
        userInfo.avatarUrl = res.avatarUrl;
        userInfo.backgroundUrl = res.backgroundUrl;
        userInfo.name = res.name;
        userInfo.signature = res.signature;
      } else {
        status.isLogin = false;
      }
    })
    .catch(() => {
      status.isLogin = false;
    });
  };

  watchEffect(() => {
    if (userInfo.id) {
      api.playList().getUserPlayList(userInfo.id)
        .then(res => userInfo.playList = res);
    }
  });

  return {
    ...toRefs(userInfo),
    ...toRefs(status),
    updateLogin
  };
});

export default useUserStore;

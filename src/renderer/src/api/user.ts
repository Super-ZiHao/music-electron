import { UserApi, UserPlayListResponse } from '@renderer/typings/api/user';
import axiosApi from './axios';

/** 获取用户歌单 */
const getUserPlayList = (id: number) => new Promise<UserPlayListResponse[]>((reslove, reject) => {
  axiosApi.get(`/user/playlist?uid=${id}`)
    .then((res: any) => {
      reslove(res.playlist.map((item: any) => ({
        id: item.id,
        name: item.name,
        coverImgUrl: item.coverImgUrl,
        description: item.description
      })));
    })
    .catch(err => {
      reject(err);
    });
});

export const userApi: UserApi = {
  getUserPlayList,
};
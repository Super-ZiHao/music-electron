import { PlayListApi, MusicInfoType, UserPlayListResponse } from '@renderer/typings/api/paylist';
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

/** 获取我的喜欢列表所有ID */
const getUserLikePlayListID = (id: number) => new Promise<number[]>((resolve, reject) => {
  axiosApi.get(`/likelist?uid=${id}`)
    .then((res: any) => {
      resolve(res);
    })
    .catch(err => reject(err));
});

/** 获取歌单详情 */
const getPlayListDetails = (id: number) => new Promise<MusicInfoType[]>((resolve, reject) => {
  axiosApi.get(`/playlist/track/all?id=${id}`)
    .then((res: any) => {
      resolve(res.songs.map((item: any) => ({ 
        ...item,
        authors: item.ar,
        album: item.al,
        songPermissions: item.fee,
        time: item.dt
      })));
    })
    .catch(err => reject(err));
});

export const playListApi: PlayListApi = {
  getUserPlayList,
  getPlayListDetails,
  getUserLikePlayListID,
};
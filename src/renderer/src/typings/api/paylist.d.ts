export type UserPlayListResponse = {
  /** 歌单 id */
  id: number;
  /** 歌单名 */
  name: string;
  /** 歌单简介 */
  description: null | string;
  /** 歌单封面图 */
  coverImgUrl: string;
}

export interface PlayListApi {
  /** 获取用户歌单 */
  getUserPlayList: (id: number) => Promise<UserPlayListResponse[]>;
  /** 获取我的喜欢所有歌 ID */
  getUserLikePlayListID: (id: number) => Promise<number[][]>;
  getPlayListDetails: (id: number) => Promise<any>;
}
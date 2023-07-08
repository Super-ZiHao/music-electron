export type UserPlayListResponse = {
  /** 歌单 id */
  id: number;
  /** 歌单名 */
  name: string;
  /** 歌单简介 */
  description: null | string;
  /** 歌单封面图 */
  coverImgUrl: string;
}[]

export interface UserApi {
  getUserPlayList: (id: number) => Promise<UserPlayListResponse[]>
}
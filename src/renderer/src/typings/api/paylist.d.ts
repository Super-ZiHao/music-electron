/** 用户歌单响应数据 */
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

enum SongPermissions {
  /** 免费 */
  FREE = 0,
  /** vip 可播放下载 */
  VIP = 1,
  /** 购买专辑后可播放下载 */
  MUST_PURCHASE = 4,
  /** 可以听，下载需要会员 */
  CAN_LISTEN = 8
}

/** 歌曲数据 */
export type MusicInfoType = {
  /** 歌曲 id */
  id: number;
  /** 歌曲时长 */
  time: number;
  /** 封面图 */
  picUrl?: string;
  /** 歌名 */
  name: string;
  /** 歌手 */
  authors: { id: number, name: string }[];
  /** 专辑 */
  album?: { 
    id: number;
    name: string;
    /** 专辑封面图 */
    picUrl: string;
  };
  /** 歌曲权限 */
  songPermissions?: SongPermissions
};

export interface PlayListApi {
  /**
   * 获取用户歌单
   * @param id 用户唯一ID
   */
  getUserPlayList: (id: number) => Promise<UserPlayListResponse[]>;
  /** 获取我的喜欢所有歌 ID */
  getUserLikePlayListID: (id: number) => Promise<number[]>;
  /** 获取歌单详情 */
  getPlayListDetails: (id: number) => Promise<MusicInfoType[]>;
}
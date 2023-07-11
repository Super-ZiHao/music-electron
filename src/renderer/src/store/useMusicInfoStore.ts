/**
 * 存储当前播放音乐数据
 */
export type MusicStoreInfoType = {
  /** 音乐唯一 ID */
  id?: any;
  /** 音乐总时长 */
  time: number;
  /** 歌曲名 */
  name: string;
  /** 封面图 */
  picUrl: string;
  /** 歌手信息 */
  authors: {
    id: any;
    name: string;
  }[]
}
// 当前音乐核心
const useMusicStore = defineStore('musicInfo', () => {

  /** 当前使用歌曲数据 */
  const musicInfo = reactive<MusicStoreInfoType>({
    id: 2020033539,
    picUrl: 'https://p2.music.126.net/jx3orXlYv0HkCEzS4FNv_Q==/109951168287045764.jpg',
    name: '破败花园',
    time: 222279,
    authors: [
      {
        id: 36562889,
        name: '吴垚滔',
      },
    ]
  });

  const toggleMusic = (data: MusicStoreInfoType) => {
    musicInfo.authors = data.authors;
    musicInfo.id = data.id;
    musicInfo.name = data.name;
    musicInfo.picUrl = data.picUrl;
    musicInfo.time = data.time;
  };

  return {
    ...toRefs(musicInfo),
    toggleMusic
  };
});

export default useMusicStore;

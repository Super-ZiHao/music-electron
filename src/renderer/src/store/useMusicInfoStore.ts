/**
 * 存储当前播放音乐数据
 */
type MusicInfoType = {
  /** 音乐唯一 ID */
  id?: any;
  /** 音乐文件类型 */
  type: 'mp3';
  /** 音乐地址 */
  url: string;
  /** 音乐总时长 */
  time: number;
  /** 歌曲名 */
  name: string;
  /** 封面图 */
  picUrl: string;
  /** 歌手信息 */
  authorInfo: {
    id: any;
    name: string;
  }
}
// 当前音乐核心
const useMusicStore = defineStore('musicInfo', () => {

  /** 当前使用歌曲数据 */
  const musicInfo = reactive<MusicInfoType>({
    id: 2020033539,
    type: 'mp3',
    // url: 'http://m801.music.126.net/2023070610618/a36d229501e72f4ee6bc8cf22de51914/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24600468622/21d9/e7bc/feaa/17aad0d1bcecf99b9470356c6e31abee.mp3',
    url: 'https://music.163.com/song/media/outer/url?id=2020033539',
    picUrl: 'https://p2.music.126.net/jx3orXlYv0HkCEzS4FNv_Q==/109951168287045764.jpg',
    name: '破败花园',
    time: 222279,
    authorInfo: {
      id: 36562889,
      name: '吴垚滔',
    }
  });

  return {
    ...toRefs(musicInfo)
  };
});

export default useMusicStore;

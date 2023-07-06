import { defineStore } from 'pinia';

type PlayerType = {
  /** 当前播放时间 */
  currentTime: number;
  /** 是否播放 */
  isPlay: boolean;
  /** 播放事件 */
  onPlay: () => void;
  /** 暂停事件 */
  onPause: () => void;
};
type MusicInfoType = {
  /** 音乐唯一 ID */
  id?: any;
  /** 音乐地址 */
  url: string;
  /** 音乐总时长 */
  time: number;
}
// 当前音乐核心
const useMusicStore = defineStore('music', () => {
  const audioRef = ref<HTMLAudioElement>();

  onMounted(() => {
    const update = (e: any) => {
      controller.currentTime = e.timeStamp;
    };
    audioRef.value?.addEventListener('timeupdate', update);

    onUnmounted(() => {
      audioRef.value?.removeEventListener('timeupdate', update);
    });
  });


  /** 当前使用歌曲数据 */
  const musicInfo = reactive<MusicInfoType>({
    id: undefined,
    // url: 'http://m801.music.126.net/20230706210618/a36d229501e72f4ee6bc8cf22de51914/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/24600468622/21d9/e7bc/feaa/17aad0d1bcecf99b9470356c6e31abee.mp3',
    url: 'https://music.163.com/song/media/outer/url?id=2020033539',
    time: 222279,
  });

  /** 当前播放器状况 */
  const onPlay = () => {
    audioRef.value?.play?.();
    controller.isPlay = true;
  };
  const onPause = () => {
    audioRef.value?.pause?.();
    controller.isPlay = false;
  };
  const controller  = reactive<PlayerType>({
    currentTime: 50,
    isPlay: false,
    onPlay,
    onPause,
  });


  return {
    audioRef,
    musicInfo,
    controller,
  };
});

export default useMusicStore;

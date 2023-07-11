/**
 * 当前播放器控制以及播放器状态
 */
type ContersollerType = {
  /** 是否播放 */
  isPlay: boolean;
  /** 当前播放时长 */
  currentTime: number;
  /** 是否静音 */
  isMute: boolean;
  /** 当前音量 */
  currentVolume: number;
}
// 当前音乐核心
const useControllerStore = defineStore('controller', () => {
  const audioRef = ref<HTMLAudioElement>();

  const controlData = reactive<ContersollerType>({
    isPlay: (audioRef.value?.paused) ?? false,
    currentTime: 0,
    isMute: (audioRef.value?.muted) ?? false,
    currentVolume: 100,
  });

  onMounted(() => {
    let canPlayFlg = true;
    const update = (e: any) => {
      controlData.currentTime = e.target.currentTime * 1000;
    };
    
    const onCanPlay = () => {
      if (canPlayFlg) return canPlayFlg = false;
      controlData.currentTime = 0;
      controlFun.onPlay();
    };
    audioRef.value?.addEventListener('canplay', onCanPlay);
    audioRef.value?.addEventListener('timeupdate', update);
    onUnmounted(() => {
      audioRef.value?.removeEventListener('timeupdate', update);
      audioRef.value?.removeEventListener('canplay', onCanPlay);
    });
  });

  const controlFun = {
    onPlay() { // 播放
      audioRef.value?.play?.();
      controlData.isPlay = true;
    },
    onPause() { // 暂停
      audioRef.value?.pause?.();
      controlData.isPlay = false;
    },
    onChangeTime(time: number) { // 改变播放时间
      if (!audioRef.value) return;
      audioRef.value.currentTime = time / 1000;
      controlData.currentTime = time;
    },
    onMute() { // 静音
      if (!audioRef.value) return;
      controlData.isMute = true;
      audioRef.value.muted = true;
    },
    onNotMute() { //解除静音
      if (!audioRef.value) return;
      if (controlData.currentVolume === 0) {
        audioRef.value.volume = 1;
        controlData.currentVolume = 100;
      }
      controlData.isMute = false;
      audioRef.value.muted = false;
    },
    onChangeVolume(volume: number) { // 改变音量
      if (!audioRef.value) return;
      if (volume === 0) {
        controlFun.onMute();
      } else {
        controlFun.onNotMute();
      }
      audioRef.value.volume = volume / 100;
      controlData.currentVolume = volume;
    }
  };

  return {
    audioRef,
    ...toRefs(controlData),
    ...controlFun,
  };
});

export default useControllerStore;

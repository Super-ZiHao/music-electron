import { defineStore } from 'pinia';

// 当前音乐核心
const useControllerStore = defineStore('controller', () => {
  const audioRef = ref<HTMLAudioElement>();

  const isPlay = ref(false);

  const currentTime = ref(0);

  onMounted(() => {
    const update = (e: any) => {
      currentTime.value = e.target.currentTime * 1000;
    };
    audioRef.value?.addEventListener('timeupdate', update);

    onUnmounted(() => {
      audioRef.value?.removeEventListener('timeupdate', update);
    });
  });

  /** 当前播放器状况 */
  const onPlay = () => {
    audioRef.value?.play?.();
    isPlay.value = true;
  };
  const onPause = () => {
    audioRef.value?.pause?.();
    isPlay.value = false;
  };
  const onChangeTime = (time: number) => {
    if (!audioRef.value) return;
    audioRef.value.currentTime = time;
    currentTime.value = time * 1000;
  };

  return {
    audioRef,
    currentTime,
    isPlay,
    onPlay,
    onPause,
    onChangeTime,
  };
});

export default useControllerStore;

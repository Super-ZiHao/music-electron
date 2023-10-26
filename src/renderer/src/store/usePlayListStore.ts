import { MusicInfoType } from '@renderer/typings/api/paylist';
import useMusicStore from './useMusicInfoStore';

// 当前播放列表
const usePlayListStore = defineStore('playList', () => {
  const { id } = storeToRefs(useMusicStore());
  const { onToggleMusic } = useMusicStore();
  /** 播放列表是否显示 */
  const showPlayList = ref<boolean>(false);
  /** 当前播放列表数据 */
  const playList = ref<MusicInfoType[]>([]);

  const controlFun = {
    /** 切换显示播放列表 */
    onToggleShowPlayList() {
      showPlayList.value = !showPlayList.value;
    },
    /** 更新当前播放列表 */
    onUpdatePlayList(data: MusicInfoType[]) {
      playList.value = data;
    },
    /** 切换上一首 */
    onPrev() {
      const currentIndex = playList?.value?.findIndex((item) => item.id === id.value);
      if (currentIndex === 0) {
        onToggleMusic(playList.value[playList.value.length - 1]);
      } else {
        onToggleMusic(playList.value[currentIndex - 1]);
      }
    },
    onNext() {
      const currentIndex = playList.value.findIndex((item) => item.id === id.value);
      if (currentIndex === playList.value.length - 1) {
        onToggleMusic(playList.value[0]);
      } else {
        onToggleMusic(playList.value[currentIndex + 1]);
      }
    }
    /** 切换下一首 */
  };

  return {
    showPlayList,
    playList,
    ...controlFun,
  };
});

export default usePlayListStore;

import { MusicInfoType } from '@renderer/typings/api/paylist';
import useControllerStore from './useControllerStore';

const LOCALSTORAGE_KEY = 'music-info';
// 当前音乐核心
const useMusicStore = defineStore('musicInfo', () => {
  const { audioRef } = storeToRefs(useControllerStore());
  const { onPause, onPlay } = useControllerStore();

  /** 默认歌曲 */
  const defaultInfoString = localStorage.getItem(LOCALSTORAGE_KEY);
  const defaultInfo:MusicInfoType = defaultInfoString ? JSON.parse(defaultInfoString) : {
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
  };
  /** 当前使用歌曲数据 */
  const musicInfo = reactive<MusicInfoType>(defaultInfo);

  const handlerPlay = () => {
    onPlay();
    audioRef.value?.removeEventListener('canplay', handlerPlay);
  };
  const onToggleMusic = (data: MusicInfoType) => {
    onPause();
    audioRef.value?.addEventListener('canplay', handlerPlay);
    musicInfo.authors = data.authors;
    musicInfo.id = data.id;
    musicInfo.name = data.name;
    musicInfo.picUrl = data.picUrl;
    musicInfo.time = data.time;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  };

  return {
    ...toRefs(musicInfo),
    onToggleMusic 
  };
});

export default useMusicStore;

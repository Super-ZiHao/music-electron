type MusicType = {
  /** 音乐唯一 ID */
  id?: any;
  /** 音乐地址 */
  url: string;
}
// 当前音乐核心
const musicStore = defineStore('music', () => {
  const data = reactive<MusicType>({
    id: undefined,
    url: '',
  });
  return {
    data
  };
});

export default musicStore;

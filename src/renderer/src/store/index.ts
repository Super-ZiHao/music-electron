import musicStore from './musicStore';

interface AppStore {
  musicStore: ReturnType<typeof musicStore>
}

const appStore: AppStore = {} as AppStore;
// 注册机
export const registerStore = () => {
  appStore.musicStore = musicStore();
};
export default appStore;
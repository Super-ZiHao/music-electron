import appStore from '@/store';

export const successMessage = () => {
  const { num } = storeToRefs(appStore.testStore);
  ElMessage({
    message: `成功，当前-${num.value}`,
    type: 'success',
  });
};

// 防抖 ref
export function useDebouncedRef(value: any, delay = 200) {
  let timeout: any;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}


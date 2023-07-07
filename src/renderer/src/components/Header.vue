<script lang='ts' setup>
import { IconNext, IconBack } from '@renderer/components/Icon';
import useUserStore from '@renderer/store/useUserStore';
import { useDebouncedRef } from '@renderer/utils/hooks';
import { openQRWindows } from '@renderer/utils/ipc';

/** 处理聚焦 input 下拉提示框显示隐藏逻辑 */
const showTooltip = useDebouncedRef(false, 100);
const searchTooltipRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();
const onFocusInput = () => {
  showTooltip.value = true;
  const callback = (e: any) => {
    if (!searchTooltipRef.value || !inputRef.value) return;
    if (searchTooltipRef.value.contains(e.target) || inputRef.value.contains(e.target)) return;
    showTooltip.value = false;
    document.removeEventListener('down', callback);
  };
  document.addEventListener('click', callback);
};

/** 用户数据 */
const { avatarUrl, name, isLogin } = storeToRefs(useUserStore());

</script>

<template>
  <header class="drag">
    <div class="flex items-center pr-16 justify-end gap-16" style="width:180px">
      <IconBack class="cursor-pointer no-drag" :size="24" color="white" />
      <IconNext class="cursor-pointer no-drag" :size="24" color="white" />
    </div>
    <div class="relative flex items-center justify-between pl-16 pr-16 flex-1 height-100">
      <!-- 搜索框 -->
      <div class="flex items-center gap-8 height-100">
        <div ref="inputRef">
          <ElInput placeholder="搜索音乐" @focus="onFocusInput" class="no-drag" />
        </div>
        <!-- 搜索提示框 -->
        <div v-show="showTooltip" class="search-tooltip" ref="searchTooltipRef">
          <div>搜索提示</div>
          <div class="321">321</div>
        </div>
      </div>

      <!-- 头像 -->
      <div class="flex items-center gap-4 cursor-pointer no-drag" @click="isLogin ? undefined : openQRWindows">
        <div class="color-white">{{ name }}</div>
        <ElAvatar class="avatar" :size="28" :src="avatarUrl" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  background-color: #292929;
  user-select: none;
}

.search-tooltip {
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 300px;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: white;
}

::v-deep(.el-avatar) {
  img {
    -webkit-user-drag: none;
  }
}

::v-deep(.el-input) {
  --el-component-size: 26px;
  --el-input-width: 200px;

  cursor: pointer;
}
</style>
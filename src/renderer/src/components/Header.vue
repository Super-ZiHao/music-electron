<script lang='ts' setup>
import { IconNext, IconBack } from '@/components/Icon';
import { useDebouncedRef } from '@/utils';

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

</script>

<template>
  <header>
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
      <div class="flex items-center gap-4 cursor-pointer no-drag">
        <div class="color-white">逾期～</div>
        <ElAvatar class="avatar" :size="28"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.no-drag {
  -webkit-app-region: no-drag;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  background-color: #292929;
  -webkit-app-region: drag;
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
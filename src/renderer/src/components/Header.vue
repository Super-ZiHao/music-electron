<script lang='ts' setup>
import { IconNext, IconBack } from '@renderer/components/Icon';
import useUserStore from '@renderer/store/useUserStore';
import { useDebouncedRef } from '@renderer/utils/hooks';
import { openQRWindows } from '@renderer/utils/ipc';
import api from '@renderer/api';

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
const { updateLogin } = useUserStore();

/** 头像逻辑 */
const dropDownRef = ref();
const onClickHead = () => {
  if (isLogin?.value) {
    dropDownRef.value.handleOpen();
  } else {
    openQRWindows();
  }
};

/** 退出登陆 */
const onLogout = () => {
  api.login().logout().then(() => {
    updateLogin();
  });
};

/** 搜索接口 */
const searchValue = ref('');
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
          <ElInput placeholder="搜索音乐" v-model="searchValue" @focus="onFocusInput" class="no-drag" />
        </div>
        <!-- 搜索提示框 -->
        <div v-show="showTooltip" class="search-tooltip" ref="searchTooltipRef">
          <div>搜索提示</div>
          <div class="321">321</div>
        </div>
      </div>


      <!-- 头像 -->
      <ElDropdown trigger="contextmenu" ref="dropDownRef">
        <div class="flex items-center gap-4 cursor-pointer no-drag" @click="onClickHead">
          <div class="color-white">{{ name }}</div>
          <ElAvatar class="avatar" :size="28" :src="avatarUrl" />
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="onLogout">退出登陆</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: var(--header-height);
  background-color: #292929;
  user-select: none;
}

.search-tooltip {
  position: absolute;
  top: var(--header-height);
  left: 0;
  z-index: 10;
  width: 300px;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: olive;
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
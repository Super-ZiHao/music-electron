<script setup lang="ts">
import useUserStore from '@renderer/store/useUserStore';

const { updateLogin } = useUserStore();
onMounted(() => {
  updateLogin();
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import url('./style.scss');

:root {
  --header-height: 48px;
  --sidebar-width: 180px;
  --footer-height: 60px;
}

.no-drag {
  // app 专用 让鼠标可以拖动窗口
  -webkit-app-region: no-drag;
}

.drag {
  -webkit-app-region: drag;
}
</style>
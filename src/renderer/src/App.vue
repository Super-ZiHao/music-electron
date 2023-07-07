<script setup lang="ts">
import Footer from '@renderer/components/Footer.vue';
import Header from '@renderer/components/Header.vue';
import Sidebar from '@renderer/components/Sidebar.vue';
import useMusicStore from './store/useMusicInfoStore';
import useControllerStore from './store/useControllerStore';

const musicInfo = useMusicStore();
const { audioRef } = toRefs(useControllerStore());
</script>

<template>
  <audio :src="musicInfo.url" style="display: none;" ref="audioRef" />
  <div class="container">
    <Header />
    <div class="content">
      <Sidebar />
      <div class="content-right">
        <RouterView color="blue" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import url('./style.scss');

:root {
  --header-height: 48px;
  --sidebar-width: 180px;
  --footer-height: 60px;
}

.container {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;

    .content-right {
      flex: 1;
    }
  }
}
</style>
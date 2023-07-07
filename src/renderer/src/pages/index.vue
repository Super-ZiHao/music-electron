<script setup lang="ts">
import Footer from '@renderer/components/Footer.vue';
import Header from '@renderer/components/Header.vue';
import Sidebar from '@renderer/components/Sidebar.vue';
import useMusicStore from '@renderer/store/useMusicInfoStore';
import useControllerStore from '@renderer/store/useControllerStore';

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
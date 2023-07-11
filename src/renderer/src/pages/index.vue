<script setup lang="ts">
import Footer from '@renderer/components/Footer.vue';
import Header from '@renderer/components/Header.vue';
import Sidebar from '@renderer/components/Sidebar.vue';
import useMusicStore from '@renderer/store/useMusicInfoStore';
import useControllerStore from '@renderer/store/useControllerStore';

const { id } = storeToRefs(useMusicStore());
const { audioRef, isPlay } = toRefs(useControllerStore());
const { onPause, onPlay } = useControllerStore();

/** 监听空格 */
onMounted(() => {
  let flg = true;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!(e.code === 'Space' || e.keyCode === 32) || !flg) return;
    if (isPlay.value) {
      onPause();
    } else {
      onPlay();
    }
    flg = false;
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (!(e.code === 'Space' || e.keyCode === 32)) return;
    flg = true;
  };
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  });
});
</script>

<template>
  <audio :src="`https://music.163.com/song/media/outer/url?id=${id}`" style="display: none;" ref="audioRef" />
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
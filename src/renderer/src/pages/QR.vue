<script lang='ts' setup>
import { IconClose } from '@renderer/components/Icon';
import QRCode from 'qrcode';
import { closeQRWindows } from '@renderer/utils/ipc';
import { getQRKeyApi, getQRUrlApi, getQRStatusApi } from '@renderer/api/login';
import useUserStore from '@renderer/store/useUserStore';

const { updateLogin } = useUserStore();

const qrRef = ref<HTMLCanvasElement>();
onMounted(() => {
  if (!qrRef.value) return;
  let timer: any = null;
  getQRKeyApi()
    .then(key => {
      getQRUrlApi(key.unikey)
        .then(url => {
          QRCode.toCanvas(qrRef.value, url.qrurl, {
            width: 300,
          });
          timer = setInterval(() => {
            getQRStatusApi(key.unikey).then(res => {
              if (res.code === 803) {
                clearInterval(timer);
                updateLogin();
                closeQRWindows(res.cookie);
              }
            });
          }, 1000);
        });
    });
  onUnmounted(() => {
    clearInterval(timer);
  });
});
</script>

<template>
  <header class="drag">
    <IconClose class="cursor-pointer no-drag" @click="closeQRWindows" :size="24" />
  </header>
  <main>
    <div class="flex justify-center fs-22">扫码登陆</div>
    <canvas class="qe-img" ref="qrRef" />
  </main>
</template>

<style lang='scss' scoped>
header {
  width: 100vw;
  height: 50px;
  box-sizing: border-box;
  padding: 12px;
}

main {
  position: relative;
  width: 100vw;
  height: calc(100vh - 50px);
}

.qe-img {
  width: 80%;
  aspect-ratio: 1;
}
</style>
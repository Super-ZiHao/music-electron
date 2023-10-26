<script lang='ts' setup>
import { IconClose } from '@renderer/components/Icon';
import QRCode from 'qrcode';
import { closeQRWindows } from '@renderer/utils/ipc';
import useUserStore from '@renderer/store/useUserStore';
import api from '@renderer/api';

const { updateLogin } = useUserStore();

const qrRef = ref<HTMLCanvasElement>();
onMounted(() => {
  if (!qrRef.value) return;
  const { getQRKey, getQRUrl, getQRStatus } = api.login();
  let timer: any = null;
  getQRKey()
    .then(key => {
      getQRUrl(key.unikey)
        .then(url => {
          QRCode.toCanvas(qrRef.value, url.qrurl, {
            width: 300,
          });
          timer = setInterval(() => {
            getQRStatus(key.unikey).then(res => {
              if (res.code === 803) {
                clearInterval(timer);
                updateLogin();
                closeQRWindows(res.cookie);
              }
            });
          }, 1000);
        });
    });
  onBeforeUnmount(() => {
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
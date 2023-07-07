<script lang='ts' setup>
import { IconClose } from '@renderer/components/Icon';
import { closeQRWindows } from '@renderer/utils/ipc';

const onClose = () => {
  closeQRWindows();
};
</script>

<template>
  <header class="drag">
    <IconClose class="cursor-pointer no-drag" @click="onClose" :size="24" />
  </header>
</template>

<style lang='scss' scoped>
header {
  width: 100vw;
  padding: 12px;
}
</style>
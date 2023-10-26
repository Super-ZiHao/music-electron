<script lang='ts' setup>
import useMusicStore from '@renderer/store/useMusicInfoStore';
import usePlayListStore from '@renderer/store/usePlayListStore';

const { showPlayList, playList } = storeToRefs(usePlayListStore());
const { id } = storeToRefs(useMusicStore());

</script>

<template>
  <div class="play-list" v-show="showPlayList">
    <div :class="`list-item ${item.id === id ? 'active' : ''}`" v-for="item in playList" :key="item.id">{{ item.name }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.play-list {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 20;
  overflow-y: overlay;
  width: 400px;
  height: 100%;
  background-color: pink;
}

.list-item.active {
  color: red;
  font-weight: 600;
}
</style>
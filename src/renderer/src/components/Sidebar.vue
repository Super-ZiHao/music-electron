<script lang='ts' setup>
import { IconLike, IconHistory } from './Icon';

const menuActive = ref(1);
const menuList = [
  { key: 1, text: '我的喜欢' },
  { key: 2, text: '历史播放' },
];
</script>

<template>
  <div class="sidebar">
    <ul>
      <li v-for="i in menuList" :key="i.key" :class="`item ${i.key === menuActive ? 'active' : ''}`"
        @click="menuActive = i.key">
        <IconLike v-if="i.key === 1" :size="18" />
        <IconHistory v-else :size="18" />
        {{ i.text }}
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.sidebar {
  flex-shrink: 0;
  width: var(--sidebar-width);
  height: 100%;
  padding: 12px 0;
  background-color: #565c63;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 18px;
  color: white;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background-color: #444a4f;
  }

  &.active {
    color: #f8d264;
  }
}
</style>
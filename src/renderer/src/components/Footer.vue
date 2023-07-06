<script lang='ts' setup>
import { IconPlay, IconNextSong, IconPreviousSong, IconPause } from '@/components/Icon';
import useControllerStore from '@/store/useControllerStore';
import useMusicInfoStore from '@/store/useMusicInfoStore';
import dayjs from 'dayjs';
const controllerStore = useControllerStore();
const musicInfoStore = useMusicInfoStore();

/** 鼠标挪动进度 */
const mouseSpeed = ref(controllerStore.currentTime / musicInfoStore.time);
// 进度
const speed = computed(() => controllerStore.currentTime / musicInfoStore.time * 100);

const flg = ref(false);
const down = () => {
  flg.value = true;
  const up = () => {
    flg.value = false;
    document.removeEventListener('mouseup', up);
  };
  document.addEventListener('mouseup', up);
};
</script>

<template>
  <footer>
    <!-- 进度条 -->
    <ElSlider :show-tooltip="false" :model-value="speed" @mousedown="down" @input="(e) => mouseSpeed = e as number"
      @change="controllerStore.onChangeTime(mouseSpeed / 100000 * musicInfoStore.time)" />
    <!-- 信息 -->
    <div class="flex gap-8">
      <img class="cover" :src="musicInfoStore.picUrl" alt="">
      <div class="flex items-center column">
        <div class="flex items-center gap-2">
          <div class="color-white">{{ musicInfoStore.name }}</div>
          <div>-</div>
          <div class="fs-12">{{ musicInfoStore.authorInfo.name }}</div>
        </div>
        <div class="">{{ dayjs(flg ? (mouseSpeed / 100 * musicInfoStore.time) :
          controllerStore.currentTime).format('mm:ss') }} / {{
    dayjs(musicInfoStore.time).format('mm:ss') }}
        </div>
      </div>
    </div>
    <!-- 控件 -->
    <div class="control">
      <IconPreviousSong class="cursor-pointer" />
      <IconPause class="cursor-pointer" v-if="controllerStore.isPlay" @click="controllerStore.onPause" />
      <IconPlay class="cursor-pointer" v-else @click="controllerStore.onPlay" />
      <IconNextSong class="cursor-pointer" />
    </div>
  </footer>
</template>

<style lang='scss' scoped>
footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 60px;
  padding: 0 24px;
  background-color: orange;
  user-select: none;
}

.cover {
  width: 42px;
  height: 42px;
  background-color: #D2D4D9;
  border-radius: 8px;
}

.control {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
}

// 进度条容器，事件触发区
::v-deep(.el-slider) {
  --el-slider-button-size: 12px;
  --el-slider-runway-bg-color: transparent;
  --el-slider-border-radius: 0;

  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  transform: translateY(-50%);

  &:hover {
    .el-slider__button {
      display: inline-block;
    }
  }

  // 控制器
  .el-slider__button {
    display: none;
  }

}
</style>
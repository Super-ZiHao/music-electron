<script lang='ts' setup>
import { IconPlay, IconNextSong, IconPreviousSong, IconPause, IconMute, IconVolume } from '@renderer/components/Icon';
import useControllerStore from '@renderer/store/useControllerStore';
import useMusicInfoStore from '@renderer/store/useMusicInfoStore';
import dayjs from 'dayjs';
const { currentTime, isPlay, isMute, currentVolume } = storeToRefs(useControllerStore());
const { onChangeTime, onPause, onPlay, onMute, onNotMute, onChangeVolume } = useControllerStore();
const { picUrl, time, name, authors } = storeToRefs(useMusicInfoStore());

/** 鼠标挪动进度 */
const mouseSpeed = ref(currentTime.value / time.value);
// 进度
const speed = computed(() => currentTime.value / time.value * 100);

// 进度条
const speedFlg = ref(false);
const volumeFlg = ref(false);
const onDown = (type: 'speed' | 'volume') => {
  switch (type) {
    case 'speed': speedFlg.value = true; break;
    case 'volume': volumeFlg.value = true; break;
    default: speedFlg.value = true;
  }
  const up = () => {
    speedFlg.value = false;
    volumeFlg.value = false;
    document.removeEventListener('mouseup', up);
  };
  document.addEventListener('mouseup', up);
};

const authorNmae = computed(() => authors.value.reduce((value, item) => `${value}、${item.name}`, ''));
</script>

<template>
  <footer>
    <!-- 进度条 -->
    <ElSlider class="speed-control" :show-tooltip="false" :model-value="speed" @mousedown="onDown"
      @input="(e) => mouseSpeed = e as number" @change="onChangeTime(mouseSpeed / 100 * time)" />
    <!-- 信息 -->
    <div class="flex gap-8" style="width: calc(50% - 80px);">
      <img class="cover" :src="picUrl" alt="">
      <div class="flex items-start column">
        <div class="flex items-center gap-2">
          <div class="color-white">{{ name }}</div>
          <div>-</div>
          <div class="fs-12">{{ authorNmae }}</div>
        </div>
        <div>{{ dayjs(speedFlg ? (mouseSpeed / 100 * time) :
          currentTime).format('mm:ss') }} / {{
    dayjs(time).format('mm:ss') }}
        </div>
      </div>
    </div>
    <!-- 控件 -->
    <div class="control">
      <IconPreviousSong class="cursor-pointer" />
      <IconPause class="cursor-pointer" v-if="isPlay" @click="onPause" />
      <IconPlay class="cursor-pointer" v-else @click="onPlay" />
      <IconNextSong class="cursor-pointer" />
    </div>
    <div class="flex items-center">
      <div :class="`volume-control-container flex items-center justify-center relative ${volumeFlg ? 'show' : ''}`"
        @mousedown="onDown('volume')">
        <ElSlider class="volume-control" :vertical="true" :model-value="isMute ? 0 : currentVolume"
          @input="(e) => onChangeVolume(e as number)" />
        <IconVolume v-if="!isMute" :size="24" class="cursor-pointer" @click="onMute" />
        <IconMute v-else :size="24" class="cursor-pointer" @click="onNotMute" />
      </div>
    </div>
  </footer>
</template>

<style lang='scss' scoped>
footer {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 100vw;
  height: var(--footer-height);
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

::v-deep(.el-slider) {

  // 进度条
  &.speed-control {
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

  &.volume-control {
    position: absolute;
    display: none;
    height: 120px;
    padding: 12px 0;
    background-color: peru;
    border-radius: 8px;
    transform: translate(0%, -76px);
  }
}

.volume-control-container {
  width: 36px;
  height: 36px;

  &.show .volume-control {
    display: block !important;
  }

  &:hover .volume-control {
    display: block;
  }
}
</style>
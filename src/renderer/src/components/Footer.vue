<script lang='ts' setup>
import { IconPlay, IconNextSong, IconPreviousSong, IconPause } from '@/components/Icon';
import useMusicStore from '@/store/useMusicStore';
const { controller } = storeToRefs(useMusicStore());
const currentTime = ref(controller.value.currentTime);

// 进度
const a = computed(() => 123);
console.log(a);
</script>

<template>
  <footer>
    <!-- 进度条 -->
    <ElSlider :show-tooltip="false" :model-value="controller.currentTime" @input="(e) => currentTime = e as number"
      @change="controller.currentTime = currentTime" />
    <!-- 信息 -->
    <div class="flex gap-8">
      <img class="cover" src="" alt="">
      <div class="flex items-center column">
        <div class="flex items-center gap-2">
          <div class="color-white">歌曲名字</div>
          <div>-</div>
          <div class="fs-12">歌手</div>
        </div>
        <div class="">02:52 / 03:07</div>
      </div>
    </div>
    <!-- 控件 -->
    <div class="control">
      <IconPreviousSong class="cursor-pointer" />
      <IconPause class="cursor-pointer" v-if="controller.isPlay" @click="controller.onPause" />
      <IconPlay class="cursor-pointer" v-else @click="controller.onPlay" />
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
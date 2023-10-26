<script lang='ts' setup>
import { useRequest } from 'vue-hooks-plus';
import api from '@renderer/api';
import useMusicStore from '@renderer/store/useMusicInfoStore';
import useUserStore from '@renderer/store/useUserStore';
import dayjs from 'dayjs';
import usePlayListStore from '@renderer/store/usePlayListStore';
import { MusicInfoType } from '@renderer/typings/api/paylist';

const { playList } = storeToRefs(useUserStore());

type TableData = {
  index: number;
  authorName: string;
  albumName: string;
  timeString: string;
} & MusicInfoType;

const { data, loading, run } = useRequest(() => api.playList().getPlayListDetails(playList?.value?.[0]?.id), {
  manual: true,
  formatResult: (res) => res?.map((item, idx) => ({
    id: item.id,
    index: idx + 1,
    authors: item.authors,
    picUrl: item?.album?.picUrl,
    name: item.name,
    authorName: item?.authors?.reduce((value, author, idx) => `${value}${idx > 0 ? '、' : ''}${author.name}`, ' '),
    albumName: item?.album?.name,
    time: item.time,
    timeString: dayjs(item.time).format('mm:ss'),
  }))
});

watchEffect(() => {
  if (playList?.value?.[0]?.id) {
    run();
  }
});

/** 更新当前播放音乐数据 */
const { onToggleMusic } = useMusicStore();
const { onUpdatePlayList } = usePlayListStore();
const handlerToggleMusic = (e: TableData) => {
  onUpdatePlayList(data.value ?? []);
  onToggleMusic({
    ...e,
  });
};
</script>

<template>
  <div class="main">
    <ElTable v-loading="loading" :data="data" @row-dblclick="handlerToggleMusic">
      <ElTableColumn prop="index" label="" width="80" />
      <ElTableColumn class="table-name" prop="name" label="音乐名称" />
      <ElTableColumn prop="authorName" label="歌手" width="180" />
      <ElTableColumn prop="albumName" label="专辑" width="240" />
      <ElTableColumn prop="timeString" label="时长" width="80" />
    </ElTable>
  </div>
</template>

<style lang='scss' scoped>
.main {
  flex: 1;
  min-height: 100%;
}

::v-deep(.el-table) {
  width: calc(100vw - var(--sidebar-width));
  height: calc(100vh - var(--footer-height) - var(--header-height));

  .table-name {
    background-color: red;
  }

  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
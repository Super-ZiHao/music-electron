<script lang='ts' setup>
import api from '@renderer/api';
import useMusicStore, { MusicStoreInfoType } from '@renderer/store/useMusicInfoStore';
import useUserStore from '@renderer/store/useUserStore';
import dayjs from 'dayjs';

const { playList } = storeToRefs(useUserStore());

type TableData = {
  index: number;
  authorName: string;
  albumName: string;
  timeString: string;
} & MusicStoreInfoType;
const tableData = ref<TableData[]>([]);
watchEffect(() => {
  if (playList.value.length && playList.value[0]) {
    api.playList()
      .getPlayListDetails(playList.value[0].id)
      .then(res => {
        tableData.value = res.map((item, idx) => ({
          id: item.id,
          index: idx + 1,
          authors: item.authors,
          picUrl: item.album.picUrl,
          name: item.name,
          authorName: item.authors.reduce((value, author, idx) => `${value}${idx > 0 ? '、' : ''}${author.name}`, ' '),
          albumName: item.album.name,
          time: item.time,
          timeString: dayjs(item.time).format('mm:ss'),
        }));
      });
  }
});

const { toggleMusic } = useMusicStore();
const onToggleMusic = (e: TableData) => {
  toggleMusic({
    ...e,
  });
};
</script>

<template>
  <div class="main">
    <ElTable :data="tableData" @row-dblclick="onToggleMusic">
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
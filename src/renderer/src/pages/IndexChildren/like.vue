<script lang='ts' setup>
</script>

<template>
  <div class="main">
    <ElTable>
      <ElTableColumn prop="name" label="" width="80" />
      <ElTableColumn prop="name" label="音乐名称" />
      <ElTableColumn prop="author" label="歌手" width="180" />
      <ElTableColumn prop="album" label="专辑" width="240" />
      <ElTableColumn prop="time" label="时长" width="80" />
    </ElTable>
  </div>
</template>

<style lang='scss' scoped>
.main {
  flex: 1;
  min-height: 100%;
}

::v-deep(.el-table) {
  min-height: calc(100vh - var(--footer-height) - var(--header-height));
}
</style>
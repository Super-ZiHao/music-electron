<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <div class="container">
    <Header />
    <div class="content">
      <Sidebar />
      <div class="content-right">
        <RouterView color="blue" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import url('./style.scss');

.container {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;

    .content-right {
      flex: 1;
    }
  }
}
</style>
<template>
  <div class="loading-page">
    <Loading class="loading-icon" />
    <div class='alert'>
    <p>感謝大家太踴躍幫忙阿伯，目前衛星雲圖前往拍攝中！</p>
      <br>
    <p>但還有許多農地工廠還沒被辨識，廣告之後（？）馬上回來</p>
    </div>
  </div>
</template>

<script>
import Loading from '../assets/svg-icon/loading.svg';

export default {
  name: 'LoadingPage',
  components: { Loading },
};
</script>

<style lang="scss" scoped>
.alert{
  width: 75%;
  line-height: 1.2;
  text-align: center;
}
.loading-page {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding-top: calc((100vh - 250px - 20px) / 2);
  padding-bottom: calc((100vh - 250px - 20px) / 2);
  background: rgba(0, 0, 0, 0.7);
  color: #cce9e9;
  font-size: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loading-icon {
    margin: 0 auto;
  }
}
</style>

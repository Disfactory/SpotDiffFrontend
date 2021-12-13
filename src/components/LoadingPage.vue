<template>
  <div>
    <Loading class="loading-icon" />
    <p>Loading</p>
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
div {
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

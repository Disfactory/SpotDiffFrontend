<template>
  <router-view />
  <TheFooter />
</template>

<style lang="scss">
@import 'reset-css';
@import './assets/css/base.scss';
</style>

<script>
import TheFooter from './components/TheFooter.vue';

export default {
  components: { TheFooter },
};
</script>

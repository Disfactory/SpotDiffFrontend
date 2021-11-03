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
  computed: {
    isGamePage() {
      return this.$route.name === 'Game';
    },
  },
  provide() {
    return {
      isGamePage: () => this.isGamePage,
    };
  },
};
</script>
<style scoped>
button {
  width: 200px;
  height: 200px;
  color: #000;
  background-color: red;
}
</style>

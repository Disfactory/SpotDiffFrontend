<template>
  <div class="header bg-darkBrown">
    <div class="title">
      <TheTitle />
    </div>
    <router-link
      to="/tutorial/blank"
      target="_blank"
      rel="noreferrer noopener"
      class="tutorial-icon"
      v-if="isGamePage()"
    >
      <BookMark />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  text-align: center;
  border-bottom: 2px solid #000000;
}
.title {
  margin-left: 50px;
  padding-top: 11px;
  padding-bottom: 9px;
  width: 100%;
  border-right: 2px solid #000000;
}

.tutorial-icon {
  cursor: pointer;
  width: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 9px;
  padding-left: 9px;
  border-top: 2px solid #626262;
  border-left: 2px solid #626262;
  border-right: 2px solid #000000;
}
</style>

<script>
import TheTitle from '../assets/svg-icon/title.svg';
import BookMark from '../assets/svg-icon/book.svg';

export default {
  name: 'TheHeader',
  components: { TheTitle, BookMark },
  inject: ['isGamePage'],
};
</script>

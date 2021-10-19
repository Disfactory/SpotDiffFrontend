<template>
  <div class="header bg-darkBrown">
    <div class="title">
      <TheTitle />
    </div>
    <div class="book">
      <BookMark />
    </div>
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

.book {
  min-width: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 9px;
  padding-left: 8.5px;
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
};
</script>

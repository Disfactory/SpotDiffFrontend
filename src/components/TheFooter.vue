<template>
  <div class="footer">
    <About />
    <p>&#169; 地球公民基金會</p>
  </div>
</template>

<script>
import About from './About.vue';

export default {
  name: 'TheFooter',
  components: { About },
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  background: #1d1d1d;
  display: flex;
  justify-content: space-between;
  padding-top: 7px;
  padding-bottom: 6px;
  color: #b8b8b8;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: left;
  p {
    margin-right: 17px;
  }
}
</style>

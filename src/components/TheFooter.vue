<template>
  <div class="footer">
    <About />
    <a
      href="https://www.cet-taiwan.org/"
      target="_blank"
      rel="noreferrer noopener"
      class="link-to-cet"
      >&#169; 地球公民基金會</a
    >
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
  height: 31.5px;
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
  .link-to-cet {
    cursor: pointer;
    margin-right: 17px;
    text-decoration: none;
    color: #b8b8b8;
    &:hover {
      font-weight: 600;
    }
  }
}
</style>

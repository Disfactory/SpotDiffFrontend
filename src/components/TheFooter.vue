<template>
  <div class="footer">
    <About />
    <div class='link-wrapper'>
    <a
      href="https://www.cet-taiwan.org/"
      target="_blank"
      rel="noreferrer noopener"
      class="link-to-cet"
      >地球公民基金會 </a>與<a
      href="https://g0v.tw/"
      target="_blank"
      rel="noreferrer noopener"
      class="link-to-cet"
      > g0v.tw</a
    >社群 共同開發
    </div>
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
  .link-wrapper {
    margin-right: 17px;
    .link-to-cet {
    color: #b8b8b8;
    text-decoration: none;
    cursor: pointer;
      &:hover {
      font-weight: 600;
      }
    }
  }

}
</style>

<template>
  <div class="footer">
    <button class="about-us">關於此專案</button>
    <p>&#169; 地球公民基金會</p>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .about-us {
    background: inherit;
    font-weight: 400;
    font-size: 13px;
    margin-left: 13px;
    padding: 0px;
    &:hover {
      font-weight: 600;
    }
  }
  p {
    margin-right: 17px;
  }
}
</style>

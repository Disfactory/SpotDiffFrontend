<template>
  <div class="container bg-skyBlue">
    <div class="ending-page">
      <IntroTitle class="title" />
      <p>THANK YOU!</p>
      <button @click="playAgain" class="play-again">
        再玩一輪
        <p>(跳過教學，直接重玩)</p>
      </button>
    </div>
  </div>
</template>

<script>
import IntroTitle from '../assets/svg-icon/intro-title.svg';

export default {
  name: 'EndingPage',
  components: { IntroTitle },
  methods: {
    playAgain() {
      this.$router.push('game');
    },
  },
  mounted() {
    localStorage.removeItem('SpotDiffData');
  },
};
</script>

<style lang="scss" scoped>
div {
  color: #000;
}
.ending-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin: 20px 0 80px 0;
  }
  .play-again {
    width: 200px;
    margin: 20px;
    height: 50px;
    color: black;
    background: #fff;
    border-radius: 10px;
    border: solid 1px gray;
    &:hover {
      background: #cce9e9;
    }
  }
}
</style>

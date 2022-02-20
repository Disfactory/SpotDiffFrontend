<template>
  <div class="fill-full-background bg-skyBlue">
    <div class="container bg-skyBlue border-blue ending-page">
      <div class="title-icon"><IntroTitle /></div>
      <div class="thank-text">
        <p class="title">阿伯感謝你！</p>
        <p class="personal-score">你已經辨識了5間工廠</p>
      </div>


      <div class="play-again-wrapper">
        <button @click="playAgain">
          <PlayAgain />
        </button>
        <Search class="search-icon" />
      </div>

      <div class="current-result">
        <p>辨識 45,849 次</p>
        <p>已經有 1,394 人次參與辨識，</p>
        <p>還差 4,5896 間工廠</p>
        <div class="result-bar"><ResultBar /></div>
      </div>
      <div class="button-group">
        <div class="share">
          <RiceLeft /> <button class="btn-share"><Share /></button><RiceRight />
        </div>
        <button class="btn-form">
          <a href="https://www.google.com/" target="blank"><AttendDraw /></a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import PlayAgain from '../assets/svg-icon/play-again.svg';
import ResultBar from '../assets/svg-icon/result-bar.svg';
import Share from '../assets/svg-icon/share.svg';
import AttendDraw from '../assets/svg-icon/attend-draw.svg';
import RiceLeft from '../assets/svg-icon/rice-left.svg';
import RiceRight from '../assets/svg-icon/rice-right.svg';
import Search from '../assets/svg-icon/search-ending.svg';

export default {
  name: 'EndingPage',
  components: {
    IntroTitle,
    PlayAgain,
    Share,
    AttendDraw,
    ResultBar,
    RiceLeft,
    RiceRight,
    Search,
  },
  methods: {
    playAgain() {
      this.$router.push('game');
    },
  },
};
</script>

<style lang="scss" scoped>
.border-blue {
  @media (min-width: 768px) {
    border: 4px solid #95cde9;
  }
}
.ending-page {
  text-align: center;
  padding: 24px 0 63px;
  .title-icon {
    margin: 0 auto;
    display: block;
    margin-bottom: 44px;
  }
  .thank-text {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.86px;
    text-align: center;
    color: #2b4754;
    .title {
      font-size: 29px;
      font-weight: 600;
      line-height: 41px;
      margin-bottom: 14px;
    }
    .personal-score {
      margin-bottom: 28px;
    }
  }
  .play-again {
    margin-bottom: 36px;
  }
  .current-result {
    margin-bottom: 80px;
    p {
      color: #e79800;
      font-size: 19px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 0.86px;
      text-align: center;
    }
    .result-bar {
      margin-top: 20px;
    }
  }
  .button-group {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .share {
      margin-bottom: 20px;
    }
  }
  .btn-share {
    margin-left: 16px;
    margin-right: 16px;
  }

  .play-again-wrapper {
    position: relative;
  }
  .search-icon {
    position: absolute;
    left: -20px;
    top: -22px;
    animation-name: moveSearch;
    animation-duration: 3s;
    animation-iteration-count: 2;
    animation-timing-function: ease;
  }
  @keyframes moveSearch {
    0%   {
      transform: translate(0px, 0px);
    }
    30%   {
      transform: translate(-20px, 50px);
    }
    60%   {
      transform: translate(180px, 30px);
    }
    100%   {
      transform: translate(0px, 0px);
    }
  }
}
</style>

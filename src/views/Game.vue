<template>
  <div v-if="!isAllQuestionDone" class="container bg-darkBlue">
    <TheHeader />
    <ProgressBar
      :go-to-next-stage="goToNextStage"
      :back-to-previous-stage="backToPreviousStage"
      :whichStage="whichStage"
      :completed-stage="completedStage"
    />

    <GameContent :which-Question="whichStage" :go-to-next-stage="goToNextStage" />
  </div>
  <div v-else class="container bg-skyBlue">
    <div class="checking-page">
      <div class="title-icon"><IntroTitle /></div>
      <p class="check-text">你確定要送出資料了嗎？</p>
      <div class="button-group">
        <Farmer class="farmer-icon" />
        <button class="btn" @click="sendAnswer"><sendAnswer /></button>
        <button class="btn" @click="backToPreviousStage"><backToGamePage /></button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import GameContent from '@/components/GameContent.vue';
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import backToGamePage from '../assets/svg-icon/back-to-game-page.svg';
import Farmer from '../assets/svg-icon/intro-animation/farmer.svg';
import sendAnswer from '../assets/svg-icon/send-answer.svg';

export default {
  name: 'TheTutorial',
  data() {
    return { whichStage: 1, completedStage: [1], isAllQuestionDone: false };
  },
  methods: {
    async goToNextStage() {
      if (this.whichStage < 5) {
        this.whichStage += 1;
      } else {
        this.isAllQuestionDone = true;
      }
    },

    backToPreviousStage() {
      if (this.isAllQuestionDone) {
        this.isAllQuestionDone = false;
      } else if (this.whichStage > 1) {
        this.whichStage -= 1;
      }
    },
    sendAnswer() {
      this.$router.push('ending');
      localStorage.removeItem('SpotDiffData');
    },
  },
  watch: {
    whichStage() {
      if (!this.completedStage.some((item) => item === this.whichStage)) {
        this.completedStage.push(this.whichStage);
      }
    },
  },
  components: {
    TheHeader,
    ProgressBar,
    GameContent,
    IntroTitle,
    backToGamePage,
    Farmer,
    sendAnswer,
  },
  inject: ['isGamePage'],
};
</script>

<style lang="scss" scoped>
.checking-page {
  padding-top: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .title-icon {
    display: block;
    margin-bottom: 20px;
  }
  .check-text {
    font-size: 26px;
    margin-bottom: 5vh;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0.5px;
    text-align: center;
    color: #2b4754;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 18.2vh;
    .btn {
      margin-bottom: 7.2vh;
    }
  }
}
</style>

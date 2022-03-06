<template>
  <div
    class="fill-full-background"
    :class="{ 'bg-skyBlue': isAllQuestionDone, 'bg-darkBlue': !isAllQuestionDone }"
  >
    <div v-if="!isAllQuestionDone" class="container container-border-blue">
      <TheHeader />
      <ProgressBar
        :go-to-next-stage="goToNextStage"
        :back-to-previous-stage="backToPreviousStage"
        :whichStage="whichStage"
        :completed-stage="completedStage"
      />
      <GameContent :which-Question="whichStage" :go-to-next-stage="goToNextStage" />
    </div>
    <div v-else class="container bg-skyBlue container-border-sky-blue">
      <div class="checking-page">
        <div class="title-icon"><IntroTitle /></div>
        <p class="check-text">你確定要送出資料了嗎？</p>
        <div class="button-group">
          <img src="../assets/svg-icon/intro-animation/farmer.gif" class="farmer-icon" />
          <button class="btn" @click="sendAnswer"><sendAnswer /></button>
          <button class="btn" @click="backToPreviousStage"><backToGamePage /></button>
        </div>
      </div>
    </div>
  </div>
  <LoadingPage v-if="isLoading" />
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import GameContent from '@/components/GameContent.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import backToGamePage from '../assets/svg-icon/back-to-game-page.svg';
import sendAnswer from '../assets/svg-icon/send-answer.svg';

export default {
  name: 'TheGame',
  data() {
    return {
      whichStage: 1,
      completedStage: [1],
      isAllQuestionDone: false,

      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['createClientId', 'getUserToken']),
    goToNextStage() {
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
    async sendAnswer() {
      try {
        this.isLoading = true;
        await this.createClientId();
        await this.getUserToken();
        const data = JSON.parse(localStorage.getItem('SpotDiffData'));
        data.forEach((factory) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          if (factory.land_usage === 'buliding-land') {
            factory.land_usage = 1;
          } else if (factory.land_usage === 'farm-land') {
            factory.land_usage = 2;
          } else {
            factory.land_usage = 0;
          }
          if (!factory.expansion) {
            factory.expansion = 1;
          } else if (factory.expansion) {
            factory.expansion = 2;
          } else {
            factory.expansion = 0;
          }
          delete factory.latitude;
          delete factory.longitude;
          delete factory.address;
        });
        await axios.post(`${process.env.VUE_APP_SPOTDIFF_APP_URL || '/api'}/answer/`, {
          user_token: this.userToken,
          data,
        });
        localStorage.removeItem('SpotDiffData');
        this.isLoading = false;
        this.$router.push('ending');
      } catch (e) {
        console.log(e.response.data.message);
      }
    },
  },
  computed: {
    ...mapState(['userToken', 'clientId']),
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
    LoadingPage,
    IntroTitle,
    backToGamePage,
    sendAnswer,
  },
  inject: ['isGamePage'],
};
</script>

<style lang="scss" scoped>
.checking-page {
  padding: 20px 21px 50px;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .title-icon {
    display: block;
    margin-bottom: 63px;
  }
  .check-text {
    font-size: 26px;
    margin-bottom: 36px;
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
    margin-bottom: 94px;
    .btn {
      margin-bottom: 54px;
    }
  }
  .farmer-icon {
    width: 89px;
    height: 134px;
  }
}
</style>

<template>
  <div
    :class="['fill-full-background',
    { 'bg-skyBlue': isAllQuestionDone, 'bg-darkBlue': !isAllQuestionDone,
    'fill-full-background--less-padding':shouldChangeHeight }]"
  >
    <div v-if="!isAllQuestionDone" class="container container-border-blue">
      <TheHeader />
      <ProgressBar
        :go-to-next-stage="goToNextStage"
        :back-to-previous-stage="backToPreviousStage"
        :whichStage="whichStage"
        :completed-stage="completedStage"
      />
      <GameContent :which-Question="whichStage" :go-to-next-stage="goToNextStage"
      :get-testing-result="getTestingResult" @taskAisCompleted='changeHeight' />
    </div>
    <div v-else class="container bg-skyBlue container-border-sky-blue">
      <div class="checking-page">
        <div class="title-icon"><IntroTitle /></div>
        <div class="check-text">
          <p>你確定要送出資料了嗎？</p>
          <p class="check-text--little-font">阿伯很期待 &gt; &lt;</p>
          <p class="check-text--little-font">{{this.abTesting.isShowingNewFilter ?
            '使用新版遮罩':'使用舊版遮罩'}}</p>
          <p class="check-text--little-font">{{this.abTesting.userAnswer}}</p>
        </div>
        <div class="button-group">
          <img src="../assets/svg-icon/intro-animation/farmer.gif" class="farmer-icon" />
          <button class="btn--test" @click="copyAnswer">複製答案</button>
          <!-- <button class="btn" @click="sendAnswer" data-value="send-answer">
            <sendAnswer />
            </button> -->

          <button class="btn" @click="backToPreviousStage"><backToGamePage /></button>
        </div>
      </div>
    </div>
  </div>
  <LoadingPage v-if="isLoading" />
</template>

<script>
// import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import GameContent from '@/components/GameContent.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import backToGamePage from '../assets/svg-icon/back-to-game-page.svg';
// import sendAnswer from '../assets/svg-icon/send-answer.svg';

export default {
  name: 'TheGame',
  data() {
    return {
      whichStage: 1,
      completedStage: [1],
      isAllQuestionDone: false,
      shouldChangeHeight: false,
      isLoading: false,
      abTesting: {
        isShowingNewFilter: undefined,
        userAnswer: [],
      },
    };
  },
  methods: {
    ...mapActions(['createClientId', 'getUserToken', 'getStatusData']),
    copyAnswer() {
      navigator.clipboard.writeText(JSON.stringify(this.abTesting));
    },
    changeHeight() {
      this.shouldChangeHeight = !this.uldChangeHeight;
    },
    getTestingResult(isShowingNewFilter, userAnswer) {
      this.abTesting.isShowingNewFilter = isShowingNewFilter;
      this.abTesting.userAnswer = userAnswer;
    },
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
      // for a/b testing, we use data which is selected,
      // so we don't send data to our database.

      // code for a/b testing:
      this.$router.push('ending');

      // original code:

      // try {
      //   this.isLoading = true;
      //   await this.createClientId();
      //   await this.getUserToken();
      //   const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      //   data.forEach((factory) => {
      //     /* eslint no-param-reassign: ["error", { "props": false }] */
      //     if (factory.land_usage === 'buliding-land') {
      //       factory.land_usage = 1;
      //     } else if (factory.land_usage === 'farm-land') {
      //       factory.land_usage = 2;
      //     } else {
      //       factory.land_usage = 0;
      //     }
      //     if (!factory.expansion) {
      //       factory.expansion = 1;
      //     } else if (factory.expansion) {
      //       factory.expansion = 2;
      //     } else {
      //       factory.expansion = 0;
      //     }
      //     delete factory.latitude;
      //     delete factory.longitude;
      //     delete factory.address;
      //   });
      //   await axios.post(`${process.env.VUE_APP_SPOTDIFF_APP_URL || '/api'}/answer/`, {
      //     user_token: this.userToken,
      //     data,
      //   });
      //   localStorage.removeItem('SpotDiffData');
      //   await this.getStatusData();
      //   this.isLoading = false;
      //   this.$router.push('ending');
      // } catch (e) {
      //   // console.log(e.response.data.message);
      // }
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
    // sendAnswer,
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
    margin-bottom: 25px;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0.5px;
    text-align: center;
    color: #2b4754;
    p {
      margin-bottom: 11px;
    }
    &--little-font {
      font-size: 18px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.85px;
    }
  }
  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 94px;
    .btn {
      margin-bottom: 54px;
      &--test{
        color: black;
        border: 1px solid black;
        padding: 5px;
        margin-top: 10px;
        font-size: 18px;
      }
    }

  }
  .farmer-icon {
    width: 89px;
    height: 134px;
  }
}
.fill-full-background {
  overflow: auto;
  padding-bottom: calc(100vh - 685px - 31.5px);
  &--less-padding{
    padding-bottom: calc(100vh - 718px - 31.5px);
  }
}
</style>

<template>
  <div class="fill-full-background bg-skyBlue">
    <div class="container container-border-sky-blue ending-page">
      <div class="title-icon"><IntroTitle /></div>
      <div class="thank-text">
        <p class="title">阿伯感謝你！</p>
        <p class="personal-score">你已經辨識了 {{statusData.individualDoneCount || 0}} 間工廠</p>
      </div>

      <div class="play-again-wrapper">
        <button @click="playAgain">
          <PlayAgain />
        </button>
        <Search class="search-icon" />
      </div>

      <div class="invite-text">
       <p>你的答案可以拿來當作檢舉違章的證據，邀請你的朋友一起來玩？</p>
      </div>
      <!-- <div class="current-result">
        <p>辨識 {{statusData.answerCount || 0 }} 次</p>
        <p>已經有 {{statusData.userCount || 0 }} 人次參與辨識，</p>
        <p>還差 {{statusData.locationIsUndoneCount || '5,000'}} 間工廠</p>
        <div class="result-bar"><ResultBar /></div>
      </div> -->
      <div class="button-group">
        <div class="share">
          <RiceLeft /> <button class="btn-share"><Share /></button><RiceRight />
        </div>
        <button class="btn-form">
         <About :isEndingPage='isEndingPage'/>
        </button>
      </div>
    </div>
  <LoadingPage v-if="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import PlayAgain from '../assets/svg-icon/play-again.svg';
// import ResultBar from '../assets/svg-icon/result-bar.svg';
import Share from '../assets/svg-icon/share.svg';
import About from '../components/About.vue';
import RiceLeft from '../assets/svg-icon/rice-left.svg';
import RiceRight from '../assets/svg-icon/rice-right.svg';
import Search from '../assets/svg-icon/search-ending.svg';
import LoadingPage from '@/components/LoadingPage.vue';

export default {
  name: 'EndingPage',
  components: {
    IntroTitle,
    PlayAgain,
    Share,
    About,
    // ResultBar,
    RiceLeft,
    RiceRight,
    Search,
    LoadingPage,
  },
  data() {
    return {
      isLoading: false,
      isEndingPage: true,
    };
  },
  computed: {
    ...mapState(['userToken', 'statusData']),
    isStatusDataEmpty() {
      return Object.values(this.statusData).length === 0;
    },
  },
  methods: {
    ...mapActions(['getUserToken', 'createClientId', 'getStatusData']),
    playAgain() {
      this.$router.push('game');
    },

  },
  async mounted() {
    try {
      if (this.isStatusDataEmpty) {
        this.isLoading = true;
        await this.createClientId();
        await this.getUserToken();
        await this.getStatusData();
        this.isLoading = false;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.ending-page {
  text-align: center;
  padding: 20px 0 63px;
  .title-icon {
    margin: 0 auto 44px;
    display: block;
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
  .play-again-wrapper {
    margin-bottom: 37px;
  }
  .invite-text {
    color: #4A5613;
    width: 232px;
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0.8550000190734863px;
    text-align: center;
  }
  .current-result {
    margin-bottom: 48px;
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
    0% {
      transform: translate(0px, 0px);
    }
    30% {
      transform: translate(-20px, 50px);
    }
    60% {
      transform: translate(180px, 30px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
}
</style>

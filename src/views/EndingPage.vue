<template>
  <div class="fill-full-background bg-skyBlue">
    <div class="container container-border-sky-blue ending-page">
      <div class="title-icon"><IntroTitle /></div>
      <div class="thank-text">
        <p class="title">阿伯感謝你！</p>
        <p class="personal-score">你已經辨識了 {{ statusData.individualDoneCount || 0 }} 間工廠</p>
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
          <RiceLeft /> <button class="btn-share" @click="share"><Share /></button><RiceRight />
          <p :class="{ 'share--copy-success': hasCopySuccess }">已複製連結！</p>
        </div>
        <button class="btn-form">
          <About :isEndingPage="isEndingPage" />
        </button>
      </div>
    </div>
    <LoadingPage v-if="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoadingPage from '@/components/LoadingPage.vue';
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import PlayAgain from '../assets/svg-icon/play-again.svg';
// import ResultBar from '../assets/svg-icon/result-bar.svg';
import Share from '../assets/svg-icon/share.svg';
import About from '../components/About.vue';
import RiceLeft from '../assets/svg-icon/rice-left.svg';
import RiceRight from '../assets/svg-icon/rice-right.svg';
import Search from '../assets/svg-icon/search-ending.svg';

const imgUrl = require('../assets/img/share-image-square.jpeg');

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
      copiedText:
        '借你的眼睛兩分鐘，幫台灣拆除新增違章工廠！\n\r#阿伯出事了 #大家來找廠 #新增建違章工廠即報即拆 #disfactory\n\rhttps://spot.disfactory.tw',
      hasCopySuccess: false,
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
    shareText(text) {
      navigator.clipboard.writeText(text);
      this.hasCopySuccess = true;
      setTimeout(() => {
        this.hasCopySuccess = false;
      }, 1000);
    },
    async shareImage() {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const filesArray = [
        new File([blob], '大家來找廠.jpeg', {
          type: 'image/jpeg',
          lastModified: new Date().getTime(),
        }),
      ];
      const shareData = {
        files: filesArray,
      };
      navigator.share(shareData);
    },
    share() {
      if (navigator.share) {
        try {
          this.shareImage();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          this.shareText(this.copiedText);
        }
      } else {
        this.shareText(this.copiedText);
      }
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.ending-page {
  text-align: center;
  padding: 20px 0 53px;
  .title-icon {
    margin: 0 auto 36px;
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
    margin-bottom: 30px;
  }
  .invite-text {
    color: #4a5613;
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
      margin-bottom: 12px;
      color: transparent;
      &--copy-success {
        color: #4a5613;
      }
    }
  }
  .btn-share {
    margin: 0 16px 8px;
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

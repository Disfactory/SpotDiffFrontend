<template>
  <div class="container container-border-sky-blue intro">
    <div class="intro-title">
      <IntroTitle />
      <transition appear name="icon-search" @after-enter="afterEnter">
        <Search v-if="showSearchIcon" class="icon-search" />
      </transition>
    </div>
    <div v-bind:class="{ main: true, 'change-order': isSecondIntro }">
      <div class="animation">
        <IntroAnimation :is-second-intro="isSecondIntro" />
      </div>
      <BlueCard :is-second-intro="isSecondIntro">
        <slot>
          <span v-if="!isSecondIntro"
            ><p class="card-text">田間阿伯發現隔壁蓋起新工廠卻束手無策，</p>
            <p class="card-text text-strong">動動手指幫助他吧！</p>
          </span>
          <span v-else>
            <p class="card-text text-strong">怎麼幫他？</p>
            <p class="card-text">
              邀請你辨識空拍圖片，找出以前是農地、現在是建物的點，我們就能向政府提出檢舉！
            </p>
          </span>
        </slot>
      </BlueCard>
    </div>
    <div class="introduction" v-if="isSecondIntro">
      <p>在開始辨識之前，我們需要先試玩一次教學，教你正確辨識空拍圖</p>
    </div>

    <button
      class="intro-button"
      v-if="!isSecondIntro"
      @click.prevent="isSecondIntro = !isSecondIntro"
    >
      <HowToHelp />
    </button>
    <button v-if="isSecondIntro" class="intro-button intro-button--less-margin">
      <router-link to="/tutorial">
        <GoToTutorial />
      </router-link>
    </button>
    <p class='gdpr'
      v-if="!isSecondIntro"
    > 繼續遊戲代表同意此網站之
      <a
        href="https://license.spot.disfactory.tw/"
        rel="noreferrer noopener"
        target="_blank"
        class="link">隱私條款</a>
      <br>
      本遊戲由 <a
        href="https://www.cet-taiwan.org/"
        rel="noreferrer noopener"
        target="_blank"
        class="link">地球公民基金會</a> 與 <a
        href="https://g0v.tw/"
        rel="noreferrer noopener"
        target="_blank"
        class="link">g0v.tw</a> 社群共同開發
    </p>
  </div>
</template>

<script>
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import Search from '../assets/svg-icon/search.svg';
import HowToHelp from '../assets/svg-icon/how-to-help.svg';
import GoToTutorial from '../assets/svg-icon/go-to-tutorial.svg';
import BlueCard from './BlueCard.vue';
import IntroAnimation from './IntroAnimation.vue';

export default {
  name: 'TheIntro',
  data() {
    return {
      isSecondIntro: false,
      showSearchIcon: true,
    };
  },
  components: {
    IntroTitle,
    Search,
    HowToHelp,
    GoToTutorial,
    BlueCard,
    IntroAnimation,
  },
  methods: {
    afterEnter() {
      setTimeout(() => {
        this.showSearchIcon = false;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.intro {
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px 21px 30px;
  overflow-x: hidden;
}

.intro-title {
  position: relative;
  .icon-search {
    position: absolute;
    bottom: -65%;
    left: 0;
  }
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .animation {
    margin-top: 15px;
  }
}

.change-order {
  flex-direction: column-reverse;
}

.intro-button {
  margin: 40px 0 24px;
  &--less-margin {
    margin: 20px 0 ;
  }
}

.card-text {
  font-size: 18px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 1px;

  &.text-strong {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

.introduction {
  width: 273px;
  color: #006788;
  font-weight: 500;
  margin-top: 20px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 25px;
  font-size: 17px;
}
.gdpr{
  color: #006788;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  .link{
    text-decoration: underline;
    color: #006788;
    &:hover{
      font-weight: 500;
    }
  }
}

//animation of search icon in title
.icon-search-enter-active {
  transition: opacity 0.5s ease-out, transform 1.5s 0.5s ease-out;
}

.icon-search-leave-active {
  transition: transform 1.5s ease-out, opacity 0.5s 1s ease-out;
}
.icon-search-enter-from,
.icon-search-leave-to {
  transform: translateX(189px);
}
.icon-search-leave-to {
  opacity: 1;
}
</style>

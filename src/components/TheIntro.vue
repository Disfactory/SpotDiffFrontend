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
      <BlueCard>
        <slot>
          <span v-if="!isSecondIntro"
            ><p class="card-text">田間阿伯發現隔壁蓋起新工廠卻束手無策，</p>
            <p class="card-text text-strong">動動手指幫助他吧！</p>
          </span>
          <span v-else>
            <p class="card-text text-strong">怎麼幫他？</p>
            <p class="card-text">只要你能找出農地上的新增建物，我們就能去檢舉拆除！</p>
          </span>
        </slot>
      </BlueCard>
    </div>
    <button
      class="intro-button"
      v-if="!isSecondIntro"
      @click.prevent="isSecondIntro = !isSecondIntro"
    >
      <HowToHelp />
    </button>
    <button v-if="isSecondIntro" class="intro-button intro-button--margin-bottom-more">
      <router-link to="/tutorial">
        <StartToPlay />
      </router-link>
    </button>
  </div>
</template>

<script>
import IntroTitle from '../assets/svg-icon/intro-title.svg';
import Search from '../assets/svg-icon/search.svg';
import HowToHelp from '../assets/svg-icon/how-to-help.svg';
import StartToPlay from '../assets/svg-icon/start-to-play.svg';
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
    StartToPlay,
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
  padding: 20px 21px 50px;
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
  margin: 40px 0 40px;
  &--margin-bottom-more {
    margin: 40px 0 40px;
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

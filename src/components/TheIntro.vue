<template>
  <div class="container">
    <div class="intro">
      <WebTitle />
      <div v-bind:class="{ main: true, changeOrder: isSecondIntro }">
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
        class="introButton"
        v-if="!isSecondIntro"
        @click.prevent="isSecondIntro = !isSecondIntro"
      >
        <HowToHelp />
      </button>
      <button class="introButton">
        <router-link v-if="isSecondIntro" to="/tutorial">
          <StartToPlay />
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import WebTitle from '../assets/svg-icon/web-title.svg';
import HowToHelp from '../assets/svg-icon/how-to-help.svg';
import StartToPlay from '../assets/svg-icon/start-to-play.svg';
import BlueCard from './BlueCard.vue';
import IntroAnimation from './IntroAnimation.vue';

export default {
  name: 'TheIntro',
  data() {
    return {
      isSecondIntro: false,
    };
  },
  components: {
    WebTitle,
    HowToHelp,
    StartToPlay,
    BlueCard,
    IntroAnimation,
  },
};
</script>

<style scoped lang="scss">
.intro {
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 50px;
  padding-right: 21px;
  padding-left: 21px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .animation {
    margin-top: 15px;
  }
}
.changeOrder {
  flex-direction: column-reverse;
}

.introButton {
  position: absolute;
  bottom: 26px;
  margin: 0 auto;
}

.card-text {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 1px;
  &.text-strong {
    font-size: 26px;
    font-weight: 700;
    line-height: 38px;
  }
}

// .v-enter-active,
// .v-leave-active {
//   transition: opacity 0.5s;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }

// .v-enter-to,
// .v-leave-from {
//   opacity: 1;
// }
</style>

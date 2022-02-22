<template>
  <div class="animationA" v-show="!isSecondIntro">
    <div class="dialog">
      <DialogBox class="dialog-box" v-show="isFirstAnimationShow" />
      <Factory class="factory" v-show="isFirstAnimationShow" />
    </div>
    <QustionMark class="question-mark" v-show="isFirstAnimationShow" />
    <div class="farmer" v-show="isFirstAnimationShow">
      <img src="@/assets/svg-icon/intro-animation/farmer.gif" />
    </div>
    <Grace class="grace" />
  </div>
  <div class="animationB" v-show="isSecondIntro">
    <Farm class="farm" />
    <Alert class="alert2" v-show="isSecondAnimationShow" />
    <Alert class="alert1" v-show="isSecondAnimationShow" />
  </div>
</template>

<script>
import Grace from '@/assets/svg-icon/intro-animation/grace.svg';
import QustionMark from '@/assets/svg-icon/intro-animation/question-mark.svg';
import Factory from '@/assets/svg-icon/intro-animation/factory.svg';
import DialogBox from '@/assets/svg-icon/intro-animation/dialog-box.svg';
import Farm from '@/assets/svg-icon/intro-animation/farm.svg';
import Alert from '@/assets/svg-icon/intro-animation/alert.svg';

export default {
  name: 'IntroAnimation',
  data() {
    return {
      isFirstAnimationShow: false,
      isSecondAnimationShow: false,
    };
  },
  components: {
    Grace,
    QustionMark,
    Factory,
    DialogBox,
    Farm,
    Alert,
  },

  props: ['isSecondIntro'],
  watch: {
    isSecondIntro() {
      this.isSecondAnimationShow = true;
    },
  },
  mounted() {
    this.isFirstAnimationShow = true;
  },
};
</script>

<style scoped lang="scss">
.animationA {
  position: relative;
  width: 264px;
  height: 230px;
  margin-left: 25px;

  .grace {
    position: absolute;
    bottom: 0;
    left: 85px;
  }
  .farmer {
    position: absolute;
    bottom: 4px;
    left: 112px;
    animation-name: farmer;
    animation-duration: 3s;
    img {
      width: 89px;
      height: 134px;
    }
  }
  .dialog {
    position: relative;
    .dialog-box {
      position: absolute;
      left: 0;
      top: 0;
      transform: scale(0);
      animation-fill-mode: forwards;
      animation-name: dialogBox;
      animation-delay: 3s;
      animation-duration: 0.3s;
    }
    .factory {
      position: absolute;
      left: 20px;
      top: 13px;
      transform: scale(0);
      animation-fill-mode: forwards;
      animation-name: factory;
      animation-delay: 3.4s;
      animation-duration: 0.3s;
    }
  }
  .question-mark {
    position: absolute;
    left: 215px;
    bottom: 106px;
    transform: scale(0);
    animation-fill-mode: forwards;
    animation-name: questionMark;
    animation-delay: 5s;
    animation-duration: 0.3s;
  }
}

.animationB {
  position: relative;
  margin: 31px 0 0 46px;
  width: 229px;
  height: 199px;

  .farm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .alert1 {
    position: absolute;
    left: 138px;
    top: 35px;
    animation-name: bounce2;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }
  .alert2 {
    position: absolute;
    left: 68px;
    top: 114px;
    animation-name: bounce2;
    animation-duration: 2s;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }
}

@keyframes bounce2 {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@keyframes farmer {
  0% {
    transform: translateX(450px);
  }
  30% {
    transform: translateX(150px);
  }
  50% {
    transform: translateX(150px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes factory {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(100%);
  }
}

@keyframes dialogBox {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(100%);
  }
}

@keyframes questionMark {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(100%);
  }
}
</style>

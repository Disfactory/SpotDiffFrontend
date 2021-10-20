<template>
  <div class="animationA" v-show="!isSecondIntro">
    <div class="dialog">
      <transition name="dialog-box" v-show="isFirstAnimationShow">
        <DialogBox class="dialog-box" />
      </transition>
      <transition name="factory" v-show="isFirstAnimationShow">
        <Factory class="factory" />
      </transition>
    </div>
    <transition name="question-mark" v-show="isFirstAnimationShow">
      <QustionMark class="question-mark" />
    </transition>
    <transition name="farmer" v-show="isFirstAnimationShow">
      <Farmer class="farmer" />
    </transition>
    <Grace class="grace" />
  </div>
  <div class="animationB" v-show="isSecondIntro">
    <Farm class="farm" />
    <transition name="alert1" v-show="isSecondAnimationShow">
      <Alert class="alert1" />
    </transition>
    <transition name="alert2" v-show="isSecondAnimationShow">
      <Alert class="alert2" />
    </transition>
  </div>
</template>

<script>
import Farmer from '@/assets/svg-icon/intro-animation/farmer.svg';
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
    Farmer,
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
    width: auto;
    height: auto;
    bottom: 6px;
    left: 112px;
  }
  .dialog {
    position: relative;
    .factory {
      position: absolute;
      left: 20px;
      top: 7px;
    }
    .dialog-box {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .question-mark {
    position: absolute;
    left: 215px;
    bottom: 106px;
  }

  .farmer-enter-active,
  .farmer-leave-active {
    transition: all 1.5s linear;
  }
  .farmer-enter-from {
    transform: translateX(200%);
    opacity: 0;
  }
  .dialog-box-enter-active,
  .dialog-box-leave-active {
    transition: all 1s 1.5s linear;
  }
  .dialog-box-enter-from {
    opacity: 0;
  }
  .factory-enter-active,
  .factory-leave-active {
    transition: all 0.5s 3s linear;
  }
  .factory-enter-from {
    opacity: 0;
  }
  .question-mark-enter-active,
  .question-mark-leave-active {
    transition: all 0.5s 3.5s linear;
  }
  .question-mark-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }
}
.animationB {
  position: relative;
  width: 229px;
  height: 199px;
  margin-left: 46px;
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
  }
  .alert2 {
    position: absolute;
    left: 68px;
    top: 114px;
  }

  .alert1-enter-active,
  .alert1-leave-active {
    transition: all 1s linear;
  }
  .alert2-enter-active,
  .alert2-leave-active {
    transition: all 1s 1s linear;
  }

  .alert1-enter-from,
  .alert2-enter-from {
    opacity: 0;
  }
}
</style>

<template>
  <div :class="{ 'progress-bar': true, 'bg-brown': !isGamePage(), 'bg-blue': isGamePage() }">
    <button
      :class="{
        'previous-stage': true,
        'border-color-brown': !isGamePage(),
        'border-color-blue': isGamePage(),
      }"
      v-if="whichStage !== 1"
      @click="backToPreviousStage"
    >
      <ArrowLeft />
    </button>
    <div
      :class="{
        'now-stage': true,
        'border-color-brown': !isGamePage(),
        'border-color-blue': isGamePage(),
      }"
    >
      <div v-if="whichStage === 1" class="padding-box"></div>
      <p class="text-color-brown" v-if="!isGamePage()">教學進度</p>
      <p class="text-color-blue" v-else>辨識題目</p>
      <div v-if="!isGamePage()" class="stage-icon">
        <Status1BrownActive class="svg-icon" v-if="whichStage === 1" />
        <Status1BrownNormal class="svg-icon" v-else />
        <Status2BrownActive class="svg-icon" v-if="whichStage === 2" />
        <Status2BrownNormal class="svg-icon" v-else />
        <Status3BrownActive class="svg-icon" v-if="whichStage === 3" />
        <Status3BrownNormal class="svg-icon" v-else />
        <Status4BrownActive class="svg-icon" v-if="whichStage === 4" />
        <Status4BrownNormal class="svg-icon" v-else />
      </div>
      <div v-if="isGamePage()" class="stage-icon">
        <Status1BlueActive class="svg-icon" v-if="whichStage === 1" />
        <Status1BlueNormal class="svg-icon" v-else />
        <Status2BlueActive class="svg-icon" v-if="whichStage === 2" />
        <Status2BlueNormal class="svg-icon" v-else />
        <Status3BlueActive class="svg-icon" v-if="whichStage === 3" />
        <Status3BlueNormal class="svg-icon" v-else />
        <Status4BlueActive class="svg-icon" v-if="whichStage === 4" />
        <Status4BlueNormal class="svg-icon" v-else />
        <Status5BlueActive class="svg-icon" v-if="whichStage === 5" />
        <Status5BlueNormal class="svg-icon" v-else />
      </div>
      <div class="padding-box" v-if="!this.isNextStageDone"></div>
    </div>
    <button
      :class="{
        'next-stage': true,
        'border-color-brown': !isGamePage(),
        'border-color-blue': isGamePage(),
      }"
      v-if="this.isNextStageDone"
      @click="goToNextStage"
    >
      <ArrowRight />
    </button>
  </div>
</template>

<script>
import ArrowLeft from '../assets/svg-icon/arrow-left.svg';
import ArrowRight from '../assets/svg-icon/arrow-right.svg';
import Status1BrownActive from '../assets/svg-icon/progress-status-icon/brown/active/status1-brown-active.svg';
import Status2BrownActive from '../assets/svg-icon/progress-status-icon/brown/active/status2-brown-active.svg';
import Status3BrownActive from '../assets/svg-icon/progress-status-icon/brown/active/status3-brown-active.svg';
import Status4BrownActive from '../assets/svg-icon/progress-status-icon/brown/active/status4-brown-active.svg';
import Status1BrownNormal from '../assets/svg-icon/progress-status-icon/brown/normal/status1-brown-normal.svg';
import Status2BrownNormal from '../assets/svg-icon/progress-status-icon/brown/normal/status2-brown-normal.svg';
import Status3BrownNormal from '../assets/svg-icon/progress-status-icon/brown/normal/status3-brown-normal.svg';
import Status4BrownNormal from '../assets/svg-icon/progress-status-icon/brown/normal/status4-brown-normal.svg';
import Status1BlueActive from '../assets/svg-icon/progress-status-icon/blue/active/status1-blue-active.svg';
import Status2BlueActive from '../assets/svg-icon/progress-status-icon/blue/active/status2-blue-active.svg';
import Status3BlueActive from '../assets/svg-icon/progress-status-icon/blue/active/status3-blue-active.svg';
import Status4BlueActive from '../assets/svg-icon/progress-status-icon/blue/active/status4-blue-active.svg';
import Status5BlueActive from '../assets/svg-icon/progress-status-icon/blue/active/status5-blue-active.svg';
import Status1BlueNormal from '../assets/svg-icon/progress-status-icon/blue/normal/status1-blue-normal.svg';
import Status2BlueNormal from '../assets/svg-icon/progress-status-icon/blue/normal/status2-blue-normal.svg';
import Status3BlueNormal from '../assets/svg-icon/progress-status-icon/blue/normal/status3-blue-normal.svg';
import Status4BlueNormal from '../assets/svg-icon/progress-status-icon/blue/normal/status4-blue-normal.svg';
import Status5BlueNormal from '../assets/svg-icon/progress-status-icon/blue/normal/status5-blue-normal.svg';

export default {
  name: 'ProgressBar',

  components: {
    ArrowLeft,
    ArrowRight,
    Status1BrownActive,
    Status2BrownActive,
    Status3BrownActive,
    Status4BrownActive,
    Status1BrownNormal,
    Status2BrownNormal,
    Status3BrownNormal,
    Status4BrownNormal,
    Status1BlueActive,
    Status2BlueActive,
    Status3BlueActive,
    Status4BlueActive,
    Status5BlueActive,
    Status1BlueNormal,
    Status2BlueNormal,
    Status3BlueNormal,
    Status4BlueNormal,
    Status5BlueNormal,
  },
  computed: {
    isNextStageDone() {
      return (
        this.completedStage.some((item) => item === this.whichStage + 1)
        && this.whichStage !== (this.isGamePage() ? 5 : 4)
      );
    },
  },
  props: ['whichStage', 'goToNextStage', 'backToPreviousStage', 'completedStage'],
  inject: ['isGamePage'],
};
</script>
<style scoped lang="scss">
.progress-bar {
  display: flex;
  width: 100%;
}
.previous-stage,
.next-stage,
.padding-box {
  min-width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.now-stage {
  flex-grow: 1;
  width: 100%;
  min-width: 230px;
  padding-top: 15px;
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
  width: 100%;
  p {
    margin-right: 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 2px;
    text-align: center;
  }
  .text-color-brown {
    color: #ffedb2;
  }
  .text-color-blue {
    color: #effffc;
  }
  .stage-icon {
    height: auto;
  }
}
.svg-icon {
  width: 30px;
}
.border-color-brown {
  border-left: 2px solid #8f6433;
  border-top: 2px solid #8f6433;
  border-right: 2px solid #190f04;
  border-bottom: 2px solid #3a2c1e;
}

.border-color-blue {
  border-left: 2px solid #4198b5;
  border-top: 2px solid #4198b5;
  border-right: 2px solid #061e29;
  border-bottom: 2px solid #061e29;
}
</style>

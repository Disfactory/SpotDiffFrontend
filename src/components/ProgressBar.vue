<template>
  <div class="progress-bar border-color-brown bg-brown">
    <button class="previous-stage" v-if="stageOfTutorial !== 1" @click="backToPreviousStage">
      <ArrowLeft />
    </button>
    <div class="now-stage">
      <p>教學進度</p>
      <div class="stage-icon">
        <Status1BrownActive class="svg-icon" v-if="stageOfTutorial === 1" />
        <Status1BrownNormal class="svg-icon" v-else />
        <Status2BrownActive class="svg-icon" v-if="stageOfTutorial === 2" />
        <Status2BrownNormal class="svg-icon" v-else />
        <Status3BrownActive class="svg-icon" v-if="stageOfTutorial === 3" />
        <Status3BrownNormal class="svg-icon" v-else />
        <Status4BrownActive class="svg-icon" v-if="stageOfTutorial === 4" />
        <Status4BrownNormal class="svg-icon" v-else />
      </div>
    </div>
    <button class="next-stage" v-if="stageOfTutorial !== 4" @click="goToNextStage">
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
  },
  props: ['stageOfTutorial', 'goToNextStage', 'backToPreviousStage'],
};
</script>
<style scoped lang="scss">
.progress-bar {
  display: flex;
  width: 100%;
  justify-content: center;
}
.previous-stage,
.next-stage {
  border-left: 2px solid #8f6433;
  border-top: 2px solid #8f6433;
  border-right: 2px solid #190f04;
  border-bottom: 2px solid #3a2c1e;
  min-width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.now-stage {
  min-width: 230px;
  border-left: 2px solid #8f6433;
  border-top: 2px solid #8f6433;
  border-right: 2px solid #190f04;
  border-bottom: 2px solid #3a2c1e;
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
    color: #ffedb2;
  }
  .stage-icon {
    height: auto;
  }
}
.svg-icon {
width: 30px;
}
</style>

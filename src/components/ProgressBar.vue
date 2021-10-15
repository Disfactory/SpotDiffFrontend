<template>
  <div class="progress-bar border-color-brown  bg-brown">
    <div class="text">教學進度</div>
    <div class="status">
      <Status1BrownActive v-if="nowStatus === 1" />
      <Status1BrownNormal v-else />
      <Status2BrownActive v-if="nowStatus === 2" />
      <Status2BrownNormal v-else />
      <Status3BrownActive v-if="nowStatus === 3" />
      <Status3BrownNormal v-else />
      <Status4BrownActive v-if="nowStatus === 4" />
      <Status4BrownNormal v-else />
    </div>
    <!-- <button class="test" @click="nowStatus++">test</button> -->
  </div>
</template>

<script>
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
    Status1BrownActive,
    Status2BrownActive,
    Status3BrownActive,
    Status4BrownActive,
    Status1BrownNormal,
    Status2BrownNormal,
    Status3BrownNormal,
    Status4BrownNormal,
  },
  data() {
    return {
      isActive: false,
      nowStatus: 1,
    };
  },
};
</script>
<style scoped lang="scss">
.progress-bar {
  width: 100%;
  margin: 0 auto;
  border-left: 2px solid #8f6433;
  border-top: 2px solid #8f6433;
  border-right: 2px solid #190f04;
  border-bottom: 2px solid #190f04;
  padding-top: 15px;
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
}

.text {
  margin-right: 16px;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 2px;
  color: #ffedb2;
}
.status {
  display: flex;
  height: auto;
}
</style>

<template>
  <div v-for="(item, key) in whichStage" :key="key">
    <span class="start-point" ref="start"></span>
    <div class="content" ref="content" v-if="whichStage === item && item % 2 === 1">
      <TutorialTaskA
        :tutorial-info="this.tutorialInfo"
        :tutorial-land-usage="landUsageZhName"
        :which-stage="whichStage"
        :is-task-completed="isTaskCompleted"
        :identify-land-usage="identifyLandUsage"
      />
      <span class="end-point" ref="end"></span>
    </div>
    <div class="content" ref="content" v-if="whichStage === item && item % 2 === 0">
      <span class="start-point" ref="start"></span>
      <TutorialTaskB
        :tutorial-info="tutorialInfo"
        :tutorial-land-usage="landUsageZhName"
        :is-task-completed="isTaskCompleted"
        :which-stage="whichStage"
        :has-illegal-factory="hasIllegalFactory"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
      <span class="end-point" ref="end"></span>
    </div>
  </div>
</template>

<script>
import TutorialTaskA from './TutorialTaskA.vue';
import TutorialTaskB from './TutorialTaskB.vue';

export default {
  name: 'TutorialContent',
  components: {
    TutorialTaskA,
    TutorialTaskB,
  },
  data() {
    return {
      contentHeight: 0,
      questionData: [
        {
          questionInfo: {
            cityName: '彰化縣',
            townName: '鹿港鎮',
            olderPhotoId: 'tutorial1-2017.png',
            newerPhotoId: 'tutorial1-2020.png',
          },
          tutorialAnswer: {
            landUsage: '',
            hasIllegalFactory: '',
          },
        },
        {
          questionInfo: {
            cityName: '宜蘭縣',
            townName: '頭城鎮',
            olderPhotoId: 'tutorial2-2017.png',
            newerPhotoId: 'tutorial2-2020.png',
          },
          tutorialAnswer: {
            landUsage: '',
            hasIllegalFactory: '',
          },
        },
      ],
      isTaskCompleted: false,
    };
  },
  methods: {
    calculateHeight() {
      this.contentHeight = this.$refs.content.clientHeight;
    },
    sendAnswer() {
      this.hasAnswered = true;
    },
    identifyLandUsage(landUsage) {
      this.questionData[this.whichData].tutorialAnswer.landUsage = landUsage;
      this.isTaskCompleted = true;
    },
    identifyHasIllegalFactory(hasIllegalFactory) {
      this.questionData[this.whichData].tutorialAnswer.hasIllegalFactory = hasIllegalFactory;
      this.isTaskCompleted = true;
    },
  },
  watch: {
    whichStage() {
      this.isTaskCompleted = false;
    },
  },
  computed: {
    landUsageZhName() {
      let landUsageZhName = '';
      if (this.landUsage === 'farm-land') {
        landUsageZhName = '農地';
      } else if (this.landUsage === 'building-land') {
        landUsageZhName = '建地';
      } else {
        landUsageZhName = '不知道';
      }
      return landUsageZhName;
    },

    whichData() {
      return (this.whichStage % 2 === 0 ? this.whichStage : this.whichStage + 1) / 2 - 1;
    },
    tutorialInfo() {
      return this.questionData[this.whichData].questionInfo;
    },
    landUsage() {
      return this.questionData[this.whichData].tutorialAnswer.landUsage;
    },
    hasIllegalFactory() {
      return this.questionData[this.whichData].tutorialAnswer.hasIllegalFactory;
    },
    infoOfCurrentStage() {
      return {
        address: this.address[this.whichData],
        images: this.images[this.whichStage - 1],
      };
    },
  },
  props: ['whichStage'],
  updated() {
    if (this.isTaskCompleted && this.$refs.end.scrollIntoView) {
      this.$refs.end.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else if (!this.isTaskCompleted && this.$refs.start.scrollIntoView) {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  },
};
</script>

<style scoped lang="scss">
.start-point {
  visibility: hidden;
  height: 0px;
  width: 0px;
}
.end-point {
  visibility: hidden;
  height: 0px;
  width: 0px;
}
.content {
  width: 375px;
  margin-bottom: 30px;
  padding-right: 12px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.divider-icon-brown {
  margin-bottom: 23px;
  margin-left: 0px;
  margin-right: 0px;
}
</style>

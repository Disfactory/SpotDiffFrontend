<template>
  <div class="container bg-darkBrown">
    <TheHeader />
    <ProgressBar
      :stage-of-tutorial="stageOfTutorial"
      :go-to-next-stage="goToNextStage"
      :back-to-previous-stage="backToPreviousStage"
    />
    <TutorialContent :stage-of-tutorial="stageOfTutorial" :go-to-next-stage="goToNextStage" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import TutorialContent from '@/components/TutorialContent.vue';

export default {
  name: 'TheTutorial',
  data() {
    return { stageOfTutorial: 1 };
  },
  methods: {
    goToNextStage() {
      if (this.stageOfTutorial < 4) {
        this.stageOfTutorial += 1;
      }
    },
    backToPreviousStage() {
      if (this.stageOfTutorial > 1) {
        this.stageOfTutorial -= 1;
      }
    },
  },
  components: {
    TheHeader,
    ProgressBar,
    TutorialContent,
  },
};
</script>
<style lang="scss" scoped></style>

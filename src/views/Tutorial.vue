<template>
  <div class="container bg-darkBrown">
    <TheHeader />
    <ProgressBar
      :which-stage="whichStage"
      :go-to-next-stage="goToNextStage"
      :back-to-previous-stage="backToPreviousStage"
    />
    <TutorialContent :which-stage="whichStage" :go-to-next-stage="goToNextStage" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import TutorialContent from '@/components/TutorialContent.vue';

export default {
  name: 'TheTutorial',
  data() {
    return { whichStage: 1 };
  },
  methods: {
    goToNextStage() {
      if (this.whichStage < 4) {
        this.whichStage += 1;
      }
    },
    backToPreviousStage() {
      if (this.whichStage > 1) {
        this.whichStage -= 1;
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

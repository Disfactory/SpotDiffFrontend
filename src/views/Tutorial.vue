<template>
  <div class="fill-full-background bg-darkBrown">
    <div class="container tutorial-container container-border-brown">
      <ProgressBar
        :which-stage="whichStage"
        :back-to-previous-stage="backToPreviousStage"
        :go-to-next-stage="goToNextStage"
        :completed-stage="completedStage"
      />
      <TutorialContent :which-stage="whichStage" />
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import TutorialContent from '@/components/TutorialContent.vue';

export default {
  name: 'TheTutorial',
  data() {
    return { whichStage: 1, completedStage: [1] };
  },
  methods: {
    goToNextStage() {
      if (this.whichStage < 4) {
        this.whichStage += 1;
      } else if (this.$route.name === 'blank') {
        window.close();
      } else {
        this.$router.push('game');
      }
    },
    backToPreviousStage() {
      if (this.whichStage > 1) {
        this.whichStage -= 1;
      }
    },
  },
  watch: {
    whichStage() {
      if (!this.completedStage.some((item) => item === this.whichStage)) {
        this.completedStage.push(this.whichStage);
      }
    },
  },
  components: {
    ProgressBar,
    TutorialContent,
  },
  provide() {
    return {
      goToNextStage: this.goToNextStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.tutorial-container {
  overflow-x: hidden;
}
</style>

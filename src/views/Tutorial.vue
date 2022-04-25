<template>
  <div v-if='!shouldShowCut' class="fill-full-background bg-darkBrown">
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
  <CutBeforeGame v-else/>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import TutorialContent from '@/components/TutorialContent.vue';
import CutBeforeGame from '@/components/CutBeforeGame.vue';

export default {
  name: 'TheTutorial',
  data() {
    return { whichStage: 1, completedStage: [1], shouldShowCut: false };
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
    goToCut() {
      if (this.whichStage === 4) {
        this.shouldShowCut = !this.shouldShowCut;
      } else { this.goToNextStage(); }
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
    CutBeforeGame,
  },
  provide() {
    return {
      goToNextStage: this.goToNextStage,
      goToCut: this.goToCut,
    };
  },
};
</script>

<style lang="scss" scoped>
.tutorial-container {
  overflow-x: hidden;
}
</style>

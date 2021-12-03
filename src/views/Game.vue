<template>
  <div class="container bg-darkBlue">
    <TheHeader />
    <ProgressBar
      :go-to-next-stage="goToNextStage"
      :back-to-previous-stage="backToPreviousStage"
      :whichStage="whichStage"
      :completed-stage="completedStage"
    />
    <GameContent :which-Question="whichStage" :go-to-next-stage="goToNextStage" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import GameContent from '@/components/GameContent.vue';

export default {
  name: 'TheTutorial',
  data() {
    return { whichStage: 1, completedStage: [1] };
  },
  methods: {
    goToNextStage() {
      if (this.whichStage < 5) {
        this.whichStage += 1;
      } else {
        this.$router.push('ending');
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
    TheHeader,
    ProgressBar,
    GameContent,
  },
  inject: ['isGamePage'],
};
</script>

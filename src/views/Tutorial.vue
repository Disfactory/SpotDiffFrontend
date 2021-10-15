<template>
  <div class="container bg-darkBrown">
    <TheHeader />
    <ProgressBar />
    <TutorialContent />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import TutorialContent from '@/components/TutorialContent.vue';

export default {
  name: 'TheTutorial',

  components: {
    TheHeader,
    ProgressBar,
    TutorialContent,
  },
};
</script>
<style scoped></style>

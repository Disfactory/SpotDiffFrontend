<template>
  <div class="fill-full-background bg-skyBlue"><TheIntro /></div>
</template>

<script>
// @ is an alias to /src
import TheIntro from '@/components/TheIntro.vue';

export default {
  name: 'Home',
  components: { TheIntro },
};
</script>
<style scoped></style>

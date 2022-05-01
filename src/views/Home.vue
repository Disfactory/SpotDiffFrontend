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
<style lang="scss" scoped>

.fill-full-background{
  overflow: auto;
  height: calc(100vh - 31.5px);
}

</style>

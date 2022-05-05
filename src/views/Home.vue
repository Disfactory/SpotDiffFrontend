<template>
  <Head>
    <title>Hello World</title>
    <base href="/base" />
    <html lang="en-US" class="theme-dark" />
  </Head>
  <div class="fill-full-background bg-skyBlue"><TheIntro /></div>
</template>

<script >
// @ is an alias to /src
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import TheIntro from '@/components/TheIntro.vue';
import { TITLE } from '../constant/title';

export default {
  name: 'Home',
  components: { TheIntro },
  setup() {
    const title = ref(`${TITLE}首頁`);
    useHead({ title });
  },
};
</script>
<style lang="scss" scoped>

.fill-full-background{
  overflow: auto;
  height: calc(100vh - 31.5px);
}

</style>

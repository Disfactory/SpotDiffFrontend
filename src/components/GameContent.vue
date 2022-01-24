<template>
  <span class="start-point" ref="start"></span>
  <div v-for="(item, key) in whichQuestion" :key="key">
    <div class="content" v-if="whichQuestion === item">
      <GameTaskA
        v-if="!isTaskACompleted"
        :which-question="whichQuestion"
        :identify-land-usage="identifyLandUsage"
        :params-of-maps="paramsOfMaps"
      />
      <GameTaskB
        v-else
        :land-usage="landUsage"
        :which-question="whichQuestion"
        :params-of-maps="paramsOfMaps"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GameTaskA from './GameTaskA.vue';
import GameTaskB from './GameTaskB.vue';

export default {
  name: 'TutorialContent',
  components: {
    GameTaskA,
    GameTaskB,
  },
  data() {
    return {
      questionInfo: [],
      isTaskACompleted: false,
      // userInfo created when user enter the game
      userInfo: { id: 7897897, createdTime: 'test1' },
    };
  },
  methods: {
    scrollToTop() {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },
    storeCurrentQuestionData(key, value) {
      //   const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      //   data[this.whichQuestion - 1].landUsage = landUsage;
      //   In testing phase, we will get 15 set of data in '/location' of spotdiff-test-api,
      //   User would have to answer 5 set of data per time, and if all set hasn't not answer
      //   yet, the data we store in localStorage will not be cleared.
      ///  code for testing start:
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      const doneTime = JSON.parse(localStorage.getItem('SpotDiffDataDoneTime'));
      data[doneTime * 5 + this.whichQuestion - 1][key] = value;
      ///  code for testing end
      localStorage.setItem('SpotDiffData', JSON.stringify(data));
    },
    identifyLandUsage(landUsage) {
      this.storeCurrentQuestionData('landUsage', landUsage);
      if (landUsage === 'unknown') {
        this.identifyHasIllegalFactory('unknown');
      } else {
        this.isTaskACompleted = true;
      }
    },

    identifyHasIllegalFactory(hasIllegalFactory) {
      this.storeCurrentQuestionData('hasIllegalFactory', hasIllegalFactory);
      this.StoreParamsOfMaps();
      this.goToNextStage();
    },
    StoreParamsOfMaps() {
      this.storeCurrentQuestionData('yearOld', this.paramsOfMaps.yearOld);
      this.storeCurrentQuestionData('yearNew', this.paramsOfMaps.yearNew);
      this.storeCurrentQuestionData('zoomInLevel', this.paramsOfMaps.zoomInLevel);
    },
  },
  watch: {
    whichQuestion() {
      this.isTaskACompleted = false;
      this.scrollToTop();
    },
    isTaskACompleted() {
      this.scrollToTop();
    },
  },
  computed: {
    currentQuestionData() {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      const doneTime = JSON.parse(localStorage.getItem('SpotDiffDataDoneTime'));
      return data[doneTime * 5 + this.whichQuestion - 1];
    },
    landUsage() {
      return this.currentQuestionData.landUsage;
    },
    paramsOfMaps() {
      return {
        yearOld: 2017,
        yearNew: 2020,
        zoomInLevel: 17,
      };
    },
    isLoaded() {
      return !(localStorage.getItem('SpotDiffData') === null);
    },
  },
  props: { whichQuestion: Number, goToNextStage: Function },
  async created() {
    try {
      await axios.patch(`${process.env.VUE_APP_SPOTDIFF_API_URL}/db`, {
        userId: this.userInfo.id,
        createdTime: this.userInfo.createdTime,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped lang="scss">
.start-point {
  visibility: hidden;
  margin-top: -100px;
  margin-bottom: 100px;
}
.content {
  width: 375px;
  padding-bottom: 46px;
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

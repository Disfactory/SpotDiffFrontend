<template>
  <div v-for="(item, key) in whichQuestion" :key="key">
    <div class="content" v-if="whichQuestion === item">
      <TaskA
        v-if="!isTaskACompleted"
        :which-question="whichQuestion"
        :identify-land-usage="identifyLandUsage"
      />
      <TaskB
        v-else
        :land-usage="landUsage"
        :which-question="whichQuestion"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TaskA from './TaskA.vue';
import TaskB from './TaskB.vue';

export default {
  name: 'TutorialContent',
  components: {
    TaskA,
    TaskB,
  },
  data() {
    return {
      questionInfo: [],
      hasAnswered: false,
      isTaskACompleted: false,
      // userInfo created when user enter the game
      userInfo: { id: 7897897, createdTime: 'test1' },
    };
  },
  methods: {
    identifyLandUsage(landUsage) {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      data[this.whichQuestion - 1].landUsage = landUsage;
      localStorage.setItem('SpotDiffData', JSON.stringify(data));
      if (landUsage === 'unknown') {
        this.identifyHasIllegalFactory('unknown');
      } else {
        this.isTaskACompleted = true;
      }
    },

    identifyHasIllegalFactory(hasIllegalFactory) {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      data[this.whichQuestion - 1].hasIllegalFactory = hasIllegalFactory;
      localStorage.setItem('SpotDiffData', JSON.stringify(data));
      this.goToNextStage();
    },
  },
  watch: {
    whichQuestion() {
      this.isTaskACompleted = false;
    },
  },
  computed: {
    landUsage() {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      return data[this.whichQuestion - 1].landUsage;
    },
    hasIllegalFactory() {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      return data[this.whichQuestion - 1].hasIllegalFactory;
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
.content {
  width: 375px;
  padding-bottom: 46px;
  padding-right: 21px;
  padding-left: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-answer {
  margin-top: 41px;
  .card-icon {
    position: absolute;
    left: calc(50vw - 187.5px + 21px);
    top: -32px;
  }
  .card-text {
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0.5px;
    text-align: left;
    padding-top: 22px;
    padding-bottom: 19px;
  }
  .text-strong {
    text-align: center;
    font-size: 25px;
    padding-left: 42px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  &.answerB {
    .text-strong {
      padding-left: 67px;
    }
  }
}
.divider-icon-brown {
  margin-bottom: 23px;
  margin-left: 0px;
  margin-right: 0px;
}
</style>

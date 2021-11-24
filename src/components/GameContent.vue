<template>
  <div v-for="(item, key) in whichQuestion" :key="key">
    <div class="content" v-if="whichQuestion === item">
      <TaskA
        @send-question-info="getQuestionInfo"
        v-if="!isTaskACompleted"
        :which-question="whichQuestion"
        :identify-land-usage="identifyLandUsage"
      />
      <TaskB
        v-else
        :land-usage="landUsage"
        :question-info="questionInfo"
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
    getQuestionInfo(data) {
      this.questionInfo = data;
    },
    identifyLandUsage(landUsage) {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      data[this.whichQuestion - 1].userAnswer.landUsage = landUsage;
      if (landUsage === 'unknown') {
        this.identifyHasIllegalFactory('unknown');
      }
      localStorage.setItem('SpotDiffData', JSON.stringify(data));
      this.isTaskACompleted = true;
    },

    identifyHasIllegalFactory(hasIllegalFactory) {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      data[this.whichQuestion - 1].userAnswer.hasIllegalFactory = hasIllegalFactory;
      this.goToNextStage();
    },
  },
  watch: {
    whichQuestion() {
      this.isTaskACompleted = false;
    },
  },
  computed: {
    newArray() {
      return {
        questionInfo: {
          id: '',
          longitude: '',
          latitude: '',
          cityName: '',
          townName: '',
          zoomInLevel: 17,
        },
        userAnswer: {
          landUsage: '',
          hasIllegalFactory: '',
        },
      };
    },
    landUsage() {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      return data[this.whichQuestion - 1].userAnswer.landUsage;
    },
    hasIllegalFactory() {
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      return data[this.whichQuestion - 1].userAnswer.hasIllegalFactory;
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

<template>
  <div v-for="(item, key) in whichQuestion" :key="key">
    <div class="content" v-if="whichQuestion === item">
      <TaskA
        v-if="!isTaskACompleted"
        :question-info="this.questionData[this.whichQuestion - 1].questionInfo"
        :identify-land-usage="identifyLandUsage"
      />
      <TaskB
        v-else
        :land-usage="this.questionData[this.whichQuestion - 1].userAnswer.landUsage"
        :question-info="this.questionData[this.whichQuestion - 1].questionInfo"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
    </div>
  </div>
</template>

<script>
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
      hasAnswered: false,
      isTaskACompleted: false,
      // userInfo created when user enter the game
      userInfo: { id: '', createdTime: '' },
      questionData: [
        {
          questionInfo: {
            id: '',
            longitude: '121.511944',
            latitude: '25.04',
            cityName: '彰化縣',
            townName: '鹿港鎮',
            zoomInLevel: 16,
          },
          userAnswer: {
            landUsage: '',
            hasIllegalFactory: '',
          },
        },
      ],
    };
  },
  methods: {
    identifyLandUsage(landUsage) {
      if (!this.questionData[this.whichQuestion - 1]) {
        this.questionData.push(this.newArray);
      }
      this.questionData[this.whichQuestion - 1].userAnswer.landUsage = landUsage;
      this.isTaskACompleted = true;
      if (landUsage === 'unknown') {
        this.questionData[this.whichQuestion - 1].userAnswer.hasIllegalFactory = 'unknown';
        this.goToNextStage();
      }
    },
    identifyHasIllegalFactory(hasIllegalFactory) {
      this.questionData[this.whichQuestion - 1].userAnswer.hasIllegalFactory = hasIllegalFactory;
      this.goToNextStage();
    },
  },
  watch: {
    whichQuestion() {
      this.isTaskACompleted = false;
      if (!this.questionData[this.whichQuestion - 1]) {
        this.questionData.push(this.newArray);
      }
    },
  },
  computed: {
    newArray() {
      return {
        questionInfo: {
          id: '',
          longitude: '121.511944',
          latitude: '25.04',
          cityName: '彰化縣',
          townName: '鹿港鎮',
          zoomInLevel: 17,
        },
        userAnswer: {
          landUsage: '',
          hasIllegalFactory: '',
        },
      };
    },
  },
  props: { whichQuestion: Number, goToNextStage: Function },
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

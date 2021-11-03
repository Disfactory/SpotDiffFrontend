<template>
  <div v-for="(item, key) in whichStage" :key="key">
    <div class="content" v-if="whichStage === item && item % 2 === 1">
      <TaskA
        :is-task-completed="isTaskCompleted"
        :question-info="this.questionInfo"
        :identify-land-usage="identifyLandUsage"
      />
      <BrownCard :next-question="goToNextStage" class="card-answer" v-if="isTaskCompleted">
        <template v-slot:icon>
          <LandWithShadow v-if="whichStage === 1" class="card-icon" />
          <FactoryWithShadow v-else class="card-icon" />
        </template>
        <template v-slot:answer>
          <div v-if="whichStage === 1">
            <p class="card-text text-strong ">答案：農地</p>
            <p class="card-text">
              每塊地的形狀不一，若是農地，不一定會是綠色，但是會呈現均值的平面感。
            </p>
          </div>
          <div v-else>
            <p class="card-text text-strong ">答案：建物</p>
            <p class="card-text">
              若是建物，會有陰影、突起物、非均值的感覺。
            </p>
          </div>
        </template>
      </BrownCard>
    </div>
    <div class="content" v-if="whichStage === item && item % 2 === 0">
      <TaskB
        :is-task-completed="isTaskCompleted"
        :question-info="this.questionInfo"
        :land-usage="this.landUsage"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
      <BrownCard :next-question="goToNextStage" class="card-answer answerB" v-if="isTaskCompleted">
        <template v-slot:icon>
          <HasBuildingWithShadow v-if="whichStage === 2" class="card-icon" />
          <HasExpansionWithShadow class="card-icon" v-else />
        </template>
        <template v-slot:answer>
          <div v-if="whichStage === 2">
            <p class="card-text text-strong ">答案：有建物</p>
          </div>
          <div v-else>
            <p class="card-text text-strong ">答案：有擴建</p>
            <p class="card-text">有擴建，跟以前比白色建築物會增加。</p>
          </div>
        </template>
      </BrownCard>
    </div>
  </div>
</template>

<script>
import BrownCard from './BrownCard.vue';
import LandWithShadow from '../assets/svg-icon/land-with-shadow.svg';
import FactoryWithShadow from '../assets/svg-icon/factory-with-shadow.svg';
import HasBuildingWithShadow from '../assets/svg-icon/has-building-with-shadow.svg';
import HasExpansionWithShadow from '../assets/svg-icon/has-expansion-with-shadow.svg';
import TaskA from './TaskA.vue';
import TaskB from './TaskB.vue';

export default {
  name: 'TutorialContent',
  components: {
    BrownCard,
    TaskA,
    TaskB,
    LandWithShadow,
    FactoryWithShadow,
    HasBuildingWithShadow,
    HasExpansionWithShadow,
  },
  data() {
    return {
      questionData: [
        {
          questionInfo: {
            cityName: '彰化縣',
            townName: '鹿港鎮',
            olderPhotoId: 'tutorial1-2017.png',
            newerPhotoId: 'tutorial1-2020.png',
          },
          tutorialAnswer: {
            landUsage: 'farm-land',
            hasIllegalFactory: true,
          },
        },
        {
          questionInfo: {
            cityName: '宜蘭縣',
            townName: '頭城鎮',
            olderPhotoId: 'tutorial2-2017.png',
            newerPhotoId: 'tutorial2-2020.png',
          },
          tutorialAnswer: {
            landUsage: 'building-land',
            hasIllegalFactory: true,
          },
        },
      ],
      isTaskCompleted: false,
    };
  },
  methods: {
    sendAnswer() {
      this.hasAnswered = true;
    },
    identifyLandUsage() {
      this.isTaskCompleted = true;
    },
    identifyHasIllegalFactory() {
      this.isTaskCompleted = true;
    },
  },
  watch: {
    whichStage() {
      this.isTaskCompleted = false;
    },
  },
  computed: {
    questionInfo() {
      return this.questionData[
        (this.whichStage % 2 === 0 ? this.whichStage : this.whichStage + 1) / 2 - 1
      ].questionInfo;
    },
    landUsage() {
      return this.questionData[
        (this.whichStage % 2 === 0 ? this.whichStage : this.whichStage + 1) / 2 - 1
      ].tutorialAnswer.landUsage;
    },
    infoOfCurrentStage() {
      return {
        address: this.address[
          (this.whichStage % 2 === 0 ? this.whichStage : this.whichStage + 1) / 2 - 1
        ],
        images: this.images[this.whichStage - 1],
      };
    },
  },
  props: ['whichStage', 'goToNextStage'],
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

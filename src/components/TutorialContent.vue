<template>
  <div class="content" v-if="stageOfTutorial === 1">
    <TutorialQuestionA
      :has-answered="hasAnswered"
      :send-answer="sendAnswer"
      :info-of-current-stage="infoOfCurrentStage"
    />
    <BrownCard :next-question="nextQuestion" class="card-answer" v-if="hasAnswered">
      <template v-slot:icon>
        <LandWithShadow class="card-icon" />
      </template>
      <template v-slot:answer>
        <p class="card-text text-strong ">答案：農地</p>
        <p class="card-text">
          每塊地的形狀不一，若是農地，不一定會是綠色，但是會呈現均值的平面感。
        </p>
      </template>
    </BrownCard>
  </div>
  <div class="content" v-if="stageOfTutorial === 2">
    <TutorialQuestionB
      :has-answered="hasAnswered"
      :send-answer="sendAnswer"
      :info-of-current-stage="infoOfCurrentStage"
      :stage-of-tutorial="stageOfTutorial"
    />
    <BrownCard :next-question="nextQuestion" class="card-answer answerB" v-if="hasAnswered">
      <template v-slot:icon>
        <HasBuildingWithShadow class="card-icon" />
      </template>
      <template v-slot:answer>
        <p class="card-text text-strong ">答案：有建物</p>
      </template>
    </BrownCard>
  </div>
  <div class="content" v-if="stageOfTutorial === 3">
    <TutorialQuestionA
      :has-answered="hasAnswered"
      :send-answer="sendAnswer"
      :info-of-current-stage="infoOfCurrentStage"
    />
    <BrownCard :next-question="nextQuestion" class="card-answer" v-if="hasAnswered">
      <template v-slot:icon>
        <FactoryWithShadow class="card-icon" />
      </template>
      <template v-slot:answer>
        <p class="card-text text-strong ">答案：建物</p>
        <p class="card-text">
          若是建物，會有陰影、突起物、非均值的感覺。
        </p>
      </template>
    </BrownCard>
  </div>

  <div class="content" v-if="stageOfTutorial === 4">
    <TutorialQuestionB
      :has-answered="hasAnswered"
      :send-answer="sendAnswer"
      :info-of-current-stage="infoOfCurrentStage"
      :stage-of-tutorial="stageOfTutorial"
    />
    <BrownCard :next-question="nextQuestion" class="card-answer answerB" v-if="hasAnswered">
      <template v-slot:icon>
        <HasExpansionWithShadow class="card-icon" />
      </template>
      <template v-slot:answer>
        <p class="card-text text-strong ">答案：有擴建</p>
        <p class="card-text">有擴建，跟以前比白色建築物會增加。</p>
      </template>
    </BrownCard>
  </div>
</template>

<script>
import BrownCard from './BrownCard.vue';
import LandWithShadow from '../assets/svg-icon/land-with-shadow.svg';
import FactoryWithShadow from '../assets/svg-icon/factory-with-shadow.svg';
import HasBuildingWithShadow from '../assets/svg-icon/has-building-with-shadow.svg';
import HasExpansionWithShadow from '../assets/svg-icon/has-expansion-with-shadow.svg';
import TutorialQuestionA from './TutorialQuestionA.vue';
import TutorialQuestionB from './TutorialQuestionB.vue';

export default {
  name: 'TutorialContent',
  components: {
    BrownCard,
    TutorialQuestionA,
    TutorialQuestionB,
    LandWithShadow,
    FactoryWithShadow,
    HasBuildingWithShadow,
    HasExpansionWithShadow,
  },
  data() {
    return {
      hasAnswered: false,
      address: ['彰化縣・鹿港鎮', '宜蘭縣・頭城鎮'],
      images: [
        'tutorial1-2017.png',
        'tutorial1-2020.png',
        'tutorial2-2017.png',
        'tutorial2-2020.png',
      ],
    };
  },
  methods: {
    sendAnswer() {
      this.hasAnswered = true;
    },
    nextQuestion() {
      this.goToNextStage();
    },
  },
  watch: {
    stageOfTutorial() {
      this.hasAnswered = false;
    },
  },
  computed: {
    infoOfCurrentStage() {
      return {
        address: this.address[
          (this.stageOfTutorial % 2 === 0 ? this.stageOfTutorial : this.stageOfTutorial + 1) / 2 - 1
        ],
        images: this.images[this.stageOfTutorial - 1],
      };
    },
  },
  props: ['stageOfTutorial', 'goToNextStage'],
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

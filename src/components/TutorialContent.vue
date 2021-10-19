<template>
  <div class="content" v-if="stageOfTutorial === 1">
    <div class="questionA">
      <div class="question-text">
        你覺得 2017 框內是
        <br />
        <span class="text-color-green">農地</span>還是<span class="text-color-blue">建築物</span>？
      </div>
      <div class="identify-box border-brown">
        <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
        <div class="address">彰化縣・鹿港鎮</div>
        <PhotoYear2017 class="photo-year" />
        <img src="@/assets/img/tutorial1-2017.png" />
      </div>

      <div class="button-group" v-if="!hasAnswered">
        <button @click="sendAnswer"><ButtonLand /></button>
        <button @click="sendAnswer"><ButtonFactory /></button>
        <button @click="sendAnswer"><ButtonUnknown /></button>
      </div>

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
  </div>
  <div class="content" v-if="stageOfTutorial === 2">
    <div class="questionB">
      <div class=" question-text">
        2017你選了<span class="text-color-green">農地</span>，在框內<br />2020有建物嗎？
      </div>
      <div class="identify-box border-brown">
        <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
        <div class="address">彰化縣・鹿港鎮</div>
        <PhotoYear2020 class="photo-year" />
        <img src="@/assets/img/tutorial1-2020.png" />
      </div>
      <div class="button-group button-group-2" v-if="!hasAnswered">
        <button @click="sendAnswer"><HasBuilding /></button>
        <button @click="sendAnswer"><NoBuilding /></button>
      </div>
      <DividerIconBrown class="divider-icon-brown" />

      <div class="previous-answer-box">
        <div class="previous-answer-img border-brown">
          <InnerBoundingBox class="inner-bounding-box mask" />
          <img src="@/assets/img/tutorial1-2017.png" />
        </div>
        <div class="previous-answer-caption">2017 你選了農地</div>
      </div>
      <BrownCard :next-question="nextQuestion" class="card-answer answerB" v-if="hasAnswered">
        <template v-slot:icon>
          <HasBuildingWithShadow class="card-icon" />
        </template>
        <template v-slot:answer>
          <p class="card-text text-strong ">答案：有建物</p>
        </template>
      </BrownCard>
    </div>
  </div>

  <div class="content" v-if="stageOfTutorial === 3">
    <div class="qusestionA">
      <div class="question-text">
        你覺得 2017 框內是
        <br />
        <span class="text-color-green">農地</span>還是<span class="text-color-blue">建築物</span>？
      </div>
      <div class="identify-box border-brown">
        <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
        <div class="address">宜蘭縣・頭城鎮</div>
        <PhotoYear2017 class="photo-year" />
        <img src="@/assets/img/tutorial2-2017.png" />
      </div>

      <div class="button-group" v-if="!hasAnswered">
        <button @click="sendAnswer"><ButtonLand /></button>
        <button @click="sendAnswer"><ButtonFactory /></button>
        <button @click="sendAnswer"><ButtonUnknown /></button>
      </div>

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
  </div>

  <div class="content" v-if="stageOfTutorial === 4">
    <div class="questionB">
      <div class=" question-text">
        2017你選了<span class="text-color-blue">建物</span>，在框內<br />2020有建物嗎？
      </div>
      <div class="identify-box border-brown">
        <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
        <div class="address">宜蘭縣・頭城鎮</div>
        <PhotoYear2020 class="photo-year" />
        <img src="@/assets/img/tutorial2-2020.png" />
      </div>
      <div class="button-group button-group-2" v-if="!hasAnswered">
        <button @click="sendAnswer"><HasExpansion /></button>
        <button @click="sendAnswer"><NoExpansion /></button>
      </div>

      <DividerIconBrown class="divider-icon-brown" />
      <div class="previous-answer-box">
        <div class="previous-answer-img border-brown">
          <InnerBoundingBox class="inner-bounding-box mask" />
          <img src="@/assets/img/tutorial2-2017.png" />
        </div>
        <div class="previous-answer-caption">2017 你選了建地</div>
      </div>
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
  </div>
</template>

<script>
import BrownCard from './BrownCard.vue';
import ButtonLand from '../assets/svg-icon/button-land.svg';
import ButtonFactory from '../assets/svg-icon/button-factory.svg';
import ButtonUnknown from '../assets/svg-icon/button-unknown.svg';
import LandWithShadow from '../assets/svg-icon/land-with-shadow.svg';
import FactoryWithShadow from '../assets/svg-icon/factory-with-shadow.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import HasBuilding from '../assets/svg-icon/has-building.svg';
import HasBuildingWithShadow from '../assets/svg-icon/has-building-with-shadow.svg';
import NoBuilding from '../assets/svg-icon/no-building.svg';
import DividerIconBrown from '../assets/svg-icon/divider-icon-brown.svg';
import PhotoYear2017 from '../assets/svg-icon/2017.svg';
import PhotoYear2020 from '../assets/svg-icon/2020.svg';
import HasExpansion from '../assets/svg-icon/has-expansion.svg';
import HasExpansionWithShadow from '../assets/svg-icon/has-expansion-with-shadow.svg';
import NoExpansion from '../assets/svg-icon/no-expansion.svg';

export default {
  name: 'TutorialContent',
  components: {
    BrownCard,
    ButtonLand,
    ButtonFactory,
    ButtonUnknown,
    LandWithShadow,
    FactoryWithShadow,
    InnerBoundingBox,
    HasBuilding,
    HasBuildingWithShadow,
    NoBuilding,
    HasExpansion,
    HasExpansionWithShadow,
    NoExpansion,
    DividerIconBrown,
    PhotoYear2017,
    PhotoYear2020,
  },
  data() {
    return {
      hasAnswered: false,
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
  props: ['stageOfTutorial', 'goToNextStage'],
};
</script>

<style scoped lang="scss">
.content {
  width: 375px;
  padding-bottom: 46px;
  padding-right: 21px;
  padding-left: 21px;
}
.questionA,
.questionB {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.border-brown {
  border-left: 4px solid #947451;
  border-top: 4px solid #947451;
  border-right: 4px solid #1a0f04;
  border-bottom: 4px solid #1a0f04;
}
.identify-box {
  position: relative;
  margin-bottom: 17px;
  overflow: hidden;
  .address {
    position: absolute;
    left: 11px;
    bottom: 7px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
  }
  .photo-year {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.inner-bounding-box {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.mask {
    box-shadow: 0 0 0 10000px rgba(0, 0, 0, 0.27);
  }
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 34px;
  button:focus {
    transform: translateY(-20px);
    transition: transform 0.3s;
  }
  &.button-group-2 {
    margin-top: 20px;
  }
}

.question-text {
  color: #fbfdf0;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  letter-spacing: 0.5px;
  text-align: center;
  padding-top: 37px;
  margin-bottom: 14px;
  .text-color-green {
    color: #c7cc87;
  }
  .text-color-blue {
    color: #82bdd1;
  }
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

.previous-answer-img {
  overflow: hidden;
  position: relative;
  height: 151px;
  width: 333px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
.previous-answer-caption {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.5px;
  color: #cdb69c;
}
</style>

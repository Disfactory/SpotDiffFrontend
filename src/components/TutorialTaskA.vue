<template>
  <div class="question-text">
    這是2017年的空拍圖，你覺得在準心處的是<span class="text-color-green">農地</span>還是<span
      class="text-color-blue"
      >建築物</span
    >呢？
  </div>
  <div class="identify-box border-color-brown">
    <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: isTaskCompleted }" />
    <div class="address">
      {{ `${tutorialInfo.cityName}・${tutorialInfo.townName}` }}
    </div>
    <PhotoYear2017 class="photo-year" />
    <img :src="require(`@/assets/img/${tutorialInfo.olderPhotoId}`)" />
  </div>
  <div v-if="isTaskCompleted" class="tutorial-answer">
    你選擇：{{ this.tutorialLandUsage }}
    <div class="tutorial-answer-icon">
      <CorrectAnswer
        v-if="
          (this.whichStage === 1 && this.tutorialLandUsage === '農地') ||
            (this.whichStage === 3 && this.tutorialLandUsage === '建地')
        "
      />
      <WrongAnswer v-else />
    </div>
  </div>
  <div class="button-group" v-if="!isTaskCompleted">
    <button @click="identifyLandUsage('farm-land')">
      <ButtonLand />
    </button>
    <button @click="identifyLandUsage('building-land')"><ButtonFactory /></button>
    <button @click="identifyLandUsage('unknown')"><ButtonUnknown /></button>
  </div>

  <!-- 教學答案卡 -->
  <BrownCard class="card-answer" v-if="isTaskCompleted">
    <template v-slot:icon>
      <LandWithShadow v-if="whichStage === 1" class="card-icon" />
      <FactoryWithShadow v-else class="card-icon" />
    </template>
    <template v-slot:answer>
      <div v-if="whichStage === 1">
        <p class="card-text text-strong ">答案：農地</p>
        <p class="card-text">
          每塊地的形狀不一，若是農地，不一定會是綠色，但是會呈現均質的平面感。
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
</template>

<script>
import ButtonLand from '../assets/svg-icon/button-land.svg';
import ButtonFactory from '../assets/svg-icon/button-factory.svg';
import ButtonUnknown from '../assets/svg-icon/button-unknown.svg';
import CorrectAnswer from '../assets/svg-icon/correct-answer.svg';
import WrongAnswer from '../assets/svg-icon/wrong-answer.svg';
import PhotoYear2017 from '../assets/svg-icon/2017.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import LandWithShadow from '../assets/svg-icon/land-with-shadow.svg';
import FactoryWithShadow from '../assets/svg-icon/factory-with-shadow.svg';
import BrownCard from './BrownCard.vue';

export default {
  name: 'TutorialTaskA',
  components: {
    ButtonLand,
    ButtonFactory,
    ButtonUnknown,
    CorrectAnswer,
    WrongAnswer,
    PhotoYear2017,
    InnerBoundingBox,
    LandWithShadow,
    FactoryWithShadow,

    BrownCard,
  },
  props: {
    isTaskCompleted: Boolean,
    tutorialInfo: Object,
    identifyLandUsage: Function,
    tutorialLandUsage: String,
    whichStage: Number,
  },
};
</script>

<style scoped lang="scss">
.question-text {
  color: #fbfdf0;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
  letter-spacing: 0.5px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  .text-color-green {
    color: #c7cc87;
  }
  .text-color-blue {
    color: #82bdd1;
  }
}
.identify-box {
  position: relative;
  margin-bottom: 17px;
  overflow: hidden;
  width: 333px;
  height: 208px;
  .address {
    z-index: 10;
    position: absolute;
    left: 11px;
    bottom: 7px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
  }
  .photo-year {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
}
.border-color-brown {
  border-left: 4px solid #947451;
  border-top: 4px solid #947451;
  border-right: 4px solid #1a0f04;
  border-bottom: 4px solid #1a0f04;
}
.border-color-blue {
  border-left: 4px solid #0f7ea1;
  border-top: 4px solid #0f7ea1;
  border-right: 4px solid #061e29;
  border-bottom: 4px solid #061e29;
}
.inner-bounding-box {
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.mask {
    box-shadow: 0 0 0 10000px rgba(0, 0, 0, 0.27);
  }
}
.tutorial-answer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-top: 14px;
  .tutorial-answer-icon {
    margin-top: 12px;
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
}

.card-answer {
  margin-top: 34px;
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
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.loading-page {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>

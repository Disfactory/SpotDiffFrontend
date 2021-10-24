<template>
  <div class=" question-text">
    2017你選了
    <span v-if="stageOfTutorial === 2" class="text-color-green">農地</span>
    <span v-if="stageOfTutorial === 4" class="text-color-blue">建地</span>
    ，在框內<br />2020有建物嗎？
  </div>
  <div class="identify-box">
    <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
    <div class="address">{{ infoOfCurrentStage.address }}</div>
    <PhotoYear2020 class="photo-year" />
    <img :src="require(`@/assets/img/${infoOfCurrentStage.images}`)" />
  </div>
  <div class="button-group" v-if="!hasAnswered">
    <button v-if="stageOfTutorial === 2" @click="sendAnswer"><HasBuilding /></button>
    <button v-if="stageOfTutorial === 2" @click="sendAnswer"><NoBuilding /></button>
    <button v-if="stageOfTutorial === 4" @click="sendAnswer"><HasExpansion /></button>
    <button v-if="stageOfTutorial === 4" @click="sendAnswer"><NoExpansion /></button>
  </div>
  <DividerIconBrown class="divider-icon-brown" />

  <div class="previous-answer-box">
    <div class="previous-answer-img border-brown">
      <InnerBoundingBox class="inner-bounding-box mask" />
      <img src="@/assets/img/tutorial1-2017.png" v-if="stageOfTutorial === 2" />
      <img src="@/assets/img/tutorial2-2017.png" v-if="stageOfTutorial === 4" />
    </div>
    <div class="previous-answer-caption">
      2017 你選了<span v-if="stageOfTutorial === 2">農地</span>
      <span v-if="stageOfTutorial === 4">建地</span>
    </div>
  </div>
</template>

<script>
import PhotoYear2020 from '../assets/svg-icon/2020.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import HasBuilding from '../assets/svg-icon/has-building.svg';
import NoBuilding from '../assets/svg-icon/no-building.svg';
import DividerIconBrown from '../assets/svg-icon/divider-icon-brown.svg';
import HasExpansion from '../assets/svg-icon/has-expansion.svg';
import NoExpansion from '../assets/svg-icon/no-expansion.svg';

export default {
  name: 'QuestionB',
  components: {
    PhotoYear2020,
    InnerBoundingBox,
    HasBuilding,
    NoBuilding,
    HasExpansion,
    NoExpansion,
    DividerIconBrown,
  },
  props: {
    hasAnswered: Boolean,
    sendAnswer: Function,
    infoOfCurrentStage: Object,
    stageOfTutorial: Number,
  },
};
</script>

<style scoped lang="scss">
.border-brown {
  border-left: 4px solid #947451;
  border-top: 4px solid #947451;
  border-right: 4px solid #1a0f04;
  border-bottom: 4px solid #1a0f04;
}
.identify-box {
  position: relative;
  margin-bottom: 17px;
  border-left: 4px solid #947451;
  border-top: 4px solid #947451;
  border-right: 4px solid #1a0f04;
  border-bottom: 4px solid #1a0f04;
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
  margin-top: 20px;
  margin-bottom: 34px;
  button:focus {
    transform: translateY(-20px);
    transition: transform 0.3s;
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

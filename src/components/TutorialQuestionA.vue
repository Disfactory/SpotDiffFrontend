<template>
  <div class="questionA">
    <div class="question-text">
      你覺得 2017 框內是
      <br />
      <span class="text-color-green">農地</span>還是<span class="text-color-blue">建築物</span>？
    </div>
    <div class="identify-box">
      <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: hasAnswered }" />
      <div class="address">{{ infoOfCurrentStage.address }}</div>
      <PhotoYear2017 class="photo-year" />
      <img :src="require(`@/assets/img/${infoOfCurrentStage.images}`)" />
    </div>

    <div class="button-group" v-if="!hasAnswered">
      <button @click="sendAnswer"><ButtonLand /></button>
      <button @click="sendAnswer"><ButtonFactory /></button>
      <button @click="sendAnswer"><ButtonUnknown /></button>
    </div>
  </div>
</template>

<script>
import ButtonLand from '../assets/svg-icon/button-land.svg';
import ButtonFactory from '../assets/svg-icon/button-factory.svg';
import ButtonUnknown from '../assets/svg-icon/button-unknown.svg';
import PhotoYear2017 from '../assets/svg-icon/2017.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';

export default {
  name: 'QuestionA',
  components: {
    ButtonLand,
    ButtonFactory,
    ButtonUnknown,
    PhotoYear2017,
    InnerBoundingBox,
  },
  props: {
    hasAnswered: Boolean,
    sendAnswer: Function,
    infoOfCurrentStage: Object,
  },
};
</script>

<style scoped lang="scss">
.questionA {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>

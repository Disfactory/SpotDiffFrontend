<template>
  <div class="questionA">
    <div class="question-text">
      你覺得 2017 框內是
      <br />
      <span class="text-color-green">農地</span>還是<span class="text-color-blue">建築物</span>？
    </div>
    <div
      :class="{
        'identify-box': true,
        'border-color-brown': !isGamePage(),
        'border-color-blue': isGamePage(),
      }"
    >
      <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: isTaskCompleted }" />
      <div class="address">
        {{ `${questionInfo.cityName}・${questionInfo.townName}` }}
      </div>
      <PhotoYear2017 class="photo-year" />
      <img v-if="!isGamePage()" :src="require(`@/assets/img/${questionInfo.olderPhotoId}`)" />
      <div v-else id="oldmap" class="map"></div>
    </div>
    <div class="button-group" v-if="!isTaskCompleted">
      <button @click="identifyLandUsage('farm-land')">
        <ButtonLand />
      </button>
      <button @click="identifyLandUsage('building-land')"><ButtonFactory /></button>
      <button @click="identifyLandUsage('unknown')"><ButtonUnknown /></button>
    </div>
  </div>
</template>

<script>
import ButtonLand from '../assets/svg-icon/button-land.svg';
import ButtonFactory from '../assets/svg-icon/button-factory.svg';
import ButtonUnknown from '../assets/svg-icon/button-unknown.svg';
import PhotoYear2017 from '../assets/svg-icon/2017.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import L from '../../node_modules/leaflet/dist/leaflet';

export default {
  name: 'TaskA',
  data() {
    return {
      oldmap: '',
      oldlayer: '',
      control: '',
      longitude: this.questionInfo.longitude,
      latitude: this.questionInfo.latitude,
      zoomInLevel: 17,
    };
  },
  components: {
    ButtonLand,
    ButtonFactory,
    ButtonUnknown,
    PhotoYear2017,
    InnerBoundingBox,
  },
  props: {
    isTaskCompleted: Boolean,
    questionInfo: Object,
    identifyLandUsage: Function,
  },
  inject: ['isGamePage'],
  mounted() {
    if (this.isGamePage()) {
      this.oldmap = L.map('oldmap', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
      });
      this.oldmap.setView([this.latitude, this.longitude], this.zoomInLevel);
      this.oldlayer = L.tileLayer(
        'https://data.csrsr.ncu.edu.tw/SP/SP2017NC_3857/{z}/{x}/{y}.png',
        {
          opacity: 1,
        },
      ).addTo(this.oldmap);
    }
  },
};
</script>

<style scoped lang="scss">
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
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>

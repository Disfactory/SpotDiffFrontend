<template>
  <div class=" question-text">
    2017你選了<span v-if="landUsage === 'farm-land'" class="text-color-green">農地</span
    ><span v-if="landUsage === 'building-land'" class="text-color-blue">建地</span>
    ，在框內<br />2020有建物嗎？
  </div>
  <div
    :class="{
      'identify-box': true,
      'border-color-brown': !isGamePage(),
      'border-color-blue': isGamePage(),
    }"
  >
    <InnerBoundingBox :class="{ 'inner-bounding-box': true, mask: isTaskCompleted }" />
    <div v-if="!isGamePage()" class="address">
      {{ `${tutorialInfo.cityName}・${tutorialInfo.townName}` }}
    </div>
    <div v-else class="address">
      <!-- {{ `${questionInfo.cityName}・${questionInfo.townName}` }} -->
    </div>
    <PhotoYear2020 class="photo-year" />
    <img v-if="!isGamePage()" :src="require(`@/assets/img/${tutorialInfo.newerPhotoId}`)" />
    <div v-else id="newMap" class="map"></div>
  </div>
  <div class="button-group" v-if="!isTaskCompleted">
    <button v-if="landUsage === 'farm-land'" @click="identifyHasIllegalFactory(true)">
      <HasBuilding />
    </button>
    <button v-if="landUsage === 'farm-land'" @click="identifyHasIllegalFactory(false)">
      <NoBuilding />
    </button>
    <button v-if="landUsage === 'building-land'" @click="identifyHasIllegalFactory(true)">
      <HasExpansion />
    </button>
    <button v-if="landUsage === 'building-land'" @click="identifyHasIllegalFactory(false)">
      <NoExpansion />
    </button>
  </div>
  <DividerIconBrown :class="{ 'divider-icon': true, 'divider-icon-blue': isGamePage() }" />
  <div class="previous-answer-box ">
    <div
      :class="{
        'previous-answer-img': true,
        'border-color-brown': !isGamePage(),
        'border-color-blue': isGamePage(),
      }"
    >
      <InnerBoundingBox class="inner-bounding-box mask" />
      <img v-if="!isGamePage()" :src="require(`@/assets/img//${tutorialInfo.olderPhotoId}`)" />
      <div v-else id="oldMap" class="map"></div>
    </div>
    <div class="previous-answer-caption">
      2017 你選了<span v-if="landUsage === 'farm-land'">農地</span>
      <span v-if="landUsage === 'building-land'">建地</span>
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
import L from '../../node_modules/leaflet/dist/leaflet';

export default {
  name: 'TaskB',
  data() {
    return {
      questionInfo: [],
      oldMap: '',
      oldLayer: '',
      newMap: '',
      newLayer: '',
    };
  },
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
    identifyHasIllegalFactory: Function,
    landUsage: String,
    tutorialInfo: Object,
    isTaskCompleted: Boolean,
    whichQuestion: Number,
    paramsOfMaps: Object,
  },
  inject: ['isGamePage'],
  mounted() {
    if (this.isGamePage()) {
      //  const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      //   this.questionInfo = data[this.whichQuestion - 1];

      // In testing phase, we will get 15 set of data in '/location' of spotdiff-test-api,
      // User would have to answer 5 set of data per time, and if all set hasn't not answer
      // yet, the data we store in localStorage will not be cleared.
      // code for testing start:
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      const doneTime = JSON.parse(localStorage.getItem('SpotDiffDataDoneTime'));
      this.questionInfo = data[doneTime * 5 + this.whichQuestion - 1];
      // code for testing end

      this.newMap = L.map('newMap', {
        zoomControl: false,
        attributionControl: false,
        touchZoom: false,
        dragging: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
      });
      this.newMap.setView(
        [this.questionInfo.latitude, this.questionInfo.longitude],
        this.paramsOfMaps.zoomInLevel,
      );
      this.newLayer = L.tileLayer(
        `https://data.csrsr.ncu.edu.tw/SP/SP${this.paramsOfMaps.yearNew}NC_3857/{z}/{x}/{y}.png`,
        {
          opacity: 1,
        },
      ).addTo(this.newMap);
      this.oldMap = L.map('oldMap', {
        zoomControl: false,
        attributionControl: false,
        touchZoom: false,
        dragging: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
      });
      this.oldMap.setView(
        [this.questionInfo.latitude, this.questionInfo.longitude],
        this.paramsOfMaps.zoomInLevel,
      );
      this.oldLayer = L.tileLayer(
        `https://data.csrsr.ncu.edu.tw/SP/SP${this.paramsOfMaps.yearOld}NC_3857/{z}/{x}/{y}.png`,
        {
          opacity: 1,
        },
      ).addTo(this.oldMap);
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
    position: absolute;
    left: 11px;
    bottom: 7px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    z-index: 10;
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

.divider-icon {
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

<style lang="scss">
.divider-icon-blue {
  path {
    fill: #365d71;
  }
}
</style>

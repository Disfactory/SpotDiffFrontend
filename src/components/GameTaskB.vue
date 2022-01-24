<template>
  <div class="question-text">
    這是2020年的空拍圖，你覺得 <br />
    <span v-if="landUsage === 'farm-land'">
      在準心處有<span class="text-color-blue">建物</span>嗎？</span
    >
    <span v-if="landUsage === 'building-land'">
      剛剛在準心處的建物有<span class="text-color-blue">擴建</span>嗎？
    </span>
  </div>

  <div class="identify-box border-color-blue">
    <InnerBoundingBox class="inner-bounding-box" />
    <div class="address">
      <!-- {{ `${questionInfo.cityName}・${questionInfo.townName}` }} -->
    </div>
    <PhotoYear2020 class="photo-year" />
    <div id="newMap" class="map"></div>
  </div>
  <div class="button-group">
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
  <DividerIcon class="divider-icon" />

  <div class="previous-answer-box">
    <div class="previous-answer-caption">
      <span v-if="landUsage === 'farm-land'">在2017年的空拍圖中，準心處是農地</span>
      <span v-else-if="landUsage === 'building-land'">在2017年的空拍圖中，準心處是建地</span>
      <span v-else>不知道</span>
    </div>
    <div class=" identify-box border-color-blue">
      <InnerBoundingBox class="inner-bounding-box mask" />
      <div id="oldMap" class="map"></div>
    </div>
  </div>
</template>

<script>
import PhotoYear2020 from '../assets/svg-icon/2020.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import HasBuilding from '../assets/svg-icon/has-building.svg';
import NoBuilding from '../assets/svg-icon/no-building.svg';
import DividerIcon from '../assets/svg-icon/divider-icon.svg';
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
    DividerIcon,
  },

  props: {
    identifyHasIllegalFactory: Function,
    landUsage: String,
    whichQuestion: Number,
    paramsOfMaps: Object,
  },
  mounted() {
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
.divider-icon {
  margin-bottom: 23px;
  margin-left: 0px;
  margin-right: 0px;
}

.card-answer {
  margin-top: 34px;
  .card-icon {
    position: absolute;
    left: calc(50vw - 187.5px + 8px);
    top: -38px;
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
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.5px;
  color: #cdb69c;
  margin-bottom: 10px;
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

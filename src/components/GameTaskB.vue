<template>
  <div class="question-text">
    承上，你覺得 after 準心所在的 <br />位置上有<span class="text-color-blue">{{
      landUsage === 'farm-land' ? '建物' : '擴建'
    }}</span
    >嗎？
  </div>

  <div class="identify-box border-color-blue">
    <InnerBoundingBox class="inner-bounding-box" />
    <div class="address">
      <!-- {{ formattedAddress }} -->
    </div>
    <PhotoYearAfter v-if="shouldShowAfterPhoto" class="photo-year" />
    <PhotoYearBefore v-else class="photo-year" />
    <div id="newMap" :class="['map', { 'hidden-map': !shouldShowAfterPhoto }]"></div>
    <div id="oldMap" :class="['map', { 'hidden-map': shouldShowAfterPhoto }]"></div>
  </div>
  <ToggleSwitcher :should-show-after-photo="shouldShowAfterPhoto" :changePhoto="changePhoto" />
  <div class="button-group">
    <button v-if="landUsage === 'farm-land'" @click="identifyHasIllegalFactory(true)">
      <HasBuilding />
    </button>
    <button v-if="landUsage === 'farm-land'" @click="identifyHasIllegalFactory(false)">
      <NoBuilding />
    </button>
    <button
      v-if="landUsage === 'building-land' || landUsage === 'unknown'"
      @click="identifyHasIllegalFactory(true)"
    >
      <HasExpansion />
    </button>
    <button
      v-if="landUsage === 'building-land' || landUsage === 'unknown'"
      @click="identifyHasIllegalFactory(false)"
    >
      <NoExpansion />
    </button>
  </div>
  <DividerIcon class="divider-icon" />
</template>

<script>
import { mapState } from 'vuex';
import PhotoYearAfter from '../assets/svg-icon/after.svg';
import PhotoYearBefore from '../assets/svg-icon/before.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import HasBuilding from '../assets/svg-icon/has-building.svg';
import NoBuilding from '../assets/svg-icon/no-building.svg';
import DividerIcon from '../assets/svg-icon/divider-icon.svg';
import HasExpansion from '../assets/svg-icon/has-expansion.svg';
import NoExpansion from '../assets/svg-icon/no-expansion.svg';
import ToggleSwitcher from './ToggleSwitcher.vue';
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
      shouldShowAfterPhoto: true,
    };
  },
  components: {
    ToggleSwitcher,
    PhotoYearAfter,
    PhotoYearBefore,
    InnerBoundingBox,
    HasBuilding,
    NoBuilding,
    HasExpansion,
    NoExpansion,
    DividerIcon,
  },
  computed: {
    ...mapState(['latitude', 'longitude']),

    landUsageChineseName() {
      let chineseName = '';
      if (this.landUsage === 'farm-land') {
        chineseName = '農地';
      } else if (this.landUsage === 'building-land') {
        chineseName = '建地';
      } else {
        chineseName = '不知道';
      }
      return chineseName;
    },

  },

  props: {
    identifyHasIllegalFactory: Function,
    whichQuestion: Number,
    paramsOfMaps: Object,
    factoryCoord: [Object, String],
    landUsage: String,
  },
  methods: {
    changePhoto() {
      setTimeout(() => {
        this.shouldShowAfterPhoto = !this.shouldShowAfterPhoto;
      }, 200);
    },
    setMap() {
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
        [this.latitude, this.longitude],
        this.paramsOfMaps.zoom_level,
      );
      this.newLayer = L.tileLayer(
        `https://data.csrsr.ncu.edu.tw/SP/SP${this.paramsOfMaps.year_new}NC_3857/{z}/{x}/{y}.png`,
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
        [this.latitude, this.longitude],
        this.paramsOfMaps.zoom_level,
      );
      this.oldLayer = L.tileLayer(
        `https://data.csrsr.ncu.edu.tw/SP/SP${this.paramsOfMaps.year_old}NC_3857/{z}/{x}/{y}.png`,
        {
          opacity: 1,
        },
      ).addTo(this.oldMap);
    },
  },
  mounted() {
    this.setMap();
  },
};
</script>

<style scoped lang="scss">
.identify-box {
  position: relative;
  overflow: hidden;
  width: 333px;
  height: 208px;
  &--previous-answer {
    height: fit-content;
    margin-bottom: 0;
  }
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
.hidden-map {
  visibility: hidden;
}
</style>

<template>
  <div class="question-text">

    <p>
      這是空拍圖，準心所在的位置
      <br />
      是<span class="text-color-green">農地</span>還是<span class="text-color-blue">建物</span>呢？
    </p>
  </div>
  <div class="identify-box border-color-blue">
    <InnerBoundingBox class="inner-bounding-box" />
    <div class="address">
      <!-- {{formattedAddress}} -->
    </div>
    <PhotoYearBefore class="photo-year" />
    <div id="oldMap" class="map"></div>
  </div>

  <div class="button-group">
    <button @click="identifyLandUsage('farm-land')">
      <ButtonLand />
    </button>
    <button @click="identifyLandUsage('building-land')"><ButtonFactory /></button>
    <button @click="identifyLandUsage('unknown')"><ButtonUnknown /></button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonLand from '../assets/svg-icon/button-land.svg';
import ButtonFactory from '../assets/svg-icon/button-factory.svg';
import ButtonUnknown from '../assets/svg-icon/button-unknown.svg';
import PhotoYearBefore from '../assets/svg-icon/before.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import L from '../../node_modules/leaflet/dist/leaflet';

export default {
  name: 'TaskA',
  data() {
    return {
      oldMap: '',
      oldLayer: '',
      questionInfo: '',
    };
  },
  computed: {
    ...mapState(['latitude', 'longitude']),
    // formattedAddress() {
    //   const { address } = this.factoryCoord;
    //   let formattedAddress = address;
    //   if (address?.startsWith('臺灣省')) {
    //     formattedAddress = address.replace('臺灣省', '');
    //   }
    //   const townshipCode = ['鄉', '鎮', '市', '區'];
    //   if (address?.endsWith('村') || address?.endsWith('里')) {
    //     townshipCode.forEach((township) => {
    //       const index = address.lastIndexOf(township);
    //       if (index !== -1) {
    //         formattedAddress = address.slice(0, index + 1);
    //       }
    //     });
    //   }
    //   return formattedAddress;
    // },
  },
  components: {
    ButtonLand,
    ButtonFactory,
    ButtonUnknown,
    PhotoYearBefore,
    InnerBoundingBox,
  },
  props: {
    identifyLandUsage: Function,
    whichQuestion: Number,
    paramsOfMaps: Object,
    factoryCoord: [Object, String],
  },
  watch: {
    latitude: {
      deep: true,
      handler() {
        if (this.latitude) {
          this.setMap();
        }
      },
    },
  },
  methods: {
    setMap() {
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
    if (this.latitude) {
      this.setMap();
    }
    console.log('latitude:', this.latitude);
    console.log('longitude:', this.longitude);
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
</style>

<template>
  <div v-for="(item, key) in whichQuestion" :key="key">
    <span class="start-point" ref="start"></span>
    <div class="content" v-if="whichQuestion === item">
      <GameTaskA
        v-if="!isTaskACompleted"
        :which-question="whichQuestion"
        :identify-land-usage="identifyLandUsage"
        :params-of-maps="paramsOfMaps"
      />
      <GameTaskB
        v-else
        :which-question="whichQuestion"
        :params-of-maps="paramsOfMaps"
        :land-usage="landUsage"
        :identify-has-Illegal-factory="identifyHasIllegalFactory"
      />
    </div>
  </div>
  <LoadingPage v-if="isLoading" />
</template>

<script>
import haversineOffset from 'haversine-offset';
import { mapActions, mapState } from 'vuex';
import GameTaskA from './GameTaskA.vue';
import GameTaskB from './GameTaskB.vue';
import LoadingPage from './LoadingPage.vue';

export default {
  name: 'TutorialContent',
  components: {
    GameTaskA,
    GameTaskB,
    LoadingPage,
  },
  data() {
    return {
      isLoading: false,
      allFactoriesData: [],
      currentQuestionData: {
        locationId: '',
        factoryCoord: '',
        propertyOfMap: {},
        userAnswer: { landUsage: '', hasIllegalFactory: '' },
      },
      isTaskACompleted: false,
    };
  },
  methods: {
    ...mapActions(['createClientId', 'getUserToken']),

    getFactoriesData() {

    },
    getFactoryCoord() {

    },
    scrollToTop() {
      if (this.$refs.start.scrollIntoView) {
        this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    },
    identifyLandUsage() {
      // if (landUsage === 'unknown') {
      //   this.identifyHasIllegalFactory('unknown');
      // } else {
      //   this.isTaskACompleted = true;
      // }
      this.isTaskACompleted = true;
    },
    identifyHasIllegalFactory() {
      // this.computeBoundingBoxLatLng();
      // this.storeQuestionData();
      setTimeout(() => { this.$router.push('/'); }, 100);

      // this.goToNextStage();
    },
    computeBoundingBoxLatLng() {
      // height and width of innerBoundingBox
      const widthPx = 151; // pixels
      const heightPx = 93; // pixels
      // according to openstreet wiki(https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Resolution_and_Scale),
      // 1 pixel is equal to 1.1943meters in zoomin level 17.
      const widthMeter = widthPx * 1.1943; // meters
      const heightMeter = heightPx * 1.1943; // meters
      // use package 'haversine-offset' to calculate coordinate of top-left, bottom-right corner.
      // This package is base on haversine foumula.
      const center = {
        latitude: this.currentQuestionData.factoryCoord.latitude,
        longitude: this.currentQuestionData.factoryCoord.longitude,
      };
      const bottomRight = { x: widthMeter / 2, y: -heightMeter / 2 };
      const topLeft = { x: -widthMeter / 2, y: heightMeter / 2 };
      const { propertyOfMap } = this.currentQuestionData;
      propertyOfMap.bbox_left_top_lat = haversineOffset(center, topLeft).lat;
      propertyOfMap.bbox_left_top_lng = haversineOffset(center, topLeft).lng;
      propertyOfMap.bbox_bottom_right_lat = haversineOffset(center, bottomRight).lat;
      propertyOfMap.bbox_bottom_right_lng = haversineOffset(center, bottomRight).lng;
    },
    storeQuestionData() {
      //   /* eslint-disable */
      const data = JSON.parse(localStorage.getItem('SpotDiffData'));
      const currentQuestionData = data[this.whichQuestion - 1];
      const { propertyOfMap } = this.currentQuestionData;
      const { userAnswer } = this.currentQuestionData;
      currentQuestionData.source_url_root = this.paramsOfMaps.source_url_root;
      currentQuestionData.year_new = this.paramsOfMaps.year_new;
      currentQuestionData.year_old = this.paramsOfMaps.year_old;
      currentQuestionData.zoom_level = this.paramsOfMaps.zoom_level;
      currentQuestionData.bbox_left_top_lat = propertyOfMap.bbox_left_top_lat;
      currentQuestionData.bbox_left_top_lng = propertyOfMap.bbox_left_top_lng;
      currentQuestionData.bbox_bottom_right_lat = propertyOfMap.bbox_bottom_right_lat;
      currentQuestionData.bbox_bottom_right_lng = propertyOfMap.bbox_bottom_right_lng;
      currentQuestionData.land_usage = userAnswer.landUsage;
      currentQuestionData.expansion = userAnswer.hasIllegalFactory;
      localStorage.setItem('SpotDiffData', JSON.stringify(data));
    },
  },
  watch: {
    whichQuestion() {
      this.isTaskACompleted = false;
      this.scrollToTop();
      this.getFactoryCoord();
    },
    isTaskACompleted() {
      this.scrollToTop();
    },
  },
  computed: {
    ...mapState(['userToken', 'clientId']),

    storedQuestionData() {
      return {};
    },
    landUsage() {
      return this.currentQuestionData.userAnswer.landUsage;
    },
    hasSpotDiffDataInLocal() {
      return (
        localStorage.getItem('SpotDiffData')
        && JSON.parse(localStorage.getItem('SpotDiffData')).length === 5
      );
    },
    paramsOfMaps() {
      return {
        year_old: 2017,
        year_new: 2020,
        zoom_level: 17,
        source_url_root: 'https://data.csrsr.ncu.edu.tw/',
      };
    },
    isLoaded() {
      return !(localStorage.getItem('SpotDiffData') === null);
    },
  },
  props: {
    whichQuestion: Number,
    goToNextStage: Function,
  },
  async created() {
    try {
      this.isLoading = true;
      await this.createClientId();
      await this.getUserToken();
      if (!this.hasSpotDiffDataInLocal) {
        await this.getFactoriesData();
        this.getFactoryCoord();
      }
      this.isLoading = false;
    } catch (e) {
      console.error(e);
    }
  },
  async mounted() {
    if (this.hasSpotDiffDataInLocal) {
      this.getFactoryCoord();
    }
  },
};
</script>

<style scoped lang="scss">
.start-point {
  visibility: hidden;
  height: 0px;
  width: 0px;
}
.content {
  width: 375px;
  padding-bottom: 46px;
  padding-right: 12px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

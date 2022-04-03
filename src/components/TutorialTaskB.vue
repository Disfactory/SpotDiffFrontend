<template>
  <div class="question-text">
    承上，你覺得 after 準心所在的 <br />位置上有<span class="text-color-blue">{{
      whichStage === 2 ? '建物' : '擴建'
    }}</span
    >嗎？
  </div>
  <!-- after -->
  <div :class="['identify-box', { 'border-color-brown': shouldShowAfterPhoto }]">
    <InnerBoundingBox class="inner-bounding-box mask" />
    <div class="address">
      {{ `${tutorialInfo.cityName}・${tutorialInfo.townName}` }}
    </div>
    <PhotoYearBefore class="photo-year" />
    <picture v-if="this.whichStage === 2" :class="{ 'visibility-hidden': !shouldShowAfterPhoto }">
      <source srcset="../assets/img/tutorial1-2020.webp" type="image/webp" />
      <img src="../assets/img/tutorial1-2020.png" alt="" />
    </picture>
    <picture v-if="this.whichStage === 4" :class="{ 'visibility-hidden': !shouldShowAfterPhoto }">
      <source srcset="../assets/img/tutorial2-2020.webp" type="image/webp" />
      <img src="../assets/img/tutorial2-2020.png" alt="" />
    </picture>
  </div>
  <!-- before -->
  <div :class="['identify-box', { 'border-color-brown': !shouldShowAfterPhoto }]">
    <InnerBoundingBox class="inner-bounding-box mask" />
    <div class="address">
      {{ `${tutorialInfo.cityName}・${tutorialInfo.townName}` }}
    </div>
    <picture v-if="this.whichStage === 2" :class="{ 'visibility-hidden': shouldShowAfterPhoto }">
      <source srcset="../assets/img/tutorial1-2017.webp" type="image/webp" />
      <img src="../assets/img/tutorial1-2017.png" alt="" />
    </picture>
    <picture v-if="this.whichStage === 4" :class="{ 'visibility-hidden': shouldShowAfterPhoto }">
      <source srcset="../assets/img/tutorial2-2017.webp" type="image/webp" />
      <img src="../assets/img/tutorial2-2017.png" alt="" />
    </picture>
    <PhotoYearAfter class="photo-year" />
  </div>

  <ToggleSwitcher :should-show-after-photo="shouldShowAfterPhoto" :changePhoto="changePhoto" />

  <div class="button-group" v-if="!isTaskCompleted">
    <button v-if="whichStage === 2" @click="identifyHasIllegalFactory(true)">
      <HasBuilding />
    </button>
    <button v-if="whichStage === 2" @click="identifyHasIllegalFactory(false)">
      <NoBuilding />
    </button>
    <button v-if="whichStage === 4" @click="identifyHasIllegalFactory(true)">
      <HasExpansion />
    </button>
    <button v-if="whichStage === 4" @click="identifyHasIllegalFactory(false)">
      <NoExpansion />
    </button>
  </div>

  <div v-if="isTaskCompleted" class="tutorial-answer">
    <div v-if="whichStage === 2">你選擇： {{ this.hasIllegalFactory ? '有建物' : '無建物' }}</div>
    <div v-else>你選擇： {{ this.hasIllegalFactory ? '有擴建' : '無擴建' }}</div>
    <div class="tutorial-answer-icon">
      <CorrectAnswer v-if="this.hasIllegalFactory" />
      <WrongAnswer v-else />
    </div>
  </div>
  <BrownCard :which-stage="whichStage" class="card-answer answerB" v-if="isTaskCompleted">
    <template v-slot:icon>
      <FactoryWithShadow v-if="whichStage === 2" class="card-icon" />
      <FactoryWithShadow class="card-icon" v-else />
    </template>
    <template v-slot:answer>
      <div v-if="whichStage === 2">
        <p class="card-text text-strong">答案：有建物</p>
        <p class="card-text">若是建物，會有陰影、突起物、非均值的感覺。</p>
      </div>
      <div v-else>
        <p class="card-text text-strong">答案：有擴建</p>
        <p class="card-text">有擴建，跟以前比白色建築物會增加。</p>
      </div>
    </template>
  </BrownCard>

  <div v-if="isTaskCompleted" class="congrats">
    <div v-if="whichStage === 2">
      <p>很好！我們已經知道農地上</p>
      <p>跑出違建工廠的樣子了！🏭</p>
    </div>
    <div v-else class="congrats">
      <p>🎉 學會操作之後，</p>
      <p>🎉 我們就可以開始檢舉囉！</p>
    </div>
  </div>
  <button>
    <ContinueButton v-if="isTaskCompleted" @click="goToNextStage" />
  </button>
</template>

<script>
import BrownCard from './BrownCard.vue';
import FactoryWithShadow from '../assets/svg-icon/factory-with-shadow.svg';
import PhotoYearAfter from '../assets/svg-icon/after.svg';
import PhotoYearBefore from '../assets/svg-icon/before.svg';
import InnerBoundingBox from '../assets/svg-icon/inner-bounding-box.svg';
import HasBuilding from '../assets/svg-icon/has-building.svg';
import NoBuilding from '../assets/svg-icon/no-building.svg';
import HasExpansion from '../assets/svg-icon/has-expansion.svg';
import NoExpansion from '../assets/svg-icon/no-expansion.svg';
import CorrectAnswer from '../assets/svg-icon/correct-answer.svg';
import WrongAnswer from '../assets/svg-icon/wrong-answer.svg';
import ContinueButton from '../assets/svg-icon/continue-button.svg';
import ToggleSwitcher from './ToggleSwitcher.vue';

export default {
  name: 'TutorialTaskB',
  data() {
    return { shouldShowAfterPhoto: true };
  },
  components: {
    PhotoYearAfter,
    PhotoYearBefore,
    InnerBoundingBox,
    HasBuilding,
    NoBuilding,
    HasExpansion,
    NoExpansion,
    CorrectAnswer,
    WrongAnswer,
    FactoryWithShadow,
    ContinueButton,
    BrownCard,
    ToggleSwitcher,
  },
  methods: {
    changePhoto() {
      setTimeout(() => {
        this.shouldShowAfterPhoto = !this.shouldShowAfterPhoto;
      }, 200);
    },
  },
  inject: ['goToNextStage'],
  props: {
    identifyHasIllegalFactory: Function,
    landUsage: String,
    tutorialInfo: Object,
    isTaskCompleted: Boolean,
    whichStage: Number,
    tutorialLandUsage: String,
    hasIllegalFactory: Boolean,
  },
};
</script>

<style scoped lang="scss">
.identify-box {
  position: relative;
  overflow: hidden;

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
    z-index: 100;
  }
}
.visibility-hidden {
  display: none;
}
.border-color-brown {
  border-left: 4px solid #947451;
  border-top: 4px solid #947451;
  border-right: 4px solid #1a0f04;
  border-bottom: 4px solid #1a0f04;
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
  margin: 40px 0;

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

.congrats {
  margin: 20px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 29px;
}
</style>

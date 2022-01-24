<template>
  <div class="card-body bg-brown">
    <CardDecorationLeft class="card-decoration left-decoration" />
    <CardDecorationRight class="card-decoration right-decoration" />
    <slot name="icon"></slot>
    <slot name="answer"></slot>
    <button @click="goToNextStage" class="continue-button">
      <ContinueButton v-if="whichStage !== 4" />
    </button>
  </div>
</template>

<script>
import CardDecorationLeft from '../assets/svg-icon/explain-card/decoration-left-brown.svg';
import CardDecorationRight from '../assets/svg-icon/explain-card/decoration-right-brown.svg';
import ContinueButton from '../assets/svg-icon/continue-button.svg';

export default {
  name: 'BrownCard',
  components: { CardDecorationLeft, CardDecorationRight, ContinueButton },
  inject: ['goToNextStage'],
  props: { whichStage: Number },
};
</script>
<style lang="scss" scoped>
.card-body {
  margin: 0 auto;
  text-align: center;
  position: relative;
  width: calc(50vw + 187.5px - 24px);
  border: 4px solid #8f6433;
  border-left: none;
  padding: 21px 19px 22px calc(50vw - 187.5px + 24px);
  margin: 0 0 20px calc(-50vw + 187.5px - 12px);
  background-color: #65431d;
}
.card-decoration {
  margin: 0 auto;
  position: absolute;
  &.left-decoration {
    bottom: 8px;
    left: calc(50vw - 187.5px + 10px);
  }
  &.right-decoration {
    top: 8px;
    right: 8px;
  }
}
.continue-button {
  position: absolute;
  right: 25px;
  bottom: -25px;
}
</style>

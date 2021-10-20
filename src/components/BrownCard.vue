<template>
  <div class="card-body bg-brown">
    <CardDecorationLeft class="card-decoration left-decoration" />
    <CardDecorationRight class="card-decoration right-decoration" />
    <slot name="icon"></slot>
    <slot name="answer"></slot>
    <button @click="nextQuestion" class="continue-button">
      <ContinueButton />
    </button>
  </div>
</template>

<script>
import CardDecorationLeft from '../assets/svg-icon/explain-card/decoration-left-brown.svg';
import CardDecorationRight from '../assets/svg-icon/explain-card/decoration-right-brown.svg';
import ContinueButton from '../assets/svg-icon/continue-button.svg';

export default {
  name: 'BlueCard',
  components: { CardDecorationLeft, CardDecorationRight, ContinueButton },
  props: ['nextQuestion'],
};
</script>
<style lang="scss" scoped>
.card-body {
  margin: 0 auto;
  text-align: center;
  position: relative;
  left: calc(-50vw + 187.5px - 21px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: calc(50vw + 187.5px - 21px);
  border: 4px solid #8f6433;
  border-left: none;
  padding-top: 21px;
  padding-bottom: 22px;
  padding-right: 19px;
  padding-left: calc(50vw - 187.5px + 21px);
  background-color: #71512e;
}
.card-decoration {
  margin: 0 auto;
  position: absolute;

  &.left-decoration {
    bottom: 8px;
    left: calc(50vw - 187.5px + 7px);
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

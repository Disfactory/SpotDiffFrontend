<template>
  <div :class="['card-body', { 'card-body--less-padding': isSecondIntro }]">
    <CardDecorationLeft class="card-decoration left-decoration" />
    <CardDecorationRight class="card-decoration right-decoration" />
    <slot></slot>
  </div>
</template>

<script>
import CardDecorationLeft from '../assets/svg-icon/explain-card/decoration-left-blue.svg';
import CardDecorationRight from '../assets/svg-icon/explain-card/decoration-right-blue.svg';

export default {
  name: 'BlueCard',
  components: {
    CardDecorationLeft,
    CardDecorationRight,
  },
  props: ['isSecondIntro'],
};
</script>
<style lang="scss" scoped>
.card-body {
  margin: 0 auto;
  text-align: center;
  position: relative;
  width: 312px;
  border: 4px solid #061e29;
  background: #006788;
  padding: 30px;
  margin-top: 24px;
  &--less-padding {
    padding: 21px 15px 28px 24px;
  }
}
.card-decoration {
  margin: 0 auto;
  position: absolute;
  width: 16px;
  height: 16px;
  &.left-decoration {
    bottom: 8px;
    left: 8px;
  }
  &.right-decoration {
    top: 8px;
    right: 8px;
  }
}
</style>

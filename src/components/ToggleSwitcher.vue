<template>
  <div
    :class="[
      'switch-wrapper',
      { 'switch-wrapper--background-brown': isTutorialPage },
      { 'switch-wrapper--background-blue': !isTutorialPage },
    ]"
  >
    <span
      :class="['switch-wrapper__text', { 'switch-wrapper__text--toggled': !shouldShowAfterPhoto }]"
      >before</span
    >
    <label class="switch-wrapper__switch">
      <input type="checkbox" :checked="shouldShowAfterPhoto" @click="changePhoto" />
      <span
        :class="[
          'switch-wrapper__slider',
          { 'switch-wrapper__slider--background-brown': isTutorialPage },
          { 'switch-wrapper__slider--background-blue': !isTutorialPage },
        ]"
      ></span>
    </label>
    <span
      :class="['switch-wrapper__text', { 'switch-wrapper__text--toggled': shouldShowAfterPhoto }]"
      >after</span
    >
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitcher',
  data() {
    return { isChecked: true };
  },
  props: {
    shouldShowAfterPhoto: Boolean,
    changePhoto: Function,
  },
  computed: {
    isTutorialPage() {
      return this.$route.name === 'Tutorial';
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-wrapper {
  width: 333px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  &--background-brown {
    background: #65431d;
  }
  &--background-blue {
    background: #006788;
  }
}

.switch-wrapper__text {
  margin: 0 13px;
  color: #818181;
  &--toggled {
    color: white;
  }
}
.switch-wrapper__switch {
  position: relative;
  display: block;
  width: 73.5px;
  height: 36px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }
}

.switch-wrapper__slider {
  margin: 0 auto;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &--background-brown {
    background: #947451;
  }
  &--background-blue {
    background: #82bdd1;
  }
}
.switch-wrapper__slider:before {
  position: absolute;
  content: '';
  height: 27px;
  width: 27px;
  left: 8.5px;
  bottom: 4.5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch-wrapper__slider:before {
  -webkit-transform: translateX(27px);
  -ms-transform: translateX(27px);
  transform: translateX(27px);
}
</style>

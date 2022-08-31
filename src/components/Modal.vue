<template>
  <div class="modal-container" v-if="isOpen" @click="onDismiss">
    <slot :onDismiss="onDismiss"></slot>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  setup() {
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    onDismiss: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

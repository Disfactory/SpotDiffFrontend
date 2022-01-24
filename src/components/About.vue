<template>
  <button @click="isModalOpen = true" class="about-us">關於此專案</button>
  <teleport to="body">
    <transition name="modal" @after-enter="afterEnter">
      <div class="modal" v-if="isModalOpen">
        <div @click.self="isModalOpen = false" class="modal-shadow">
          <transition name="modal-content">
            <div class="modal-content" v-if="isShowModalContent">
              <button class="close-button" @click="isModalOpen = false"><CloseButton /></button>
              <h1>
                農地保衛，需要你出一份力
              </h1>
              <h2>面對滿地違建，政府明令，農地新增工廠一律斷電拆除</h2>
              <p>
                然而，地方政府總有藉口對新增違建視而不見。唯有手握堅實資料，要求政府積極處理，違章工廠亂象才能在我們這個世代走向終結。
              </p>
              <h2>讓檢舉如虎添翼，用空拍影像找出新增工廠所在</h2>
              <p>
                在地面尋找新增工廠就像大海撈針，幸好中央政府有釋出農地上的變異點資料。
                從這些變異點當中辨識出2016年後新增的部分，就可以補足地方民眾拍照檢舉缺少的資料，也能夠減少時行政流程、加速處理速度！
              </p>

              <button class="know-more-button">了解更多</button>
            </div></transition
          >
        </div>
      </div></transition
    >
  </teleport>
</template>

<script>
import CloseButton from '../assets/svg-icon/button-close.svg';

export default {
  name: 'About',
  data() {
    return { isModalOpen: false, isShowModalContent: false };
  },
  methods: {
    afterEnter() {
      this.isShowModalContent = true;
    },
  },
  components: { CloseButton },
};
</script>

<style lang="scss" scoped>
.about-us {
  background: inherit;
  font-weight: 400;
  font-size: 13px;
  margin-left: 13px;
  padding: 0px;
  &:hover {
    font-weight: 600;
  }
}
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  .modal-shadow {
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .modal-content {
    overflow-y: auto;
    background: #effffc;
    padding: 20px 31px 26px 30px;
    color: #0a2f42;
    width: 84%;
    height: auto;
    margin: auto;
    position: relative;

    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    h1 {
      width: calc(100% - 70px);
      font-size: 24px;
      font-weight: 600;
      font-size: 24px;
      line-height: 34px;
      letter-spacing: 2px;
      margin-bottom: 17px;
    }
    h2 {
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }
    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 2px;
      margin-bottom: 17px;
    }
    .know-more-button {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      letter-spacing: 2px;
      text-decoration-line: underline;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 1s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
.modal-content-enter-active,
.modal-content-leave-active {
  transition: opacity 2s;
}
.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
}

.modal-content-enter-to,
.modal-content-leave-from {
  opacity: 1;
}
</style>

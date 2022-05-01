<template>
  <div class='fill-full-background bg-skyBlue'>
  <div class="container container-border-sky-blue intro">
  <h1>呼～做完教學了</h1>
  <img class='hand-icon' src="@/assets/svg-icon/hand.gif" alt="hand-icon">
  <h2>要正式開始辨識囉！</h2>
  <p>你的答案可以幫忙檢舉</p>
  <p>這些侵佔農地的壞壞工廠</p>
  <button data-value="start-game">
    <StartToLook @click="goToNextStage" />
  </button>
  <p class='gdpr'>
    點擊開始辨識即我同意將辨識結果以<br><a
        href="http://creativecommons.tw/cc0"
        rel="noreferrer noopener"
        target="_blank"
        class="link">CC0公眾領域貢獻宣告</a> 釋出授權到公眾領域
  </p>
    </div>

  </div>
</template>

<script>
import StartToLook from '@/assets/svg-icon/start-to-look.svg';

export default {
  name: 'CutBeforeGame',
  components: { StartToLook },
  inject: ['goToNextStage'],
};
</script>
<style lang="scss" scoped>
.fill-full-background{
  overflow: auto;
  height: calc(100vh - 31.5px);
}
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 60px 21px 28px;
  overflow-x: hidden;
  color: #3989A3;
}

h1{

  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
}
.hand-icon{
  width: 55px;
  height: 115px;
  margin-top: 27px;
}
h2{
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  letter-spacing: 0.855px;
  margin: 15px 0 3px;
}
p{
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 1px;
}
button{
  margin-top: 28px;
}
.gdpr{
  margin-top: 16px;
  color: #006788;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  .link{
    text-decoration: underline;
    color: #006788;
    &:hover{
      font-weight: 500;
    }
  }
}

</style>

<template>
  <div class='fill-full-background bg-skyBlue'>
  <div class="container container-border-sky-blue intro">
  <h1>呼～做完教學了</h1>
  <img class='hand-icon' src="@/assets/svg-icon/hand.gif" alt="hand-icon">
  <h2>要正式開始辨識囉！</h2>
  <p>你的答案可以幫忙檢舉</p>
  <p>這些侵佔農地的壞壞工廠</p>
  <button>
    <StartToLook @click="goToNextStage" />
  </button>
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
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 72px 21px 50px;
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
</style>

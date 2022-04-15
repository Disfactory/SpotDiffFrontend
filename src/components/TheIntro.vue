<template>
  <h1>請輸入經緯度</h1>
  <label for="longitude">經度</label>
  <input name='longitude' type="text"  v-model='longitude' placeholder="經度 longitude">
  <label for="longitude">緯度</label>
  <input   name='longitude' type="text" v-model='latitude'  placeholder="緯度 latitude">
  <button  @click="goToGame">Go!</button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {

  name: 'TheIntro',
  data() {
    return {
      isSecondIntro: false,
      showSearchIcon: true,
      longitude: 121.0,
      latitude: 23.5,
    };
  },
  components: {

  },
  methods: {
    ...mapMutations([
      'setLongitude', 'setLatitude',
    ]),
    goToGame() {
      this.setLongitude(this.longitude);
      this.setLatitude(this.latitude);
      this.$router.push('/game');
    },
  },
};
</script>

<style scoped lang="scss">

h1, label{
  margin: 0 auto;
  color:black
}
button{
  border: gray 1px solid;
  padding:2px;
  color:black
}
.intro {
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px 21px 50px;
  overflow-x: hidden;
}

.intro-title {
  position: relative;
  .icon-search {
    position: absolute;
    bottom: -65%;
    left: 0;
  }
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .animation {
    margin-top: 15px;
  }
}

.change-order {
  flex-direction: column-reverse;
}

.intro-button {
  margin: 40px 0 40px;
  &--less-margin {
    margin: 20px 0 ;
  }
}

.card-text {
  font-size: 18px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 1px;

  &.text-strong {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

.introduction {
  width: 273px;
  color: #006788;
  font-weight: 500;
  margin-top: 20px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 25px;
  font-size: 17px;
}
//animation of search icon in title
.icon-search-enter-active {
  transition: opacity 0.5s ease-out, transform 1.5s 0.5s ease-out;
}

.icon-search-leave-active {
  transition: transform 1.5s ease-out, opacity 0.5s 1s ease-out;
}
.icon-search-enter-from,
.icon-search-leave-to {
  transform: translateX(189px);
}
.icon-search-leave-to {
  opacity: 1;
}
</style>

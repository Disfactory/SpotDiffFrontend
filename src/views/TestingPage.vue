<template>
  <div class="container">
    <h1>test of api</h1>
    <div class="button-group">
      <button @click="getUserToken">getUserToken</button>
      <button @click="getData">getData</button>
      <button @click="getLocation">getLocation</button>
      <button @click="getLocationData">getLocationData</button>
      <button @click="sentAnswerData">sentAnswerData</button>
      <button @click="getStatusData">getStatusData</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { clientId: '', userToken: '' };
  },
  methods: {
    getGoogleClientId() {
      window.ga('create', 'UA-154739393-1', 'auto');
      //   let clientId = '';
      window.ga((tracker) => {
        this.clientId = tracker.get('clientId');
      });
      console.log('success');
      console.log(this.clientId);
    },
    async getUserToken() {
      const userToken = await axios.post('/api/user/', {
        client_id: this.clientId,
      });
      this.userToken = userToken.data.user_token;
      console.log(this.userToken);
    },

    async getLocationData() {
      const locationData = await axios.get(
        `/api/location?user_token=${this.userToken}&size=5&gold_standard_size=1`,
      );
      console.log(locationData.data);
    },
    async sentAnswerData() {
      try {
        await this.getGoogleClientId();
        await this.getUserToken();
        const res = await axios.post('/api/answer/', {
          user_token: this.userToken,
          data: [
            {
              location_id: 1,
              year_new: 2020,
              year_old: 2017,
              source_url_root: 'www.test.org',

              bbox_left_top_lat: 24.0962704615941,
              bbox_left_top_lng: '120.462878886353',
              bbox_bottom_right_lat: 24.0962704615941,
              bbox_bottom_right_lng: 120.462878886353,
              land_usage: 1,
              expansion: 1,
              zoom_level: 0,
            },
            {
              location_id: 8,
              year_new: 2017,
              year_old: 2010,
              source_url_root: 'www.test.org',

              bbox_left_top_lat: 24.0962704615941,
              bbox_left_top_lng: '120.462878886353',
              bbox_bottom_right_lat: 24.0962704615941,
              bbox_bottom_right_lng: 120.462878886353,
              land_usage: 1,
              expansion: 1,
              zoom_level: 0,
            },
          ],
        });
        console.log(res);
      } catch (e) {
        console.log(e.response.status);
      }
    },
    async getStatusData() {
      const statusData = await axios.get(`/api/status?user_token=${this.userToken}`);
      console.log(statusData.data);
    },
    async getData() {
      const url = '/factories/81815d3d-82c0-44f3-9646-2893b1b731f2';
      const res = await axios.get(url);
      console.log(res);
    },
  },
  //   async mounted() {
  //     await this.getGoogleClientId();

  //     await this.getUserToken();
  //     await this.getLocationData();
  //   },
};
</script>
<style lang="scss" scoped>
.container {
  color: black;
}
.button-group {
  display: flex;
}
button {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>

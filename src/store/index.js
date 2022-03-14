import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      userToken: '',
      clientId: '',
      statusData: {},
    };
  },

  mutations: {
    createCustomClientId(state) {
      let customClientId = sessionStorage.getItem('spotDiffClientId');
      if (!customClientId) {
        customClientId = `custom.cid.${Math.random()
          .toString(36)
          .substring(2)}.${new Date().getTime()}`;
        sessionStorage.setItem('spotDiffClientId', customClientId);
      }
      state.clientId = customClientId;
      console.log('fail');
      console.log(state.clientId);
    },
    getGoogleClientId(state) {
      window.ga('create', 'UA-154739393-1', 'auto');
      window.ga((tracker) => {
        state.clientId = `ga.cid.${tracker.get('clientId')}`;
      });
      console.log('success');
      console.log(state.clientId);
    },
    setUserToken(state, userToken) {
      state.userToken = userToken;
      console.log(state.userToken);
    },
    setStatusData(state, statusData) {
      state.statusData = statusData;
      console.log(state.statusData);
    },
  },
  actions: {
    async createClientId({ commit }) {
      if (window.ga) {
        await axios('https://www.google-analytics.com/collect')
          .then(() => {
            commit('getGoogleClientId');
          })
          .catch(() => {
            commit('createCustomClientId');
          });
      } else {
        commit('createCustomClientId');
      }
    },
    async getUserToken({ commit, state }) {
      const userToken = await axios.post(
        `${process.env.VUE_APP_SPOTDIFF_APP_URL || '/api'}/user/`,
        {
          client_id: state.clientId,
        },
      );
      commit('setUserToken', userToken.data.user_token);
    },
    async getStatusData({ commit, state }) {
      const res = await axios.get(
        `${process.env.VUE_APP_SPOTDIFF_APP_URL || '/api'}/status?user_token=${state.userToken}`,
      );
      const getNumWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const statusData = res.data;
      const answerCount = getNumWithCommas(statusData.answer_count);
      const individualDoneCount = getNumWithCommas(statusData.individual_done_count);
      const locationIsUndoneCount = getNumWithCommas(
        (5000 - statusData.location_is_done_count),
      );
      const userCount = getNumWithCommas(statusData.user_count);
      commit('setStatusData', {
        answerCount, individualDoneCount, locationIsUndoneCount, userCount,
      });
    },
  },
  modules: {},
});

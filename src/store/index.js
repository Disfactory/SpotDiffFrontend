import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      userToken: '',
      clientId: '',
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
  },
  modules: {},
});

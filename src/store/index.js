import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const api = "https://credere-frontend-test.netlify.app/db.json"

export default new Vuex.Store({
  state: {
    showCustomer: {},
    showSlide: {}
  },
  getters: {
    getCustomer: state => state.showCustomer,
    getSlide: state => state.showSlide
  },
  mutations: {
    mutateCustomer(state, value) {
      state.showCustomer = value;
    },
    mutateSlide(state, value) {
      state.showSlide = value;
    }
  },
  actions: {
    async showCustomer({ commit }) {
      const { data } = await axios.get(`${api}/customer`);

      commit("mutateCustomer", data);
    },

    async updateCustomer({ state }, data) {
      const response = await axios.put(`${api}/customer/${data.id}`, data);
      state.showCustomer.push(response.data);
    },

    async createCustomer({ state }, data) {
      const response = await axios.post(`${api}/customer`, data);
      state.showCustomer.push(response.data);
    },

    async showSlide({ commit }) {
      const { data } = await axios.get(`${api}/slides`);
      commit("mutateSlide", data);
    },

    async createSlide({ state }, data) {
      const response = await axios.post(`${api}/slides`, data);
      state.showSlide.push(response.data);
    },
  }
});

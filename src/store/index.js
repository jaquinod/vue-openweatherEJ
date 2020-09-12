import Vue from "vue";
import Vuex from "vuex";
import instantWeatherModule from "@/store/modules/instantWeatherModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    instantWeatherModule
  }
});

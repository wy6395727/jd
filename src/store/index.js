import Vuex from "vuex"
import Vue from "vue"
import male from "./modules/male"

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    male
  }
});

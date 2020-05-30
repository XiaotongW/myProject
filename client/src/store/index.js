import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import mtgSet from './modules/module-mtg-sets/mtg-sets';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const store = new Vuex.Store({
  // enable strict mode (adds overhead!) for dev mode only
  strict: process.env.DEV,
  // When namespaces is true all of its getters, actions and mutations will be automatically
  // namespaced based on the path the module is registered at
  namespaced: true,
  modules: {
    mtgSet,
  },
});

export default store;

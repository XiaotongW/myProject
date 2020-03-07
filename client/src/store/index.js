import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import sets from './modules/module-sets/index';
import cards from './modules/module-cards/index';

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
  modules: {
    sets,
    cards,
  },
});

export default store;

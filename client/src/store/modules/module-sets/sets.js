import Promise from 'bluebird';
import _ from 'lodash';
// import mtgValue from 'src/common/utils/mtgValue.js';

const APImtg = require('mtgsdk');

const stateDefault = {
  initialized: false,
  setsList: [],
  setsLoading: false,
  setsLoaded: false,
};

// Mutation functions (Synchronous)
// The only way to actually change state
// in a Vuex store is by committing a mutation
const mutations = {
  initialized(state, { data }) {
    Object.keys(data)
      .forEach((x) => {
        state[x] = data[x];
      });
    state.initialized = true;
  },

  unInitialized(state) {
    Object.keys(state).forEach((x) => {
      state[x] = _.cloneDeep(state[x]);
    });
  },

  allSetLoading(state) {
    state.setsLoaded = false;
    state.setsList = [];
    state.setsLoading = true;
  },

  /**
   * Mutate mtg setsList
   * @param {Object} state
   * @param {Array<Object>} sets List of all set
   */
  allSetLoaded(state, { sets }) {
    state.setsLoading = false;
    state.setsList = sets;
    state.setsLoaded = true;
  },

};

// Action functions (Could be asynchronous)
// Actions are similar to mutations, the differences being that:
//   - Instead of mutating the state, actions commit mutations.
//   - Actions can contain arbitrary asynchronous operations.
//
// It is better to return a promise in the stock in order to be
// able to determine when it ends.
const actions = {
  initialize(store) {
    return new Promise((resolve) => {
      if (store.state.initialized === false) {
        store.commit('initialized', { data: {} });
      }
      return resolve();
    });
  },

  unInitialize(store) {
    store.commit('unInitialized');
    return Promise.resolve();
  },

  getAllSet(store) {
    if (store.state.setsLoaded === true) {
      return Promise.resolve(store.state.setsList);
    }
    store.commit('allSetLoading');
    return new Promise(resolve => resolve(APImtg.set.where({})))
      .then((response) => {
        if (typeof response.error === 'string') {
          throw response.error;
        }
        store.commit('allSetLoaded', { sets: response });
        return Promise.resolve(store.state.setsList);
      })
      .catch(err => Promise.reject(err.error || err));
  },

};

// Getters function
// Usually used to compute derived state based on store state
const getters = {
  getAllSetsGroup(state) {
    if (Array.isArray(state.setsList) === false || state.setsList.length < 1) {
      return {};
    }
    return _(state.setsList)
      .orderBy(
        ['releaseDate', 'block', 'type', 'name', 'code', 'onlineOnly'],
        ['desc', 'asc', 'asc', 'asc', 'asc', 'asc'],
      )
      .groupBy('releaseDate')
      .value();
  },
};

// Single state tree
export const state = _.cloneDeep(stateDefault);

// Export this module state information to the main state store
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeItem: [
      {
      title: 'default',
      artist: '',
      price: 0.00,
      genre: 'default',
      id: '12345',
      }
    ]
  },
  getters: {
    storeItem: (state) => { 
      return state.storeItem
    },
  },
  mutations: {
    baggedItem(state, storeItem) {
      //state.storeItem = storeItem
      state.storeItem.push(storeItem)
      //return state.storeItem
      // state.storeItem = state.storeItem + storeItem
    },
  },
  actions: {
    itemAddToBag({commit}, storeItem) {
      commit('baggedItem', storeItem)
    },
  }
})
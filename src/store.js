import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableCassette: null,
  },
  getters: {
    currentEditableCassette: (state) => {
      return state.editableCassette
    },
  },
  mutations: {
    editCassette(state, editableCassette) {
      state.editableCassette = editableCassette
    },
  },
  actions: {
    editCassette(context, cassette) {
      context.commit('editCassette', cassette)
    },
  }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oid: ''
  },
  mutations: {
    setOid(state, payload) {
      state.oid = payload.oid
    }
  },
  actions: {

  }
})

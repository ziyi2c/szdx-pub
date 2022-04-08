import { createStore } from 'vuex'

export default createStore({
  state: {
    data: 'test',
    token: '',

  },
  mutations: {
    setToken(state, value) {
      state.token = value
    }
  },
  actions: {
  },
  modules: {
  }
})

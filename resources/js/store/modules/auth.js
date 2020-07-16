const state = () => ({
  user: {}
})

const getters = {
  getUser(state) {
    return state.user
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = {}
  }
}

const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  clearUser({ commit }) {
    commit('clearUser')
  }
}

export default {
  namespaced: true,
  state: state(),
  getters: getters,
  actions: actions,
  mutations: mutations,
}

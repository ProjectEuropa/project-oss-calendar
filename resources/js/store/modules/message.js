const state = () => ({
  message: '',
  color: 'info'
})

const getters = {
  getMessage: state => state.message,
  getColor: state => state.color,
  existsMessage: state => state.message !== ''
}

const mutations = {
  setMessage(state, message) {
    state.message = message
  },
  setColor(state, color) {
    state.color = color
  },
  clearMessage(state) {
    state.message = ''
    state.color = ''
  }
}

const actions = {
  setMessage({ commit }, message) {
    commit('setMessage', message)
  },
  setError({ commit }) {
    commit('setColor', 'error')
  },
  setWarning({ commit }) {
    commit('setColor', 'warning')
  },
  setInfo({ commit }) {
    commit('setColor', 'info')
  },
  setSuccess({ commit }) {
    commit('setColor', 'success')
  },
  clearMessage({ commit }) {
    commit('clearMessage')
  }
}

export default {
  namespaced: true,
  state: state(),
  getters: getters,
  actions: actions,
  mutations: mutations
}

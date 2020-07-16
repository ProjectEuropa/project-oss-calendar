const RouterOptionPlugin = {}
RouterOptionPlugin.install = function async (Vue, router, store) {
  router.afterEach((to, from) => {
    const params = store.getters['params/getParams']
    // 画面遷移前から遷移後のページに渡すパラメータ
    Vue.prototype.transferParams = params
    store.dispatch('params/clearParams')
  })

  router.beforeEach((to, from, next) => {
    Vue.prototype.transferParams = {}
    next()
  })
}
export default RouterOptionPlugin;

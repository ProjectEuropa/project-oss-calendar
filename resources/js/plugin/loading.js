import Loading from '~/components/Loading'

const LoadingPlugin = {}

LoadingPlugin.install = function (Vue) {
  Vue.component(Loading.name, Loading)

  Vue.prototype.$nuxt = {
  }
  Vue.prototype.$nuxt.$loading = {
  }
  Vue.prototype.$nuxt.$loading.start = (flg => {
    Loading.methods.start(flg);
  })

  Vue.prototype.$nuxt.$loading.finish = (flg => {
    Loading.methods.finish(flg);
  })
}

export default LoadingPlugin;

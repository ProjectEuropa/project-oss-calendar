import Vue from "vue";
import router from '~/router'
import App from '~/App.vue'
import vuetify from '~/plugin/vuetify'
import AuthPlugin from '~/plugin/auth'
import AclPlugin from '~/plugin/acl'
import UtilPlugin from '~/plugin/util'
import VariablesPlugin from '~/plugin/variables';
import AxiosPlugin from '~/plugin/axios';
import LoadingPlugin from '~/plugin/loading';
import RouterOptionPlugin from '~/plugin/routerOption';

import DefaultLayout from '~/layouts/default';
import NoAuthLayout from '~/layouts/noauth';

import '~/plugin/vee-validate'
import store from '~/store/store'

Vue.use(AuthPlugin, router, store)
Vue.use(AclPlugin)
Vue.use(UtilPlugin)
Vue.use(VariablesPlugin)
Vue.use(AxiosPlugin, store)
Vue.use(LoadingPlugin)
Vue.use(RouterOptionPlugin, router, store)

Vue.component('default-layout', DefaultLayout);
Vue.component('noauth-layout', NoAuthLayout);

Vue.config.errorHandler = (err, vm, info) => {
  console.log(`Captured in Vue.config.errorHandler: ${info}`, err);
  store.commit('auth/clearUser');
  router.push("/auth/login")
};
window.addEventListener("error", event => {
  console.log("Captured in error EventListener", event.error);
  store.commit('auth/clearUser');
  router.push("/auth/login")
});
window.addEventListener("unhandledrejection", event => {
  console.log("Captured in unhandledrejection EventListener", event.reason);
  store.commit('auth/clearUser');
  router.push("/auth/login")
});

new Vue({
  vuetify,
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')

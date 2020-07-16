import 'babel-polyfill'
import Vue from 'vue'
import Vuetify from 'vuetify'
import ja from 'vuetify/es5/locale/ja'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ja },
    current: 'ja'
  },
  theme: {
    themes: {
      light: {
        primary: '#e84b64', //ピンク
        secondary: '#202020' //黒系
      }
    }
  },
  icons: {
    iconfont: 'mdi' // iconを指定しないとチェックボックス等が正常に表示されない
  }
})

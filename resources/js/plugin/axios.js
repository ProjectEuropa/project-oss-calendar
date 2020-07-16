import axios from "axios"

const AxiosPlugin = {}

AxiosPlugin.install = function (Vue, store) {
  Vue.mixin({
    methods: {
      async serverSideValidate() {
        //this.$validator.errors.clear()
        for (let key in Vue.prototype.serverSideErrors) {
          // APIサーバ側のバリデートエラーをクライアントバリデートにセットする
          this.$validator.errors.add({
            field: key,
            msg: Vue.prototype.serverSideErrors[key]
          })
        }
        Vue.prototype.serverSideErrors = {}
        console.log('serverSideValidated')
      },

      async localValidate() {
        await this.$validator.validate().then(valid => {
          if (!valid) {
            var e = new Error('ローカルバリデーションエラー')
            e.response = {
              data: this.$validator.errors
            }
            throw e
          }
        })
      },

      initialValidate() {
        Vue.prototype.serverSideErrors = {}
        this.$validator.errors.clear()
        this.$validator.reset()
      }
    }
  })

  Vue.prototype.$axios = axios;

  Vue.prototype.$axios.postCall = async (url, params, options) => {
    const res = await Vue.prototype.$axios.post(url, params, options);
    if (!res) {
      throw Error('validate');
    } else {
      return res;
    }
  };

  Vue.prototype.$axios.patchCall = async (url, params, options) => {
    const res = await Vue.prototype.$axios.patch(url, params, options);
    if (!res) {
      throw Error('validate');
    } else {
      return res;
    }
  };

  Vue.prototype.$axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  };

  Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`

  Vue.prototype.$axios.onRequest = (config => {
    console.log('Making request to ' + config.url)
  });

  Vue.prototype.$axios.onResponse = (response => {
    console.log(response.config.data)
  })

  Vue.prototype.$axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let message = null
      // リクエストしてレスポンスが返ってきたときのエラー処理
      if (error.response) {
        const data = error.response.data
        const status = error.response.status
        if ((status === 422 || status === 429) && error.response.data.errors) {
          // APIサーバ側でのバリデートエラーをセットする。
          Vue.prototype.serverSideErrors = error.response.data.errors
        } else if (
          (status === 422 || status === 429) &&
          error.response.data.errors
        ) {
          // APIサーバ側でのバリデートエラーをセットする。
          Vue.prototype.serverSideErrors = error.response.data.errors
        } else {
          message = data.message
        }
      }
      // リクエストしてレスポンスを受け取ることができなかったときのエラー処理
      else if (error.request) {
        message = 'このリクエストは、サーバ側で処理できませんでした。'
      }
      // リクエストもレスポンスもできなかったときのエラー処理
      else {
        message =
          'リクエストの設定中に何らかの問題が発生し、エラーが発生しました。'
      }

      if (message !== null) {
        store.commit('message/setMessage', message)
      }
    }
  );
}

export default AxiosPlugin;

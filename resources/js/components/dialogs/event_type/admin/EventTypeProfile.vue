<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form lazy-validation>
        <v-card>
          <v-card-title>
            <span class="headline"
              ><slot name="title">{{ title }}</slot></span
            >
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex class="xs8">
                  <v-text-field
                    v-model="selected.name"
                    v-validate="'required'"
                    label="予定タイプ"
                    data-vv-name="name"
                    :error-messages="errors.collect('name')"
                    counter="100"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex class="xs12">
                  <edit-color
                    ref="color"
                    :prop-color="selected.color"
                    @setSelectedColor="setSelectedColor"
                  />
                </v-flex>
                <v-flex class="xs6">
                  <v-text-field
                    v-model="selected.rank"
                    v-validate="'required'"
                    label="表示順"
                    data-vv-name="rank"
                    :error-messages="errors.collect('rank')"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <single-submit-button :disabled="errors.any()" flat :onclick="save">
              <template v-slot:text>
                保存
              </template>
            </single-submit-button>
            <v-btn color="blue darken-1" text @click="close">キャンセル</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import SingleSubmitButton from '~/components/buttons/SingleSubmitButton'
import EditColor from '~/components/EditColor'
export default {
  components: {
    SingleSubmitButton,
    EditColor
  },
  props: {
    propsDialog: {
      type: Boolean,
      default: false
    },
    propsSelectedObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialog: false,
      // 選択中のレコードの値
      selected: {},
      // レコードの初期値
      defaultValue: {
        id: -1,
        name: '',
        color: '#FFFFFFFF',
        rank: '1',
        is_enable: true
      }
    }
  },
  computed: {
    // ダイアログのタイトルを作成と更新で使い分ける
    title() {
      return this.selected.id === -1 ? '新規登録' : '編集'
    }
  },
  watch: {
    propsDialog(after_val, before_val) {
      if (after_val) {
        if (Object.keys(this.propsSelectedObj).length === 0) {
          this.create()
        } else {
          this.edit()
        }
      }
    }
  },
  created() {
    this.selected = this.deepCopy(this.defaultValue)
  },
  methods: {
    // データ作成(読み出し)
    async create() {
      try {
        console.log('Created : ')
        this.dialog = true
      } catch (e) {
        console.log('Error : ' + e.response.data)
      }

      // 再表示(初回以外)のPicker位置(カラーコード)をセット
      if (this.$refs.color) {
        this.$refs.color.setInit(this.defaultValue.color)
      }
    },
    // データ作成(書き込み)
    async store() {
      try {
        const res = await this.$axios.postCall(
          '/api/event_type/admin',
          this.selected
        )
        this.selected = res.data
        console.log('stored : id=' + res.data.id)
        this.$emit('refresh')
      } catch (e) {
        throw e
      }
    },
    // データ編集(読み出し)
    async edit() {
      try {
        const res = await this.$axios.get(
          '/api/event_type/admin/' + this.propsSelectedObj.id
        )
        this.copyByRefToTargetObj(this.selected, res.data)
        this.dialog = true
        console.log('Edit : id=' + this.selected.id)
      } catch (e) {
        console.log('Error : ' + e.response.data)
      }

      // 再表示(初回以外)のPicker位置(カラーコード)をセット
      if (this.$refs.color) {
        this.$refs.color.setInit(this.selected.color)
      }
    },
    // データ編集(書き込み)
    async update() {
      try {
        const res = await this.$axios.put(
          '/api/event_type/admin/' + this.selected.id,
          this.selected
        )
        // 対象一覧の更新
        this.$emit('passByReference', this.propsSelectedObj, res.data)
        console.log('Updated : id=' + res.data.id)
      } catch (e) {
        throw e
      }
    },
    // ダイアログの保存ボタン
    async save() {
      try {
        await this.localValidate()
        if (this.selected.id === -1) {
          // 作成
          await this.store()
        } else {
          // 更新
          await this.update()
        }
        this.close()
      } catch (e) {
        await this.serverSideValidate()
        console.log('validate Error : ' + e.response)
        console.log('validate this.dialog: ' + this.dialog)
      }
    },
    close() {
      console.log('close')
      this.initialValidate()
      this.selected = this.deepCopy(this.defaultValue)
      this.dialog = false
      this.$emit('close')
    },
    // カラー選択設定
    setSelectedColor(color) {
      this.selected.color = color
    }
  }
}
</script>

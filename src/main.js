import Vue from 'vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Table ,TableColumn ,Icon,Popover,Row,Col,Input,DatePicker,Button,Dialog,Upload,Radio,RadioGroup,Select,Option,Cascader,Form,FormItem} from 'element-ui';

import App from './App'
import router from './router'
import store from "./store"
import "./axios"
import './config/conf'
Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Form)
Vue.use(FormItem)

// 引入mockjs
// require('./mock')

Vue.mixin({
  data: function () {
    return {
      isPhone:window.isPhone
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

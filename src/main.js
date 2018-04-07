// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Table ,TableColumn ,Icon,Popover,Row,Col,Input,DatePicker,Button,Dialog,Upload} from 'element-ui';

import App from './App'
import router from './router'
import store from "./store"
import "./axios"
import './config/conf'
// import "./axios"
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

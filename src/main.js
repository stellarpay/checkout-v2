import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Clipboard from 'v-clipboard'
import vueCustomElement from 'vue-custom-element'

import './assets/css/payment.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(vueCustomElement)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Clipboard)

Vue.config.productionTip = false

App.router = router
Vue.customElement('vue-widget', App)

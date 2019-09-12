import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'
import PaymentMethods from './views/PaymentMethods.vue'
import Process from './views/Process.vue'
import Expired from './views/Expired.vue'
import Paid from './views/Paid.vue'
import Invalid from './views/Invalid.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/overview',
      name: 'overview',
      component: Overview
    },
    {
      path: '/methods',
      name: 'payment_methods',
      component: PaymentMethods
    },
    {
      path: '/process',
      name: 'process',
      component: Process
    },
    {
      path: '/expired',
      name: 'expired',
      component: Expired
    },
    {
      path: '/paid',
      name: 'paid',
      component: Paid
    },
    {
      path: '/invalid',
      name: 'invalid',
      component: Invalid
    },
  ],
  mode: 'abstract',
  linkActiveClass: 'active'
})

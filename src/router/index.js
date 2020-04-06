import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import ButtonNext from '../components/lab3.2/ButtonNext.vue'
import Condition from '../components/lab3.2/Condition.vue'
import Question from '../components/lab3.2/Question.vue'
import Function from '../components/lab3.2/Function.vue'
import Alternative from '../components/lab3.2/Alternative.vue'
import Assessment from '../components/lab3.2/Assessment.vue'

Vue.use(VueRouter)

Vue.component('button-next', ButtonNext)
Vue.component('condition', Condition)
Vue.component('question', Question)
Vue.component('function', Function)
Vue.component('alternative', Alternative)
Vue.component('assessment', Assessment)

export const bus = new Vue()

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}

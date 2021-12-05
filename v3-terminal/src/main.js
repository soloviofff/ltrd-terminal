import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import {apolloProvider} from './plugins/apollo'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import VueApexCharts from "vue3-apexcharts"

async function init() {
  createApp(App).use(Quasar, quasarUserOptions).use(router).use(apolloProvider).use(VueApexCharts).mount('#app')
}

init()

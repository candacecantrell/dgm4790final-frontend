import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createProvider} from './vue-apollo'
import VueTruncate from 'vue-truncate-filter'
import router from './router'
import store from './store'
import VueApolloComponents from '@vue/apollo-components'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import { provide } from '@vue/composition-api'
// import { ApolloClients } from '@vue/apollo-composable'
Vue.use(VueApolloComponents)

Vue.use(VueTruncate)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  router,
  store,
  // setup () {
  //   provide(ApolloClients, {
  //     default: apolloClient,
  //   })
  // },
  render: h => h(App)
}).$mount('#app')

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
import VueApollo from "vue-apollo"

Vue.use(VueApolloComponents)

Vue.use(VueTruncate)

Vue.use(VueAxios, axios)

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')

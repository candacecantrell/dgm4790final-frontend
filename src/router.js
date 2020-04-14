import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Cassettes from '../views/Cassettes.vue'
import CreateCassette from '../views/CreateCassette.vue'
//import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { 
            path: '/',
            name: "home",
            component: Home
        }, 
            { 
                path: '/all-cassettes',
                name: "cassettes",
                component: Cassettes
            },
            { 
                path: '/add-cassette',
                name: "createcassette",
                component: CreateCassette
            },
        // {
        //     path: '/admin',
        //     name: "admin",
        //     component: Admin
        // }
    ]
})
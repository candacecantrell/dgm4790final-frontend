import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Cassettes from '../views/Cassettes.vue'
import CreateCassette from '../views/CreateCassette.vue'
import EditCassette from '../views/EditCassette.vue'
import AllVinyl from '../views/AllVinyl.vue'
import EditVinyl from '../views/EditVinyl.vue'
import CreateVinyl from '../views/CreateVinyl.vue'
import DeleteVinyl from '../views/DeleteVinyl.vue'
import DeleteCassette from '../views/DeleteCassette.vue'
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
            { 
                path: '/edit-cassette',
                name: "editcassette",
                component: EditCassette
            },
            { 
                path: '/delete-cassette',
                name: "deletecassette",
                component: DeleteCassette
            },
            { 
                path: '/all-vinyl',
                name: "all-vinyl",
                component: AllVinyl
            },
            { 
                path: '/edit-vinyl',
                name: "editvinyl",
                component: EditVinyl
            },
            { 
                path: '/create-vinyl',
                name: "createvinyl",
                component: CreateVinyl
            },
            { 
                path: '/delete-vinyl',
                name: "deletevinyl",
                component: DeleteVinyl
            },
        // {
        //     path: '/admin',
        //     name: "admin",
        //     component: Admin
        // }
    ]
})
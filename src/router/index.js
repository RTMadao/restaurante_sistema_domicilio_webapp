import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.view.vue')
  },
  {
    path: '/pedido',
    name: 'Pedido',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pedidos.view.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Menu.view.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/domicilio',
    name: 'Domicilio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Domicilio.view.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/reporte',
    name: 'Reporte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Reporte.view.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/nuevo-pedido',
    name: 'Nuevo Pedido',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/pedidoForm.movil.view.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('userSession')
  const userActivo = (user) ? JSON.parse(user) : { auth: false }
  const autorizacion = to.matched.some(record => record.meta.auth)

  if (autorizacion && !userActivo.auth) {
    next('/login')
  } else if (!autorizacion && userActivo.auth) {
    next('/pedido')
  } else {
    next()
  }
})

export default router

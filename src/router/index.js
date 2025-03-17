/*
 * router/index.js
 * Configuração do roteamento da aplicação
 * Define as rotas disponíveis e seus componentes correspondentes
 */

// Importações do Vue Router
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// Definição das rotas
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pedidos.vue')
  }
]

// Criação do roteador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Exportação do roteador para uso em main.js
export default router

import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트 불러오기
// import HomePage from '../components/HomePage.vue'
// import AboutPage from '../components/AboutPage.vue'
// import ContactPage from '../components/ContactPage.vue'

const routes = [
//   { path: '/', component: HomePage },
//   { path: '/about', component: AboutPage },
//   { path: '/contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
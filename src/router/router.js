import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트 불러오기
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import MyPage from '../pages/MyPage.vue'
import InquiryDetailPage from '../pages/InquiryDetailPage.vue'
import InquiryWritePage from '../pages/InquiryWritePage.vue'

const routes = [
  { path: '/', component: HomePage }, // QnA 목록
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/mypage', component: MyPage },
  { path: '/inquiries/write', component: InquiryWritePage },
  { path: '/inquiries/:id', component: InquiryDetailPage, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

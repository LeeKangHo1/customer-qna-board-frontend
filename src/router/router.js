import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트 불러오기
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import MyPage from '../pages/MyPage.vue'
import EditProfilePage from '../pages/EditProfilePage.vue'
import InquiryDetailPage from '../components/inquiry/InquiryDetailPage.vue'
import InquiryWritePage from '../components/inquiry/InquiryWritePage.vue'
import InquiryEditPage from '../components/inquiry/InquiryEditPage.vue'

const routes = [
  { path: '/', component: HomePage }, // QnA 목록
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/mypage', component: MyPage },
  { path: '/inquiries/write', component: InquiryWritePage },
  { path: '/inquiries/:id', component: InquiryDetailPage, props: true },
  { path: '/edit-profile', component: EditProfilePage },
  { path: '/inquiries/:id/edit', component: InquiryEditPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

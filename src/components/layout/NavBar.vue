<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo">QnA Board</RouterLink>

    <div class="nav-links">
      <template v-if="userStore.isLoggedIn">
        <RouterLink to="/inquiries/write">글쓰기</RouterLink>
      </template>

      <RouterLink to="/">홈</RouterLink>

      <template v-if="!userStore.isLoggedIn">
        <RouterLink to="/login">로그인</RouterLink>
        <RouterLink to="/register">회원가입</RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/mypage">마이페이지</RouterLink>
        <button class="logout-btn" @click="handleLogout">로그아웃</button>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #343a40;
  color: #fff;

  .logo {
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .logout-btn {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

<template>
  <nav class="navbar">
    <div class="logo">QnA Board</div>
    <div class="nav-links">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/login">로그인</RouterLink>
      <RouterLink to="/register">회원가입</RouterLink>
      <RouterLink to="/mypage">마이페이지</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
  }

  .nav-links {
    display: flex;
    gap: 20px;

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

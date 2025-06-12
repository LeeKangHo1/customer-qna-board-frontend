<template>
  <div class="my-page" v-if="userStore.isLoggedIn">
    <h2>마이페이지</h2>
    <div class="info-box">
      <p><strong>아이디:</strong> {{ userStore.userInfo.loginId }}</p>
      <p><strong>이름:</strong> {{ userStore.userInfo.name }}</p>
      <p><strong>이메일:</strong> {{ userStore.userInfo.email }}</p>
      <p><strong>권한:</strong> {{ userStore.userInfo.isAdmin ? '관리자' : '일반 사용자' }}</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>

<style scoped lang="scss">
.my-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .info-box {
    font-size: 16px;
    line-height: 1.8;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;

    p {
      margin: 0 0 10px;
    }

    strong {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>

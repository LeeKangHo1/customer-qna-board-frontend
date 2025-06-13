<template>
  <div class="register-page">
    <h2>회원가입</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="loginId">아이디</label>
        <input id="loginId" v-model="loginId" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input id="name" v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <button type="submit">회원가입</button>
      <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'

const loginId = ref('')
const password = ref('')
const name = ref('')
const email = ref('')
const message = ref('')
const success = ref(false)
const router = useRouter()

const handleRegister = async () => {
  if (!loginId.value || !password.value || !name.value || !email.value) {
    message.value = '❌ 모든 항목을 입력해주세요.'
    success.value = false
    return
  }

  try {
    const res = await axios.post('/users', {
      login_id: loginId.value,
      password: password.value,
      name: name.value,
      email: email.value
    })

    if (res.data.success) {
      message.value = '✅ 회원가입이 완료되었습니다!'
      success.value = true

      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } else {
      message.value = '❌ 회원가입 실패: ' + res.data.errorMessage
      success.value = false
    }
  } catch (err) {
    message.value = '❌ 오류 발생: ' + (err.response?.data?.message || err.message)
    success.value = false
  }
}
</script>

<style scoped lang="scss">
.register-page {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #343a40;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .success {
    color: green;
    text-align: center;
    margin-top: 12px;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 12px;
  }
}
</style>

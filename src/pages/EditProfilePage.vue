<template>
  <div class="edit-page">
    <h2>회원정보 수정</h2>

    <form @submit.prevent="handleUpdate">
      <div class="form-group">
        <label>이름</label>
        <input v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label>이메일</label>
        <input v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label>새 비밀번호 (선택)</label>
        <input v-model="form.newPassword" type="password" />
      </div>

      <div class="form-group">
        <label>현재 비밀번호 확인</label>
        <input v-model="form.password" type="password" required />
      </div>

      <div class="form-actions">
        <button type="submit">수정하기</button>
        <button type="button" @click="router.back()">취소</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import axios from '../api/axios'

const userStore = useUserStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  newPassword: '',
  password: ''
})

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  } else {
    form.value.name = userStore.userInfo.name
    form.value.email = userStore.userInfo.email
  }
})

const handleUpdate = async () => {
  try {
    await axios.put(`/users/${userStore.userInfo.id}`, {
      login_id: userStore.userInfo.login_id,
      password: form.value.password,
      new_name: form.value.name,
      new_email: form.value.email,
      new_password: form.value.newPassword
    })

    alert('✅ 회원정보가 수정되었습니다.')
    // 최신 정보 다시 요청해서 store 갱신
    const res = await axios.get(`/users/${userStore.userInfo.id}`)
    userStore.userInfo = res.data.response
    router.push('/mypage')
  } catch (err) {
    alert('❌ 수정 실패: ' + (err.response?.data?.message || err.message))
  }
}
</script>

<style scoped>
.edit-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
  }

  input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:first-child {
    background-color: #0d6efd;
    color: white;
  }

  button:last-child {
    background-color: #6c757d;
    color: white;
  }
}
</style>

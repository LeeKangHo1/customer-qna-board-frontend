<template>
  <div class="my-page" v-if="userStore.isLoggedIn">
    <h2>마이페이지</h2>

    <div class="info-box">
      <p><strong>아이디:</strong> {{ userStore.userInfo.login_id }}</p>
      <p><strong>이름:</strong> {{ userStore.userInfo.name }}</p>
      <p><strong>이메일:</strong> {{ userStore.userInfo.email }}</p>
      <p><strong>권한:</strong> {{ userStore.userInfo.is_admin ? '관리자' : '일반 사용자' }}</p>
    </div>

    <!-- ✅ 수정/탈퇴 버튼을 같은 줄에 배치 -->
    <div class="action-buttons">
      <button class="edit-btn" @click="router.push('/edit-profile')">회원정보 수정</button>
      <button class="withdraw-btn" @click="handleClick">회원탈퇴</button>
    </div>

    <!-- ✅ 탈퇴 확인 모달 -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-box">
        <p>정말 탈퇴하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="confirmWithdrawal">예</button>
          <button @click="showModal = false">아니오</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from '../api/axios'

const userStore = useUserStore()
const router = useRouter()
const showModal = ref(false)

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  }
})

function handleClick() {
  showModal.value = true
}

async function confirmWithdrawal() {
  const password = prompt('비밀번호를 다시 입력해주세요')
  if (!password) {
    alert('❌ 비밀번호를 입력해야 탈퇴가 가능합니다.')
    return
  }

  try {
    await axios.delete('/users', {
      data: {
        login_id: userStore.userInfo.login_id,
        password: password,
      },
    })

    alert('✅ 회원 탈퇴가 완료되었습니다.')
    userStore.logout()
    router.push('/')
  } catch (err) {
    alert('❌ 탈퇴 실패: ' + (err.response?.data?.message || err.message))
  } finally {
    showModal.value = false
  }
}
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

.action-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #0d6efd;
    color: white;
  }

  .withdraw-btn {
    background-color: #dc3545;
    color: white;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);

  .modal-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:first-child {
      background-color: #dc3545;
      color: white;
    }

    button:last-child {
      background-color: #6c757d;
      color: white;
    }
  }
}
</style>

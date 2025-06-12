<template>
  <div class="inquiry-write-page" v-if="userStore.isLoggedIn">
    <h2>문의 작성</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" v-model="title" type="text" required />
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" rows="8" required></textarea>
      </div>
      <button type="submit">등록</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useInquiryStore } from '../stores/inquiry'

const router = useRouter()
const userStore = useUserStore()
const inquiryStore = useInquiryStore()

const title = ref('')
const content = ref('')
const message = ref('')

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  }
})

const handleSubmit = () => {
  if (!title.value || !content.value) {
    message.value = '❌ 제목과 내용을 모두 입력해주세요.'
    return
  }

  // 로컬 상태에 임시 추가 (백엔드 연동 전용)
  const newInquiry = {
    id: Date.now(), // 임시 ID
    userId: userStore.userInfo.id,
    title: title.value,
    content: content.value,
    answered: 0,
    createdAt: new Date().toISOString(),
  }

  inquiryStore.originalInquiries.unshift(newInquiry)
  inquiryStore.searchInquiries() // 검색 조건 초기화
  message.value = '✅ 문의가 등록되었습니다!'
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<style scoped lang="scss">
.inquiry-write-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
    }

    input,
    textarea {
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

  .message {
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
  }
}
</style>

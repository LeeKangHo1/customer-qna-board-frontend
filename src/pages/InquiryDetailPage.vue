<template>
  <div class="inquiry-detail-page" v-if="inquiry">
    <button class="back-btn" @click="goBack">← 목록으로</button>

    <h2>문의 상세 보기</h2>
    <div class="inquiry-box">
      <p><strong>제목:</strong> {{ inquiry.title }}</p>
      <p><strong>작성일:</strong> {{ formatDate(inquiry.createdAt) }}</p>
      <p><strong>작성자 ID:</strong> {{ inquiry.userId }}</p>
      <p><strong>답변 상태:</strong> {{ inquiry.answered ? '답변 완료' : '미답변' }}</p>
      <div class="content">
        <strong>내용:</strong>
        <p>{{ inquiry.content }}</p>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>해당 문의글을 찾을 수 없습니다.</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useInquiryStore } from '../stores/inquiry'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const inquiryStore = useInquiryStore()
const userStore = useUserStore()

const inquiry = ref(null)

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  const inquiryId = Number(route.params.id)
  inquiry.value = inquiryStore.originalInquiries.find(i => i.id === inquiryId)
})

const goBack = () => {
  history.back()
}

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}
</script>

<style scoped lang="scss">
.inquiry-detail-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .back-btn {
    margin-bottom: 16px;
    padding: 8px 12px;
    background-color: #e9ecef;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #dee2e6;
    }
  }

  .inquiry-box {
    font-size: 16px;
    line-height: 1.8;

    .content {
      margin-top: 10px;
      background: #f8f9fa;
      padding: 12px;
      border-radius: 6px;
    }
  }
}

.not-found {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  color: #888;
  font-size: 18px;
}
</style>

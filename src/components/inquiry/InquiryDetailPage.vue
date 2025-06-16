<template>
  <div v-if="isLoading" class="loading">🔄 문의글을 불러오는 중입니다...</div>

  <div v-else-if="inquiry" class="inquiry-detail-page">
    <button class="back-btn" @click="goHome">← 목록으로</button>

    <h2>문의 상세 보기</h2>
    <div class="inquiry-box">
      <p><strong>제목:</strong> {{ inquiry.title }}</p>
      <p><strong>작성일:</strong> {{ formatDate(inquiry.created_at) }}</p>
      <p><strong>작성자 이름:</strong> {{ inquiry.name }}</p>
      <p><strong>답변 상태:</strong> {{ inquiry.answered ? '답변 완료' : '미답변' }}</p>

      <div class="content">
        <strong>내용:</strong>
        <p>{{ inquiry.content }}</p>
      </div>

      <div class="actions" v-if="userStore.userInfo">
        <button v-if="userStore.userInfo.id === inquiry.user_id" class="edit-btn" @click="goEdit">✏️ 수정</button>
        <button v-if="userStore.userInfo.id === inquiry.user_id" class="delete-btn" @click="deleteInquiry">🗑️ 삭제</button>
        <button v-if="userStore.userInfo.is_admin" class="reply-btn" @click="toggleReplyForm">💬 답글달기</button>
      </div>

      <!-- ✅ 답변 목록 -->
      <div v-for="(answer, idx) in answers" :key="answer.id" class="answer-box">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>💡 관리자 답변 {{ idx + 1 }}</h3>
          <div v-if="userStore.userInfo?.is_admin" class="admin-controls">
            <button class="admin-btn" @click="startEdit(answer.id, answer.content)">✏</button>
            <button class="admin-btn" @click="deleteAnswer(answer.id)">🗑</button>
          </div>
        </div>
        <p><strong>작성일:</strong> {{ formatDate(answer.created_at) }}</p>

        <div v-if="isEditing[answer.id]">
          <textarea v-model="editContent[answer.id]" rows="4" style="width: 100%"></textarea>
          <button @click="saveEdit(answer.id)">저장</button>
          <button @click="cancelEdit(answer.id)">취소</button>
        </div>
        <div v-else class="answer-content">{{ answer.content }}</div>
      </div>

      <!-- 답글 입력 폼 -->
      <div v-if="showReplyForm && userStore.userInfo?.is_admin" class="reply-form">
        <textarea v-model="replyContent" placeholder="답글 내용을 입력하세요" rows="4" />
        <button class="submit-reply" @click="submitReply">답글 등록</button>
      </div>
    </div>
  </div>

  <div v-else class="not-found"><p>해당 문의글을 찾을 수 없습니다.</p></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useInquiryStore } from '../../stores/inquiry'
import { useUserStore } from '../../stores/user'
import axios from '../../api/axios'

const route = useRoute()
const router = useRouter()
const inquiryStore = useInquiryStore()
const userStore = useUserStore()

const inquiry = ref(null)
const isLoading = ref(true)

const showReplyForm = ref(false)
const replyContent = ref('')
const answers = ref([])

const isEditing = ref({})
const editContent = ref({})

const fetchAnswers = async (inquiryId) => {
  try {
    const res = await axios.get(`/answers?inquiry_id=${inquiryId}`)
    if (res.data.success) {
      answers.value = res.data.response

      // ✅ 답변 상태 자동 업데이트
      inquiry.value.answered = answers.value.length > 0
    }
  } catch (err) {
    console.error('답변 불러오기 실패:', err)
  }
}

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  const inquiryId = Number(route.params.id)
  const result = await inquiryStore.fetchInquiryById(inquiryId)
  isLoading.value = false

  if (!result) return

  const isOwner = userStore.userInfo.id === result.user_id
  const isAdmin = userStore.userInfo.is_admin === true

  if (result.is_secret === 1 && !(isOwner || isAdmin)) {
    alert('비밀글입니다.')
    router.push('/')
    return
  }

  inquiry.value = result
  await fetchAnswers(result.id)
})

const goHome = () => router.push('/')
const goEdit = () => router.push(`/inquiries/${inquiry.value.id}/edit`)

const deleteInquiry = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await axios.delete(`/inquiries/${inquiry.value.id}`)
    alert('문의글이 삭제되었습니다.')
    router.push('/')
  } catch (err) {
    console.error('삭제 실패:', err)
    alert('삭제에 실패했습니다.')
  }
}

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value
}

const submitReply = async () => {
  if (!replyContent.value.trim()) {
    alert('답글 내용을 입력해주세요.')
    return
  }

  try {
    const payload = {
      inquiry_id: inquiry.value.id,
      admin_id: userStore.userInfo.id,
      content: replyContent.value
    }

    const res = await axios.post('/answers', payload)

    if (res.data.success) {
      alert('답변이 등록되었습니다.')
      replyContent.value = ''
      showReplyForm.value = false
      await fetchAnswers(inquiry.value.id)
    } else {
      alert('답변 등록 실패: ' + res.data.errorMessage)
    }
  } catch (err) {
    console.error('❌ 답변 등록 실패:', err)
    alert('답변 등록 중 오류가 발생했습니다.')
  }
}

const startEdit = (id, content) => {
  isEditing.value[id] = true
  editContent.value[id] = content
}

const cancelEdit = (id) => {
  isEditing.value[id] = false
  editContent.value[id] = ''
}

const saveEdit = async (id) => {
  try {
    const res = await axios.put(`/answers/${id}`, {
      content: editContent.value[id],
    })
    if (res.data.success) {
      alert('수정 완료')
      isEditing.value[id] = false
      await fetchAnswers(inquiry.value.id)
    } else {
      alert('수정 실패: ' + res.data.errorMessage)
    }
  } catch (err) {
    console.error('수정 실패:', err)
    alert('수정 중 오류 발생')
  }
}

const deleteAnswer = async (id) => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    const res = await axios.delete(`/answers/${id}`)
    if (res.data.success) {
      alert('삭제 완료')
      await fetchAnswers(inquiry.value.id)
    } else {
      alert('삭제 실패: ' + res.data.errorMessage)
    }
  } catch (err) {
    console.error('삭제 실패:', err)
    alert('삭제 중 오류 발생')
  }
}

const formatDate = (raw) => {
  const date = new Date(raw)
  if (isNaN(date)) return '날짜 오류'

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}
</script>



<style scoped lang="scss">
.admin-btn {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 14px;
  cursor: pointer;
  padding: 0 4px;

  &:hover {
    text-decoration: underline;
  }
}

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

    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;

      button {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
      }

      .edit-btn {
        background-color: #0d6efd;
        color: white;

        &:hover {
          background-color: #0b5ed7;
        }
      }

      .delete-btn {
        background-color: #dc3545;
        color: white;

        &:hover {
          background-color: #bb2d3b;
        }
      }

      .reply-btn {
        background-color: #198754;
        color: white;

        &:hover {
          background-color: #157347;
        }
      }
    }
  }
}

.reply-form {
  max-width: 700px;
  margin: 0 auto 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
  }

  .submit-reply {
    align-self: flex-end;
    padding: 8px 14px;
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #0b5ed7;
    }
  }
}

.loading {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  font-size: 18px;
  color: #555;
}

.not-found {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  color: #888;
  font-size: 18px;
}

.answer-box {
  max-width: 700px; // ✅ 문의 상세와 너비 통일
  margin: 30px auto 0; // ✅ 중앙 정렬
  padding: 16px;
  background-color: #f1f3f5;
  border-radius: 8px;
  border-left: 4px solid #198754;

  h3 {
    margin-bottom: 8px;
    color: #198754;
    font-size: 20px; // ✅ 제목 크기 줄이기
  }

  .answer-content {
    margin-top: 8px;
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #ccc;
    white-space: pre-line;
  }
}
</style>
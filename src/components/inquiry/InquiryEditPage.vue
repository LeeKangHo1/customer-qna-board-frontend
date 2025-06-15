<template>
  <div class="inquiry-edit-page" v-if="inquiry">
    <h2>문의글 수정</h2>
    <form @submit.prevent="submitEdit">
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" v-model="title" type="text" required />
      </div>

      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="content" rows="6" required></textarea>
      </div>

      <!-- ✅ 체크박스 + 버튼을 한 줄로 배치 -->
      <div class="form-options">
        <div class="checkbox">
          <input type="checkbox" id="isSecret" v-model="isSecret" />
          <label for="isSecret">비밀글로 설정</label>
        </div>

        <div class="form-actions">
          <button type="submit">수정 완료</button>
          <button type="button" @click="cancelEdit">취소</button>
        </div>
      </div>
    </form>
  </div>

  <div v-else class="not-found">
    <p>문의글을 불러오는 중입니다...</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../../api/axios'
import { useUserStore } from '../../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const inquiryId = Number(route.params.id)
const inquiry = ref(null)
const title = ref('')
const content = ref('')
const isSecret = ref(false)

// 데이터 불러오기
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  try {
    const res = await axios.get(`/inquiries/${inquiryId}`)
    if (res.data.success) {
      const data = res.data.response

      // 권한 체크 (본인만 수정 가능)
      if (data.user_id !== userStore.userInfo.id) {
        alert('수정 권한이 없습니다.')
        router.push('/')
        return
      }

      inquiry.value = data
      title.value = data.title
      content.value = data.content
      isSecret.value = data.is_secret === 1
    } else {
      alert('존재하지 않는 문의글입니다.')
      router.push('/')
    }
  } catch (err) {
    console.error('❌ 문의글 로딩 실패:', err)
    alert('오류가 발생했습니다.')
    router.push('/')
  }
})

// 수정 제출
const submitEdit = async () => {
  try {
    await axios.put(`/inquiries/${inquiryId}`, {
      title: title.value,
      content: content.value,
      is_secret: isSecret.value ? 1 : 0,
    })
    alert('문의글이 수정되었습니다.')
    router.push(`/inquiries/${inquiryId}`)
  } catch (err) {
    console.error('❌ 수정 실패:', err)
    alert('수정에 실패했습니다.')
  }
}

const cancelEdit = () => {
  router.push(`/inquiries/${inquiryId}`)
}
</script>

<style scoped lang="scss">
.inquiry-edit-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;

  h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .checkbox {
      display: flex;
      align-items: center;

      input[type='checkbox'] {
        margin-right: 8px;
      }

      label {
        font-weight: normal;
        margin: 0;
      }
    }

    .form-actions {
      display: flex;
      gap: 10px;

      button {
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        cursor: pointer;
      }

      button[type='submit'] {
        background-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }
      }

      button[type='button'] {
        background-color: #dee2e6;

        &:hover {
          background-color: #ced4da;
        }
      }
    }
  }
}

.not-found {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  color: #888;
}
</style>

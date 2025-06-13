<template>
  <div class="inquiry-list">
    <div v-if="store.filteredInquiries.length === 0" class="empty">
      🔍 검색 결과가 없습니다.
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>제목</th>
          <th>답변</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inquiry in pagedInquiries" :key="inquiry.id">
          <td>
            <RouterLink :to="`/inquiries/${inquiry.id}`">
              {{ inquiry.title }}
            </RouterLink>
          </td>
          <td>{{ inquiry.answered ? '✅ 완료' : '⏳ 대기 중' }}</td>
          <td>{{ formatDateToYYYYMMDD(inquiry.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :total-items="store.filteredInquiries.length"
      :items-per-page="perPage"
      :current-page="store.currentPage"
      @update:currentPage="store.currentPage = $event"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useInquiryStore } from '../../stores/inquiry'
import { storeToRefs } from 'pinia'
import Pagination from '../common/Pagination.vue'
import { RouterLink } from 'vue-router'

const store = useInquiryStore()
const { filteredInquiries, currentPage } = storeToRefs(store)

const perPage = 5

// 페이지별 데이터 추출
const pagedInquiries = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredInquiries.value.slice(start, end)
})

// 날짜 포맷팅 함수
// "Fri, 13 Jun 2025 13:19:09 GMT" → "2025-06-13"으로 변환
function formatDateToYYYYMMDD(dateStr) {
  const date = new Date(dateStr)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 초기 데이터 불러오기
onMounted(() => {
  store.fetchAllInquiries()
})
</script>

<style scoped lang="scss">
.inquiry-list {
  margin-top: 24px;

  .empty {
    text-align: center;
    color: #888;
    padding: 20px;
    font-size: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;

    th,
    td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f1f1f1;
      font-weight: 600;
    }

    td {
      font-size: 15px;
    }

    th:nth-child(1),
    td:nth-child(1) {
      width: 60%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 20%;
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 20%;
    }
  }
}
</style>

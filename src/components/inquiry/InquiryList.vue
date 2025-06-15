<template>
  <div class="inquiry-list">
    <div v-if="store.filteredInquiries.length === 0" class="empty">
      🔍 검색 결과가 없습니다.
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>제목</th>
          <th>비밀글</th> <!-- ✅ 위치 변경 -->
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
          <td>{{ inquiry.is_secret === 1 ? '🔒' : '-' }}</td> <!-- ✅ 위치 변경 -->
          <td>{{ inquiry.status === 'answered' ? '✅' : '⏳' }}</td>
          <td>{{ formatDateToFull(inquiry.created_at) }}</td>
        </tr>
      </tbody>

    </table>

    <Pagination :total-items="store.filteredInquiries.length" :items-per-page="perPage"
      :current-page="store.currentPage" @update:currentPage="store.currentPage = $event" />
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

// 날짜 포맷 (시분초 포함)
function formatDateToFull(dateStr) {
  const date = new Date(dateStr)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
}

// 데이터 초기 불러오기
onMounted(() => {
  store.fetchAllInquiries()
})
</script>

<style scoped lang="scss">
.inquiry-list {
  margin: 24px auto;
  max-width: 800px; // ✅ 전체 테이블 너비 축소

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
      text-align: center; // ✅ 전체 가운데 정렬
      white-space: nowrap;
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
      text-align: center; // 제목 헤더
      min-width: 300px;
      width: 50%;
    }

    td:nth-child(1) {
      text-align: left; // 제목 내용
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 80px; // 🔒 비밀글
      text-align: center;
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 80px; // ✅ 답변
      text-align: center;
    }

    th:nth-child(4),
    td:nth-child(4) {
      width: 180px; // 🕒 작성일
      text-align: center;
    }
  }
}
</style>

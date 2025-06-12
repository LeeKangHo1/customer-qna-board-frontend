<template>
    <div class="inquiry-list">
        <div v-if="filteredInquiries.length === 0" class="empty">
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
                    <td>{{ inquiry.title }}</td>
                    <td>{{ inquiry.answered ? '✅ 완료' : '⏳ 대기 중' }}</td>
                    <td>{{ formatDate(inquiry.createdAt) }}</td>
                </tr>
            </tbody>
        </table>

        <!-- 페이징 컴포넌트 추가 -->
        <Pagination 
            :total-items="filteredInquiries.length" 
            :items-per-page="perPage" 
            :current-page="currentPage"
            @update:currentPage="currentPage = $event" />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useInquiryStore } from '../../stores/inquiry'
import { storeToRefs } from 'pinia'
import Pagination from '../common/Pagination.vue'

const store = useInquiryStore()
const { filteredInquiries } = storeToRefs(store)

const currentPage = ref(1)
const perPage = 5

// ✅ 정렬/검색 결과 바뀔 때 페이지 리셋
watch(filteredInquiries, () => {
  currentPage.value = 1
})

// ✅ 페이징된 항목 계산
const pagedInquiries = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredInquiries.value.slice(start, end)
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

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

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSearch">
      <input
        type="search"
        v-model="keyword"
        placeholder="검색어를 입력하세요"
      />
      <select v-model="sortOrder">
        <option value="latest">최신순</option>
        <option value="answered">답변 완료순</option>
        <option value="unanswered">미답변순</option>
      </select>
      <button type="submit">🔍 검색</button>
      <button type="button" @click="resetSearch">초기화</button>
    </form>
  </div>
</template>

<script setup>
import { useInquiryStore } from '../../stores/inquiry'
import { storeToRefs } from 'pinia'

// Pinia 상태 연결
const store = useInquiryStore()
const { keyword, sortOrder } = storeToRefs(store)

// 검색 실행
function handleSearch() {
  store.searchInquiries()
}

// 초기화
const resetSearch = () => {
  store.resetFilters()
}


</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  form {
    display: flex;
    gap: 10px;

    input,
    select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background-color: #343a40;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #495057;
      }
    }
  }
}
</style>

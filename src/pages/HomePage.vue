<template>
  <div class="home-page">
    <SearchBar />
    <InquiryList />
  </div>
</template>

<script setup>
import SearchBar from '../components/inquiry/SearchBar.vue'
import InquiryList from '../components/inquiry/InquiryList.vue'
import { onMounted } from 'vue'
import { useInquiryStore } from '../stores/inquiry'

const store = useInquiryStore()

onMounted(() => {
    if (store.filteredInquiries.length === 0) {
    store.fetchAllInquiries() // 검색/정렬 상태 유지하며 초기화는 안 함
  }
})
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

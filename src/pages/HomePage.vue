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
  store.fetchAllInquiries()
})
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">이전</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="nextPage">다음</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalItems: Number,
  itemsPerPage: Number,
  currentPage: Number
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

function prevPage() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

function nextPage() {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  button {
    padding: 6px 12px;
    background-color: #343a40;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>

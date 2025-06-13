import { defineStore } from 'pinia'


export const useInquiryStore = defineStore('inquiry', {
  state: () => ({
    // 검색어, 정렬
    keyword: '',
    sortOrder: 'latest',
    currentPage: 1,

    // 원본 데이터 - 더미미
    originalInquiries: [
      { id: 1, title: '첫 번째 질문', answered: true, createdAt: '2024-06-01' },
      { id: 2, title: '두 번째 질문', answered: false, createdAt: '2024-06-02' },
      { id: 3, title: '세 번째 질문', answered: true, createdAt: '2024-06-03' },
      { id: 4, title: '네 번째 질문', answered: false, createdAt: '2024-06-04' },
      { id: 5, title: '다섯 번째 질문', answered: true, createdAt: '2024-06-05' },
      { id: 6, title: '여섯 번째 질문', answered: false, createdAt: '2024-06-06' },
      { id: 7, title: '일곱 번째 질문', answered: true, createdAt: '2024-06-07' },
      { id: 8, title: '여덟 번째 질문', answered: true, createdAt: '2024-06-08' },
      { id: 9, title: '아홉 번째 질문', answered: false, createdAt: '2024-06-09' },
      { id: 10, title: '열 번째 질문', answered: true, createdAt: '2024-06-10' },
      { id: 11, title: '열한 번째 질문', answered: false, createdAt: '2024-06-11' },
      { id: 12, title: '열두 번째 질문', answered: true, createdAt: '2024-06-12' },
      { id: 13, title: '열세 번째 질문', answered: false, createdAt: '2024-06-13' },
      { id: 14, title: '열네 번째 질문', answered: true, createdAt: '2024-06-14' },
      { id: 15, title: '열다섯 번째 질문', answered: false, createdAt: '2024-06-15' },
    ],


    // 화면에 보여줄 필터링된 데이터
    filteredInquiries: [],
  }),

  actions: {
    fetchAllInquiries() {
      // originalInquiries에서 복사
      this.filteredInquiries = [...this.originalInquiries]
      console.log('✅ 전체 질문 불러옴')
    },

    searchInquiries() {
      console.log('🔍 검색 실행:', this.keyword, this.sortOrder)

      const filtered = this.originalInquiries
        .filter(q => q.title.includes(this.keyword))
        .sort((a, b) => {
          if (this.sortOrder === 'answered') return b.answered - a.answered
          if (this.sortOrder === 'unanswered') return a.answered - b.answered
          return b.id - a.id // 최신순
        })

      this.filteredInquiries = filtered
      this.currentPage = 1
    },

    resetFilters() {
      this.keyword = ''
      this.sortOrder = 'latest'
      this.currentPage = 1
      this.filteredInquiries = [...this.originalInquiries]
    }

  }
})

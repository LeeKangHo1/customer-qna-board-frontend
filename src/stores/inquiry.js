import { defineStore } from 'pinia'
import axios from '../api/axios'

export const useInquiryStore = defineStore('inquiry', {
  state: () => ({
    // 검색어, 정렬
    keyword: '',
    sortOrder: 'latest',
    currentPage: 1,

    // 화면에 보여줄 필터링된 데이터
    filteredInquiries: [],
    originalInquiries: [],
  }),

  actions: {
    async fetchAllInquiries() {
      try {
        const res = await axios.get('/inquiries')
        this.originalInquiries = res.data.response || []
        this.filteredInquiries = [...this.originalInquiries]
        console.log('✅ 문의글 불러오기 성공:', this.originalInquiries.length)
      } catch (err) {
        console.error('❌ 문의글 불러오기 실패:', err)
      }
    },
    // 상세 조회 메서드
    async fetchInquiryById(id) {
      try {
        const res = await axios.get(`/inquiries/${id}`)
        return res.data.response // 단일 문의글 반환
      } catch (err) {
        console.error('❌ 문의글 상세 조회 실패:', err)
        return null
      }
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

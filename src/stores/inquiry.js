// src/stores/inquiry.js
import { defineStore } from 'pinia'
import axios from '../api/axios'

export const useInquiryStore = defineStore('inquiry', {
  state: () => ({
    // 🔍 검색어, 정렬 조건, 현재 페이지
    keyword: '',
    sortOrder: 'latest', // 'latest', 'answered', 'unanswered'
    currentPage: 1,

    // 💾 전체 문의글과 필터링된 결과
    originalInquiries: [],
    filteredInquiries: []
  }),

  actions: {
    /**
     * ✅ 전체 문의글 불러오기
     * - API 요청 후 originalInquiries와 filteredInquiries 모두 초기화
     */
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

    /**
     * ✅ 단일 문의글 상세 조회
     */
    async fetchInquiryById(id) {
      try {
        const res = await axios.get(`/inquiries/${id}`)
        return res.data.response
      } catch (err) {
        console.error('❌ 문의글 상세 조회 실패:', err)
        return null
      }
    },

    /**
     * 🔍 검색 + 정렬 동시 처리
     * - 제목에 검색어가 포함된 문의글 필터링
     * - 정렬 조건에 따라 정렬 (최신순, 답변된 것 우선, 미답변 우선)
     */
    searchInquiries() {
      console.log('🔍 검색 실행:', this.keyword, this.sortOrder)

      // 1. 제목에 keyword 포함 여부로 필터링
      const keywordLower = this.keyword.toLowerCase()
      let filtered = this.originalInquiries.filter(q =>
        q.title.toLowerCase().includes(keywordLower)
      )

      // 2. 정렬 조건 처리
      filtered.sort((a, b) => {
        // 최신순/오래된순 (created_at 기준)
        if (this.sortOrder === 'latest') {
          return new Date(b.created_at) - new Date(a.created_at)
        }

        if (this.sortOrder === 'answered') {
          return (b.status === 'answered') - (a.status === 'answered')
        }

        if (this.sortOrder === 'unanswered') {
          return (a.status === 'answered') - (b.status === 'answered')
        }

        // 기본: 최신순
        return new Date(b.created_at) - new Date(a.created_at)
      })

      // 결과 적용
      this.filteredInquiries = filtered
      this.currentPage = 1
    },

    /**
     * 🔄 검색/정렬 조건 초기화
     */
    resetFilters() {
      this.keyword = ''
      this.sortOrder = 'latest'
      this.currentPage = 1
      this.filteredInquiries = [...this.originalInquiries]
    }
  }
})

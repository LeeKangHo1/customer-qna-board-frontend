// store에서 actions 분리했을 경우

// src/services/inquiryService.js
// import axios from '../api/axios'
// import { useInquiryStore } from '../stores/inquiry'

// export const fetchInquiries = async () => {
//   const store = useInquiryStore()
//   store.isLoading = true
//   try {
//     const response = await axios.get('/inquiries', {
//       params: {
//         page: store.currentPage,
//         keyword: store.searchKeyword,
//         sort: store.sortOption,
//       }
//     })
//     store.inquiries = response.data.response.items
//     store.totalPages = response.data.response.total_pages
//   } catch (error) {
//     console.error('문의글 조회 실패:', error)
//   } finally {
//     store.isLoading = false
//   }
// }

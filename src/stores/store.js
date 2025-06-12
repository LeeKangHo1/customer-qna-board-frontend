import { defineStore } from "pinia";

// store 만들기 (export를 써서 외부에서 사용 가능하게)
export const useStore = defineStore('main', { // main은 store 이름 -> store 여러 개 정의 가능
    state: () => ({
        // 상태변수 정의
    }),
    actions: {
        // 함수

        // 비동기 함수 async/await 문법 써야함
    }
});
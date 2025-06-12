import { defineStore } from "pinia";

// store 만들기 (export를 써서 외부에서 사용 가능하게)
export const useStore = defineStore('main', { // main은 store 이름 -> store 여러 개 정의 가능
    state: () => ({
        // 상태변수 정의
        // weatherData: {
        //     temp: 0,
        //     city: 'Seoul',
        // },
    }),
    actions: {
        // 함수

        // toggleButton () {
        //     this.toggle = !this.toggle
        // },

        // 비동기 함수 async/await 문법 써야함
        // async getWeather() { 
        // const API_KEY = import.meta.env.VITE_API_KEY;     
        // const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.weatherData.city}&appid=${API_KEY}`
        // await fetch(API_URL)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.updateWeather(data);
        //     })
        //     .catch(err => {
        //         alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        //     })
        // }
    }
});
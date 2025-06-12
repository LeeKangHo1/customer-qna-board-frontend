import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 라우터 등록
import router from './router/router' 

// 부트스트랩 등록
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// 피니아 등록
import { createPinia } from 'pinia'; 

// pinia 객체를 가져와 변수에 할당
const pinia = createPinia();

createApp(App)
    .use(pinia) // 피니아
    .use(router) // 라우터
    .mount('#app')

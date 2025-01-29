import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'


import '@/assets/styles/index.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

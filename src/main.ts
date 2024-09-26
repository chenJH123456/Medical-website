import { createApp } from 'vue'

import '@/sytle/reset.scss'

import App from './App.vue'

import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalButtom from '@/components/hospital_buttom/index.vue'
import Login from '@/components/login/index.vue'

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import pinia from '@/store'

const app = createApp(App)

app.component('HospitalTop', HospitalTop)
app.component('HospitalButtom', HospitalButtom)
app.component('Login',Login)

app.use(router)
app.use(ElementPlus, {
	locale: zhCn,
})
app.use(pinia)
//挂载
app.mount('#app')

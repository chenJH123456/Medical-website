import { createPinia } from 'pinia' //引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件

const Pinia = createPinia() //创建pinia实例
Pinia.use(piniaPluginPersistedstate) //将插件添加到 pinia 实例上

export default Pinia //导出pinia用于main.js注册

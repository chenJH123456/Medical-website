//对于axios函数库二次封装
//目的： 1.利用axios请求，响应拦截器功能
//      2.请求拦截器，一般可以在请求头中携带公共参数
//      3.响应拦截器，可以简化服务器返回的数据，处理http网络错误
import axios from 'axios'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const request = axios.create({
	baseURL: '/api', //请求的基础路径设置
	timeout: 10000, //请求超过10秒则请求失败R
})
//请求拦截器
request.interceptors.request.use((config) => {
	//获取用户仓库
	let userStore = useUserStore()
	// console.log(userStore.userInfo)
	if (userStore.userInfo.token) {
		config.headers.token = userStore.userInfo.token
	}
	//config:请求拦截器回调注入的对象(配置对象),配置对象的身上最重要的一件事headers属性
	//可以通过请求头携带公共-token
	return config
})

//响应拦截器
request.interceptors.response.use(
	(response) => {
		//成功的回调,一般会进行简化数据
		// console.log(response)
		return response.data
	},
	(error) => {
		//失败的回调,处理http网络错误
		let status = error.response.status
		console.log(error)
		switch (status) {
			case 404:
				ElMessage({
					type: 'error',
					message: '请求失败路径出现问题',
				})
				break
			case 401:
				ElMessage({
					type: 'error',
					message: '参数有误',
				})
				break
		}
		return Promise.reject(new Error(error.message))
	}
)

//务必对外暴露axios
export default request

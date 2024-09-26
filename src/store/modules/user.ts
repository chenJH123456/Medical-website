import { defineStore } from 'pinia'
import { reqCode, reqUserLoging } from '@/api/hospital'
import type {
	LoginData,
	UserLoginResponseData,
	UserInfo,
} from '@/api/hospital/type'
import type { UserState } from './interface'

const useUserStore = defineStore('User', {
	state: (): UserState => {
		return {
			visiable: false,
			code: '', // 存储用户的验证码
			userInfo: {} as UserInfo,
		}
	},
	actions: {
		async getCode(phone: string) {
			let result: any = await reqCode(phone)
			if (result.code === 200) {
				this.code = result.data
				return 'ok'
			} else {
				return Promise.reject(new Error(result.message))
			}
		},
		async userLogin(loginData: LoginData) {
			try {
				let result: UserLoginResponseData = await reqUserLoging(loginData)
				console.log(result)
				if (result.code === 200) {
					// 登录成功处理逻辑
					this.userInfo = result.data

					return 'ok'
				} else {
					// throw new Error(result.message || '登录失败')
					return Promise.reject(new Error(result.message))
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error('登录失败:', error.message)
				}
			}
		},
		logout() {
			this.userInfo = { name: '', token: '' }
		},
	},
	getters: {},
	persist: {
		key: 'piniaStore', //存储名称
		storage: sessionStorage, // 存储方式
		paths: ['result.data'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
	},
})

export default useUserStore

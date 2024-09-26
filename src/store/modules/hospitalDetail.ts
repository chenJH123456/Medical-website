import { defineStore } from 'pinia'
import { reqHospitalDetail, reqHospitalRoom } from '@/api/hospital'
import type {
	HospitalDetail,
	DepartmentData,
	HospitalDetailRes,
} from '@/api/hospital/type'
import type { DatailState } from './interface'
import { ref } from 'vue'

//创建Detail仓库
const useDetailStore = defineStore('Detail', {
	state: (): DatailState => {
		return {
			//医院的详情数据
			hospitalInfo: {} as HospitalDetailRes,
			departmentArr: {} as DepartmentData,
		}
	},
	actions: {
		//获取医院详情的方法
		async getHospital(hoscode: string) {
			let result: HospitalDetailRes = await reqHospitalDetail(hoscode)
			console.log('医院详情：', result)
			if (result.code == 200) {
				this.hospitalInfo = result.data
			}
		},
		//获取医院科室的方法
		async getDepartment(hoscode: string) {
			let result: DepartmentData = await reqHospitalRoom(hoscode)
			console.log('医院科室：', result)
			if (result.code == 200) {
				this.departmentArr = result.data
			}
		},
	},
	getters: {},
})
//获取仓库的方法对外暴露
export default useDetailStore

// const useDetailStore = defineStore('Detail', () => {
// 	const hospitalInfo = ref({})

// 	//获取医院详情的方法
// 	const getHospital = async (hoscode: string) => {
// 		let result: HospitalDetail = await reqHospitalDetail(hoscode)
// 		console.log(result)
// 		if (result.code == 200) {
// 			hospitalInfo.value = result.data
// 		}
// 	}

// 	return {
// 		hospitalInfo: hospitalInfo.value,
// 		getHospital,
// 	}
// })

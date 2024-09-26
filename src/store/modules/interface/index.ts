import type {
	HospitalDetail,
	DepartmentArr,
	UserInfo,
} from '@/api/hospital/type'
export interface DatailState {
	hospitalInfo: HospitalDetail
	departmentArr: DepartmentArr
}

export interface UserState {
	visiable: boolean
	code: string // 存储用户的验证码
	userInfo: UserInfo
}
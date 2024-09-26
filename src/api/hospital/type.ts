// import exp from 'constants'

export interface ResponseData {
	code: number
	message: string
	ok: boolean
}
//医院详情
export interface HospitalDetail {
	bookingRule: {
		cycle: number
		releaseTime: string
		stopTime: string
		quitDay: number
		quitTime: string
		rule: [string, string]
	}
	hospital: {
		id: string
		createTime: string
		updateTime: string
		isDeleted: number
		param: {
			hostypeString: string
			fullAddress: string
		}
		hoscode: string
		hosname: string
		hostype: string
		provinceCode: string
		cityCode: string
		districtCode: string
		address: string
		logoData: string
		intro: string
		route: string
		status: number
		bookingRule: null
	}
}

export interface HospitalDetailRes extends HospitalDetail {
	data: HospitalDetail
	code: number
	message: string
	ok: boolean
}

//医院科室
export interface Department {
	depcode: string
	depname: string
	children?: Department[]
}

export type DepartmentArr = Department[]

export interface DepartmentData extends Department {
	data: Department
	code: number
	message: string
	ok: boolean
}

//用户登录接口
export interface LoginData {
	phone: string
	code: string
}
//验证码
export interface UserInfo {
	name: string
	token: string
}

export interface UserLoginResponseData extends ResponseData {
	data: UserInfo
}

export interface BaseMap {
	workDateString: string
	releaseTime: string
	bigname: string
	stopTime: string
	depname: string
	hosname: string
}

export interface WorkData {
	workDate: string
	workDateMd: string
	dayOfWeek: string
	docCount: number
	reservedNumber: number
	availableNumber: number
	status: number
}

export type BookingScheduleList = WorkData[]

export interface HospitaWordData extends ResponseData {
	data: {
		total: number
		bookingScheduleList: BookingScheduleList
		baseMap: BaseMap
	}
}

export interface Doctor {
	id: string
	createTime: string
	updateTime: string
	isDeleted: number
	param: {
		dayOfWeek: string
		depname: string
		hosname: string
	}
	hoscode: string
	depcode: string
	title: string
	docname: string
	skill: string
	workDate: string
	workTime: number
	reservedNumber: number
	availableNumber: number
	amount: number
	status: number
	hosScheduleId: string
}

export type DocArr = Doctor[]

export interface DoctorResponseData extends ResponseData {
	data: DocArr
}

export interface DoctorInfoData extends ResponseData{
	data:Doctor
}
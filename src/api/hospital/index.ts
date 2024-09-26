import request from '@/utils/request'
import type {
	DepartmentData,
	HospitalDetailRes,
	LoginData,
	UserLoginResponseData,
	HospitaWordData,
	DoctorResponseData,
	DoctorInfoData,
} from './type'
import { scheduler } from 'timers/promises'

enum API {
	HOSPITALDETAIL_URL = '/hosp/hospital/',
	HOSPITAROOM_URL = '/hosp/hospital/department/',
	GETUSERCODE_URL = '/sms/send/',
	USERLOGIN_URL = '/user/login',
	HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
	HOSPITALDOCTUR_URL = '/hosp/hospital/auth/findScheduleList/',
	GETUSER_URL = '/user/patient/auth/findAll',
	GETDOCTOR_URL = '/hosp/hospital/getSchedule/',
}

export const reqHospitalDetail = async (hoscode: string) =>
	await request.get<any, HospitalDetailRes>(API.HOSPITALDETAIL_URL + hoscode)
export const reqHospitalRoom = async (hoscode: string) =>
	await request.get<any, DepartmentData>(API.HOSPITAROOM_URL + hoscode)
export const reqCode = async (phone: string) =>
	await request.get<any, any>(API.GETUSERCODE_URL + phone)
export const reqUserLoging = async (data: LoginData) =>
	await request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)
export const reqHospitalWork = async (
	page: number,
	limit: number,
	hoscode: string,
	depcode: string
) =>
	await request.get<any, HospitaWordData>(
		API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`
	)
export const reqHospitalDoctor = async (
	hoscode: string,
	depcode: string,
	workDate: string
) =>
	await request.get<any, DoctorResponseData>(
		API.HOSPITALDOCTUR_URL + `${hoscode}/${depcode}/${workDate}`
	)
export const reqGetUser = () =>
	request.get<any, DoctorInfoData>(API.GETUSER_URL)

export const reqDoctorInfo = (schedulerId: string) =>
	request.get(API.GETDOCTOR_URL + schedulerId)

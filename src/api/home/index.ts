//统一管理首页模块接口
import request from '@/utils/request'
import type {
	HospitalRseponseDate,
	HospitalLevelAndRegionResponseData,
	HospitalInfo,
} from './type'
//通过枚举管理首页模块的接口地址
enum API {
	//获取已有医院的接口数据接口地址
	HOSPITAL_URL = '/hosp/hospital/',
	//获取医院的等级与地区接口
	HOSPITALLEVELANDREGUIN_URL = '/cmn/dict/findByDictCode/',
	//根据搜素关键字获取医院
	HOSPITALINFO_URL = '/hosp/hospital/findByHosname/',
}
//获取医院的数组
export const reqHospital = (
	page: number,
	limit: number,
	hostype = '',
	districtCode = ''
) =>
	request.get<any, HospitalRseponseDate>(
		API.HOSPITAL_URL +
			`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
	)
export const reqHospitalLevelAndRegion = (dictCode: string) =>
	request.get<any, HospitalLevelAndRegionResponseData>(
		API.HOSPITALLEVELANDREGUIN_URL + dictCode
	)
//根据关键字获取医院数据
export const reqHospitalInfo = (hosname: string) =>
	request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + hosname)

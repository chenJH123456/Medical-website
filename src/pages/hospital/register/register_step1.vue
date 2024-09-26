<template>
	<div class="wrap">
		<!-- 顶部结构 -->
		<div class="Top">
			<div class="hosname">{{ workData.baseMap?.hosname }}</div>
			<div class="line"></div>
			<div>{{ workData.baseMap?.bigname }}</div>
			<div class="dot">.</div>
			<div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
		</div>
		<!-- 日期结构 -->
		<div class="center">
			<h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
			<div class="container">
				<div
					class="item"
					:class="{
						active: item.status == -1 || item.availableNumber == -1,
						cur: item.workDate == workTime.workDate,
					}"
					v-for="item in workData.bookingScheduleList"
					:key="item"
					@click="changeTime(item)">
					<div class="top">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
					<div class="bottom">
						<div v-if="item.status == -1">停止挂号</div>
						<div v-if="item.status == 0">
							{{
								item.availableNumber == -1
									? '约满了'
									: `有号(${item.availableNumber})`
							}}
						</div>
						<div v-if="item.status == 1">即将放号</div>
					</div>
				</div>
			</div>
			<el-pagination
				v-model:current-page="pageNo"
				layout="prev, pager, next"
				:total="50"
				@current-change="fetchWorkData" />
		</div>
		<!-- 底部 -->
		<div class="Bottom">
			<div class="will" v-if="workTime.status == 1">
				<span class="time">2023</span>
				<span class="willText">放号</span>
			</div>
			<div class="doctor" v-else>
				<div class="moring">
					<div class="tip">
						<svg
							t="1726138216610"
							class="icon"
							viewBox="0 0 1026 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="4287"
							width="22"
							height="22">
							<path
								d="M93.184 883.968c0-25.6 20.736-46.592 47.36-46.592h742.912c26.112 0 47.36 21.504 47.36 46.592 0 25.6-20.736 46.592-47.36 46.592H140.544c-26.368 0-47.36-21.504-47.36-46.592zM465.408 235.008V138.496c0-25.344 21.504-45.824 46.592-45.824 25.6 0 46.592 21.248 46.592 45.824v96.512c-30.976-3.328-62.208-3.328-93.184 0zM184.576 389.888L127.744 333.056c-17.92-17.92-17.152-47.616 0.512-65.28 18.176-18.176 47.872-17.92 65.28-0.512L250.624 324.096c-24.32 19.456-46.592 41.472-66.048 65.792z m588.8-65.792l56.832-56.832c17.92-17.92 47.616-17.152 65.28 0.512 18.176 18.176 17.92 47.872 0.512 65.28l-56.832 56.832c-19.456-24.32-41.472-46.336-65.792-65.792z m64.512 327.168c0-179.968-145.92-325.888-325.888-325.888s-325.888 145.92-325.888 325.888H46.592c-25.344 0-46.592 20.736-46.592 46.592 0 24.832 20.992 46.592 46.592 46.592h930.56c25.344 0 46.592-20.736 46.592-46.592 0-25.088-20.992-46.592-46.592-46.592h-139.264z m0 0"
								p-id="4288"
								fill="#7dc5eb"></path>
						</svg>
						<span class="text">上午号源</span>
					</div>
					<div class="doc_info" v-for="doctor in moringArr" :key="doctor.id">
						<div class="left">
							<div class="info">
								<span>{{ doctor.title }}</span>
								<span>|</span>
								<span>{{ doctor.docname }}</span>
							</div>
							<div class="skill">{{ doctor.skill }}</div>
						</div>
						<div class="right">
							<div class="money">￥{{ doctor.amount }}</div>
							<el-button
								type="primary"
								size="default"
								@click="goStep2(doctor)"
								>{{ doctor.availableNumber }}</el-button
							>
						</div>
					</div>
				</div>
				<div class="after">
					<div class="tip">
						<svg
							t="1726138345023"
							class="icon"
							viewBox="0 0 1026 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="5829"
							width="22"
							height="22">
							<path
								d="M930.816 161.28c0 25.6-20.992 46.592-47.616 46.592h-742.4c-26.112 0-47.616-21.504-47.616-46.592 0-25.6 20.992-46.592 47.616-46.592h742.912c26.112 0 47.104 21.504 47.104 46.592z m-372.224 649.216v96.768c0 25.088-21.504 45.568-46.592 45.568-25.6 0-46.592-20.992-46.592-45.568v-96.768c30.72 3.072 61.952 3.072 93.184 0z m280.576-155.136l56.832 56.832c17.92 17.92 16.896 47.616-0.512 65.536-18.432 18.432-48.128 17.92-65.536 0.512L773.12 721.408c24.576-19.456 46.592-41.472 66.048-66.048zM250.88 721.408L194.048 778.24c-17.92 17.92-47.616 16.896-65.536-0.512-17.92-18.432-17.92-48.128-0.512-65.536L184.832 655.36c19.456 24.576 41.472 46.592 66.048 66.048zM186.368 394.24c0 180.224 145.92 325.632 325.632 325.632s325.632-145.92 325.632-326.144h139.776c25.088 0 46.592-20.48 46.592-46.592 0-25.088-20.992-46.592-46.592-46.592H47.104c-25.088 0-46.592 20.48-46.592 46.592 0 25.088 20.992 46.592 46.592 46.592 0 0.512 139.264 0.512 139.264 0.512z"
								p-id="5830"
								fill="#7dc5eb"></path>
						</svg>
						<span class="text">下午号源</span>
					</div>
					<div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
						<div class="left">
							<div class="info">
								<span>{{ doctor.title }}</span>
								<span>|</span>
								<span>{{ doctor.docname }}</span>
							</div>
							<div class="skill">{{ doctor.skill }}</div>
						</div>
						<div class="right">
							<div class="money">￥{{ doctor.amount }}</div>
							<el-button
								type="primary"
								size="default"
								@click="goStep2(doctor)"
								>{{ doctor.availableNumber }}</el-button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue'
	import { reqHospitalDoctor, reqHospitalWork } from '@/api/hospital'
	import { useRoute, useRouter } from 'vue-router'
	import type {
		Doctor,
		DocArr,
		HospitaWordData,
		DoctorResponseData,
	} from '@/api/hospital/type'
	let $route = useRoute()
	let $router = useRouter()
	let pageNo = ref<number>(1)
	let limit = ref<number>(6)
	let workData = ref<any>({})
	let workTime: any = ref({})
	let docArr = ref<DocArr>([])

	onMounted(() => {
		fetchWorkData()
	})

	const fetchWorkData = async () => {
		let result: HospitaWordData = await reqHospitalWork(
			pageNo.value,
			limit.value,
			$route.query.hoscode as string,
			$route.query.depcode as string
		)
		if (result.code == 200) {
			workData.value = result.data
			workTime.value = workData.value.bookingScheduleList[0]
			getDoctorWorkData()
		}
		console.log('排班数据：', result)
	}

	const getDoctorWorkData = async () => {
		let hoscode: string = $route.query.hoscode as string
		let depcode: string = $route.query.depcode as string
		let workDate: string = workTime.value.workDate as string
		// console.log('', hoscode, '', depcode, '', workDate)
		let result: DoctorResponseData = await reqHospitalDoctor(
			hoscode,
			depcode,
			workDate
		)
		console.log('医生数据：', result)
		if (result.code == 200) {
			docArr.value = result.data
		}
	}

	const changeTime = (item: any) => {
		workTime.value = item
		getDoctorWorkData()
	}

	let moringArr = computed(() => {
		return docArr.value.filter((doc: Doctor) => {
			return doc.workTime == 0
		})
	})

	let afterArr = computed(() => {
		return docArr.value.filter((doc: Doctor) => {
			return doc.workTime == 1
		})
	})

	const goStep2 = (doctor: Doctor) => {
		// console.log(doctor)
		$router.push({
			path: '/hospital/register_step2',
			query: { docId: doctor.id },
		})
	}
</script>

<style scoped lang="scss">
	.wrap {
		.Top {
			display: flex;
			color: #7f7f7f;
			.line {
				width: 5px;
				height: 20px;
				background: skyblue;
				margin: 0px 5px;
			}
			.dot {
				margin: 0px 5px;
				color: skyblue;
			}
		}
		.center {
			margin: 20px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.time {
				font-weight: 900;
			}
			.container {
				width: 100%;
				display: flex;
				margin: 30px 0px;
				.item {
					flex: 1;
					border: 2px solid skyblue;
					margin: 0px 5px;
					transition: all 0.3s;
					&.active {
						border: 2px solid #d0d0d0;
						color: #7f7f7f;
						.top {
							background: #d0d0d0;
						}
					}
					&.cur {
						transform: scale(1.1);
					}
					.top {
						background: #c1e8ff;
						height: 30px;
						width: 100%;
						text-align: center;
						line-height: 30px;
					}
					.bottom {
						width: 100%;
						height: 60px;
						text-align: center;
						line-height: 60px;
					}
				}
			}
		}
		.Bottom {
			.will {
				text-align: center;
				font-size: 30px;
				font-weight: 900;
				.time {
					color: red;
				}
				.willText {
					color: skyblue;
				}
			}
			.doctor {
				.tip {
					display: flex;
					align-items: center;
					.text {
						color: #7f7f7f;
						font-weight: 900;
					}
				}
				.doc_info {
					display: flex;
					justify-content: space-between;
					margin: 10px 0px;
					border-bottom: 1px solid #ccc;
					.left {
						.info {
							color: skyblue;
							margin: 10px 0px;
							span {
								margin: 0px 5px;
								font-size: 18px;
								font-size: 900;
							}
						}
						.skill {
							margin: 10px 0px;
							color: #7f7f7f;
						}
					}
					.right {
						width: 150px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.money {
							color: #7f7f7f;
							font-weight: 900;
						}
					}
				}
			}
		}
	}
</style>

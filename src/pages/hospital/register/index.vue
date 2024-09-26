<template>
	<div class="register">
		<div class="top">
			<div class="title">
				{{ hospitalStore.hospitalInfo.hospital?.hosname }}
			</div>
			<div class="level">
				<svg
					t="1725535938097"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="10807"
					width="16"
					height="16">
					<path
						d="M542.6688 85.333333c-74.325333 0-133.307733 58.026667-133.307733 133.393067 0 43.861333-37.922133 113.578667-80.093867 148.4288-30.754133 25.412267-98.013867 45.226667-200.055467 56.661333l-3.413333 0.4608a68.266667 68.266667 0 0 0-57.258667 67.328l-0.238933 374.442667-0.0512 0.256c-0.170667 1.194667-0.1024 2.269867 0.017067 3.822933l0.085333 3.413334a68.2496 68.2496 0 0 0 68.1984 64.853333l612.096 0.136533 0.341333 0.0512c0.836267 0.0512 1.6896 0.085333 2.542934 0.085334 25.463467 0 50.568533-7.168 72.430933-21.026134l4.693333-3.072a133.205333 133.205333 0 0 0 40.772267-45.2096l1.604267-3.072-1.6384 2.5088c4.642133-6.5024 8.021333-13.824 10.103466-21.6064l74.069334-326.894933 0.768-3.242667c0.9216-4.488533 1.365333-9.557333 1.2288-14.728533l-0.068267-1.092267-0.119467 2.474667a132.949333 132.949333 0 0 0-20.206933-81.271467l-2.6112-4.061866c-23.125333-34.577067-61.013333-56.081067-102.2976-59.204267l-2.679467-0.170667-1.024-0.136533a61.969067 61.969067 0 0 0-7.560533-0.4608l-145.442133-0.1024 1.8432-8.8576a393.728 393.728 0 0 0 7.185066-75.025067c0-28.501333-3.242667-56.951467-9.472-85.333333l-0.699733-2.696533a34.116267 34.116267 0 0 0-0.9216-2.628267l-0.477867-1.041067-0.682666-2.4576A133.4272 133.4272 0 0 0 542.6688 85.333333z m0 68.266667a65.160533 65.160533 0 0 1 62.5664 47.274667l1.553067 5.922133 0.6144 1.672533-0.955734-4.727466a323.703467 323.703467 0 0 1-10.120533 177.425066l-0.750933 2.389334a34.133333 34.133333 0 0 0 32.938666 42.973866L818.670933 426.666667l1.604267 0.238933 2.423467 0.187733a66.986667 66.986667 0 0 1 54.6304 31.573334 64.853333 64.853333 0 0 1 10.154666 35.84l-0.273066 6.877866 0.1024 2.525867-73.796267 325.700267-1.1264 1.7408-1.245867 2.269866a65.314133 65.314133 0 0 1-23.552 26.2656l-3.720533 2.2016a66.833067 66.833067 0 0 1-28.125867 8.192l-2.133333 0.0512-2.048-0.068266L136.533333 870.126933l0.256-378.4704c114.210133-12.782933 192.273067-35.7888 235.946667-71.867733 55.415467-45.806933 102.3488-130.594133 104.789333-195.822933l0.085334-5.239467c0-37.410133 28.16-65.1264 65.041066-65.1264z"
						fill="#d81e06"
						p-id="10808"></path>
					<path
						d="M290.133333 580.266667v187.733333a34.133333 34.133333 0 0 1-34.133333 34.133333h-34.133333V546.133333h34.133333a34.133333 34.133333 0 0 1 34.133333 34.133334z"
						fill="#d81e06"
						p-id="10809"></path>
				</svg>
				<span>{{
					hospitalStore.hospitalInfo.hospital?.param.hostypeString
				}}</span>
			</div>
		</div>
		<!-- 内容区 -->
		<div class="content">
			<div class="left">
				<img
					:src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
					alt="" />
			</div>
			<div class="right">
				<div class="title">挂号规则</div>
				<div class="time">
					<span>预约时间:10天 放号时间:</span
					>{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}
					<span>停挂时间:</span
					>{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
				</div>
				<div class="address">
					<span>具体位置:</span
					>{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
				</div>
				<div class="route">
					<span>规划路线:</span>{{ hospitalStore.hospitalInfo.hospital?.route }}
				</div>
				<div class="releasetime">
					<span>退号时间:就诊前一工作日</span
					>{{ hospitalStore.hospitalInfo.bookingRule?.quitTime
					}}<span>前取消</span>
				</div>
				<div class="title">医院预约规则</div>
				<div
					class="rule"
					v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule"
					:key="index">
					{{ item }}
				</div>
			</div>
		</div>
		<!-- 科室数据 -->
		<div class="department">
			<div class="leftNav">
				<ul>
					<li
						@click="changeIndex(index)"
						v-for="(department, index) in hospitalStore.departmentArr"
						:key="department.depcode"
						:class="{ active: index == currentIndex }">
						{{ department.depname }}
					</li>
				</ul>
			</div>
			<div class="depart">
				<div
					class="showDepartment"
					v-for="department in hospitalStore.departmentArr"
					:key="department.depcode">
					<h1 class="cur">{{ department.depname }}</h1>
					<ul>
						<li
							@click="showLogin(item)"
							v-for="item in department.children"
							:key="item.depcode">
							{{ item.depname }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import useDetailStore from '@/store/modules/hospitalDetail'
	import useUserStore from '@/store/modules/user'
	let userStore = useUserStore()
	let hospitalStore = useDetailStore()
	// console.log('hospitalStore:', hospitalStore)
	let $route = useRoute()
	let $router = useRouter()
	//高亮active
	let currentIndex = ref<number>(0)
	const changeIndex = (index: number) => {
		currentIndex.value = index
		let allH1 = document.querySelectorAll('.cur')
		allH1[currentIndex.value].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}
	//点击科室按钮回调
	const showLogin = (item: any) => {
		// userStore.visiable = true
		//点击医院科室跳转到预约挂号详情页面
		// console.log(item)
		$router.push({
			path: '/hospital/register_step1',
			query: { hoscode: $route.query.hoscode, depcode: item.depcode },
		})
	}
</script>

<style scoped lang="scss">
	.register {
		.top {
			display: flex;
			.title {
				font-size: 24px;
				font-weight: 900;
				margin-right: 8px;
			}
			.level {
				color: #7f7f7f;
				height: 40px;
				text-align: center;
				line-height: 40px;
				span {
					margin-left: 4px;
				}
			}
		}
		.content {
			display: flex;
			margin-top: 20px;
			.left {
				width: 80px;
				height: 80px;
				img {
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
			}
			.right {
				flex: 1;
				font-size: 14px;
				margin-left: 20px;
				.title {
					font-size: 18px;
				}
				.time,
				.address,
				.route {
					margin-top: 6px;
				}
				.releasetime {
					margin-top: 6px;
					margin-bottom: 10px;
				}
				span {
					color: #7f7f7f;
				}
				.rule {
					color: #7f7f7f;
					margin-top: 6px;
				}
			}
		}
		.department {
			width: 100%;
			height: 500px;
			display: flex;
			margin-top: 20px;
			.leftNav {
				width: 80px;
				height: 100%;
				ul {
					width: 100%;
					height: 100%;
					background: #f0f0f0;
					display: flex;
					flex-direction: column;
					li {
						flex: 1;
						text-align: center;
						color: #7f7f7f;
						font-size: 14px;
						line-height: 40px;
						&.active {
							border-left: 1px solid red;
							color: red;
							background-color: white;
						}
					}
				}
			}
			.depart {
				flex: 1;
				margin-left: 20px;
				height: 100%;
				overflow: auto;
				&::-webkit-scrollbar {
					display: none;
				}
				.showDepartment {
					h1 {
						background-color: #d6d6d6;
						color: #7f7f7f;
					}
					ul {
						display: flex;
						flex-wrap: wrap;
						li {
							color: #7f7f7f;
							width: 33%;
							line-height: 30px;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="container">
		<div class="tip">确认挂号信息</div>
		<!--卡片:展示就诊人信息-->
		<el-card class="box-card">
			<!-- 头部 -->
			<template #header>
				<div class="card-header">
					<span>请选择就诊人</span>
					<el-button class="button" type="primary" size="default" :icon="User"
						>添加就诊人</el-button
					>
				</div>
			</template>
			<!-- 就诊人 -->
			<div class="user">
				<Visitor v-for="item in 4" :key="item" class="item" />
			</div>
		</el-card>
		<!--卡片:展示医生的信息-->
		<el-card class="box-card">
			<!-- 卡片的头部 -->
			<template #header>
				<div class="card-header">
					<span>挂号信息</span>
				</div>
			</template>
			<!-- 医生信息 -->
			<el-descriptions class="margin-top" :column="2" border>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">就诊日期：</div>
					</template>
					{{ docInfo.param?.dayOfWeek }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">就诊医院：</div>
					</template>
					{{ docInfo.param?.hosname }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">就诊科室：</div>
					</template>
					{{ docInfo.param?.depname }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">医生姓名：</div>
					</template>
					{{ docInfo.docname }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">医生职称：</div>
					</template>
					{{ docInfo.title }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">医生专长：</div>
					</template>
					{{ docInfo.skill }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<div class="cell-item">医事服务费：</div>
					</template>
					{{ docInfo.availableNumber }}
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<!-- 确定挂号按钮 -->
		<div class="btn">
			<el-button type="primary" size="default">确认挂号</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { User } from '@element-plus/icons-vue'
	import { reqDoctorInfo } from '@/api/hospital'
	import type { DoctorInfoData, Doctor } from '@/api/hospital/type'
	import { onMounted, ref } from 'vue'
	import { useRoute } from 'vue-router'
	import Visitor from './visitor.vue'

	let $route = useRoute()
	let docInfo = ref<Doctor>({})

	onMounted(() => {
		fetchInfo()
	})
	const fetchInfo = async () => {
		let result: DoctorInfoData = await reqDoctorInfo(
			$route.query.docId as string
		)
		console.log('医生信息：', result)
		if (result.code == 200) {
			docInfo.value = result.data
		}
	}
</script>

<style scoped lang="scss">
	.container {
		.tip {
			font-weight: 900;
			color: #7f7f7f;
			font-size: 20px;
		}
		.box-card {
			margin: 20px 0px;
			.card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.user {
				display: flex;
				flex-wrap: wrap;
				.item {
					width: 32%;
					margin: 5px;
				}
			}
		}
		.btn {
			display: flex;
			justify-content: center;
		}
	}
</style>

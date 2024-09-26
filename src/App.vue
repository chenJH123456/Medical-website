<template>
	<div class="container">
		<!-- 顶部的全局组件 -->
		<HospitalTop />
		<!-- 展示路由组件区域 -->
		<div class="content">
			<router-view></router-view>
		</div>
		<HospitalButtom />
		<!-- 登录组件 -->
		<Login />
	</div>
</template>

<script setup lang="ts">
	import request from './utils/request.ts'
	import { onMounted } from 'vue'
	onMounted(() => {
		request.get('/hosp/hospital/1/10').then((res) => {
			console.log('医院的接口数据:', res)
		})
	})
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		.content {
			margin-top: 70px;
			width: 1200px;
			height: 100%;
			min-height: 700px;
			background: #ffffff;
		}
	}
</style>

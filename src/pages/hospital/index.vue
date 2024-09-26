<template>
	<div class="hospital">
		<!-- 左导航 -->
		<div class="menu">
			<div class="top">
				<el-icon><HomeFilled /></el-icon>
				<span>/医院信息</span>
			</div>
			<el-menu
				default-active="$route.path"
				class="el-menu-vertical-demo"
				:router="true">
				<el-menu-item
					index="/hospital/register"
					@click="changeRoute('/hospital/register')">
					<el-icon><IconMenu /></el-icon>
					<span>预约挂号</span>
				</el-menu-item>
				<el-menu-item
					index="/hospital/detail"
					@click="changeRoute('/hospital/detail')">
					<el-icon><Document /></el-icon>
					<span>医院详情</span>
				</el-menu-item>
				<el-menu-item
					index="/hospital/notice"
					@click="changeRoute('/hospital/notice')">
					<el-icon><IconMenu /></el-icon>
					<span>预约须知</span>
				</el-menu-item>
				<el-menu-item
					index="/hospital/close"
					@click="changeRoute('/hospital/close')">
					<el-icon><InfoFilled /></el-icon>
					<span>停诊信息</span>
				</el-menu-item>
				<el-menu-item
					index="/hospital/search"
					@click="changeRoute('/hospital/search')">
					<el-icon><Location /></el-icon>
					<span>查询/取消</span>
				</el-menu-item>
			</el-menu>
		</div>
		<!-- 右内容 -->
		<div class="content">
			<!-- 子组件展示结构 -->
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue'
	import useDetailStore from '@/store/modules/hospitalDetail'
	//获取仓库对象
	let detailStore = useDetailStore()
	import {
		Document,
		Menu as IconMenu,
		Location,
		Setting,
		InfoFilled,
		HomeFilled,
	} from '@element-plus/icons-vue'
	import { useRoute, useRouter } from 'vue-router'
	let $router = useRouter()
	let $route = useRoute()
	const changeRoute = (path: string) => {
		$router.push({ path, query: { hoscode: $route.query.hoscode } })
	}
	//组件挂载完毕：通知pinia仓库发请求获取医院详情的数据，存储仓库当中
	onMounted(() => {
		detailStore.getHospital($route.query.hoscode as string)
		detailStore.getDepartment($route.query.hoscode as string)
	})
</script>

<style scoped lang="scss">
	.hospital {
		display: flex;
		.menu {
			flex: 2;
			display: flex;
			flex-direction: column;
			align-items: center;
			.top {
				color: #7f7f7f;
			}
		}
		.content {
			flex: 8;
		}
	}
</style>

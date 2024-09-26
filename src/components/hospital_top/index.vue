<template>
	<div class="top">
		<div class="content">
			<div class="left" @click="goHome">
				<img src="../../assets/images/logo.7086376.png" alt="" />
				<p>尚医通 预约挂号统一平台</p>
			</div>
			<div class="right">
				<p class="help">帮助中心</p>
				<p class="login" @click="login" v-if="!userStore.userInfo.name">
					登录/注册
				</p>
				<el-dropdown v-else>
					<span class="el-dropdown-link">
						{{ userStore.userInfo.name }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>实名认证</el-dropdown-item>
							<el-dropdown-item>挂号名单</el-dropdown-item>
							<el-dropdown-item>就诊管理</el-dropdown-item>
							<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	//引入路由器
	import { useRouter } from 'vue-router'
	//visiable控制login组件的对话框显示与隐藏
	import useUserStore from '@/store/modules/user'
	import { ArrowDown } from '@element-plus/icons-vue'
	let userStore = useUserStore()
	let $router = useRouter()
	const goHome = () => {
		$router.push({ path: '/home' })
	}
	const login = () => {
		userStore.visiable = true
	}
	const logout = () => {
		//通知pinia仓库清除相关数据
		userStore.logout()
	}
</script>

<style scoped lang="scss">
	.top {
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 70px;
		background: rgb(255, 255, 255);
		display: flex;
		justify-content: center;
		.content {
			display: flex;
			width: 1200px;
			height: 70px;
			background: rgb(255, 255, 255);
			justify-content: space-between;
			.left {
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					height: 50px;
					width: 50px;
					margin-right: 10px;
				}
				p {
					font-size: 20px;
					color: rgb(57, 176, 255);
				}
			}
			.right {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: rgb(151, 151, 151);
				.help {
					margin-right: 10px;
				}
			}
		}
	}
</style>

<template>
	<div class="search">
		<el-autocomplete
			clearable
			placeholder="请输入医院名称"
			class="input"
			v-model="hosname"
			@select="goDetail"
			:fetch-suggestions="fetchData"
			:trigger-on-focus="false" />
		<el-button type="primary" size="default" :icon="Search">搜索</el-button>
	</div>
</template>

<script setup lang="ts">
	import { Search } from '@element-plus/icons-vue'
	import { useRouter } from 'vue-router'
	import { ref } from 'vue'
	//引入请求方法
	import { reqHospitalInfo } from '@/api/home'
	import type { HospitalInfo } from '@/api/home/type'
	//创建路由器对象
	let $router = useRouter()
	//收集搜索的关键字
	let hosname = ref<string>('')
	//顶部组件的回调
	const fetchData = async (keyword: string, cb: any) => {
		//当用户输入完关键字函数会执行一次,发请求获取需要展示的数据即可
		// console.log(hosname.value)
		let result: HospitalInfo = await reqHospitalInfo(keyword)
		console.log('关键字返回数据:', result.data)
		let showData = result.data.map((item) => {
			return {
				value: item.hosname, //展示的医院名字
				hoscode: item.hoscode, //存储医院的编码
			}
		})
		// console.log(showData)
		//给组件提供展示的户数
		cb(showData)
	}
	//点击某一个搜索列表项
	const goDetail = (item: any) => {
		//点击跳转到医院详情，需要携带query参数
		$router.push({ path: '/hospital', query: { hoscode: item.hoscode } })
		console.log(item)
	}
</script>

<script lang="ts">
	export default {
		name: 'Search',
	}
</script>

<style scoped lang="scss">
	.search {
		width: 100%;
		height: 50px;
		background-color: rgb(191, 191, 191);
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0px;
		//深度选择器
		:deep(.input) {
			width: 600px;
			margin-right: 10px;
		}
	}
</style>

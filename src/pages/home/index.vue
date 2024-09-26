<template>
	<div>
		<!-- 轮播图 -->
		<Carousel />
		<!-- 搜索表单 -->
		<Search />
		<!-- Layout布局，底部展示医院结构 -->
		<el-row gutter="20">
			<el-col :span="20">
				<!-- 面包屑 -->
				<Level @getLevel="getLevel" @getRegion="getRegion" />
				<!-- 卡片 -->
				<div class="hospital" v-if="hasHospitalArr.length > 0">
					<Card
						class="item"
						v-for="(item, index) in hasHospitalArr"
						:key="item.id"
						:hospitalInfo="item" />
				</div>
				<el-empty v-else description="暂无医院信息" />
				<!-- 分页器 -->
				<el-pagination
					v-model:current-page="pageNo"
					v-model:page-size="pageSize"
					:page-sizes="[10, 20, 30, 40]"
					:background="true"
					layout="prev, pager, next, sizes, jumper,-&gt, total"
					:total="total"
					@current-change="currentChange"
					@size-change="sizeChange" />
			</el-col>
			<el-col :span="4">
				<Tip />
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import { reqHospital } from '../../api//home/index.ts'
	import Carousel from './carousel/index.vue'
	import Search from './search/index.vue'
	import Level from './level/index.vue'
	import Card from './card/index.vue'
	import Tip from './tip/index.vue'
	import type { Content, HospitalRseponseDate } from '../../api/home/type.ts'

	//页码
	let pageNo = ref<number>(1)
	//展示数据个数
	let pageSize = ref<number>(10)
	//存储拿到医院的数据
	let hasHospitalArr = ref([])
	//存储拿到医院的个数
	let total = ref<number>(0)
	//存储医院的等级相应数据
	let hostype = ref<string>('')
	//存储医院的地区
	let districtCode = ref<string>('')

	//组件挂载完毕：发一次请求
	onMounted(() => {
		getHospitalInfo()
	})
	//获取医院数据
	const getHospitalInfo = async () => {
		//获取医院的数据:默认获取第一页、一页十个医院的数据
		let result: HospitalRseponseDate = await reqHospital(
			pageNo.value,
			pageSize.value,
			hostype.value,
			districtCode.value
		)
		// console.log(result)
		if (result.code == 200) {
			hasHospitalArr.value = result.data.content
			total.value = result.data.totalElements
		}
	}
	//分页器页码发生变化时回调
	const currentChange = () => {
		getHospitalInfo()
	}
	//分页器下拉菜单发生变化时触发
	const sizeChange = () => {
		getHospitalInfo()
	}

	//子组件的自定义事件，获取子组件传递过来的等级参数
	const getLevel = (level: string) => {
		hostype.value = level
		getHospitalInfo()
	}
	const getRegion = (Region: string) => {
		districtCode.value = Region
		getHospitalInfo()
	}
</script>

<style scoped lang="scss">
	.hospital {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.item {
			width: 48%;
			margin: 10px 0px;
		}
	}
</style>

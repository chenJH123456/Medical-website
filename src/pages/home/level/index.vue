<template>
	<div class="level">
		<h1>医院</h1>
		<div class="content">
			<div class="left">等级：</div>
			<ul class="hospital">
				<li class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
				<li
					v-for="level in levelArr"
					:class="{ active: activeFlag == level.value }"
					:key="level.value"
					@click="changeLevel(level.value)">
					{{ level.name }}
				</li>
			</ul>
		</div>
		<div class="region">
			<div class="left">地区：</div>
			<ul class="hospital">
				<li class="{active:activeFlag==''}" @click="changeRegion('')">全部</li>
				<li
					v-for="region in RegionArr"
					:class="{ active: activeFlag == region.value }"
					:key="region.value"
					@click="changeRegion(region.value)">
					{{ region.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reqHospitalLevelAndRegion } from '../../../api/home'
	import { onMounted, ref } from 'vue'
	import type {
		HospitalLevelAndRegionResponseData,
		HospitalLevelAndRegionArr,
	} from '../../../api/home/type.ts'
	//存储医院的数据
	let levelArr = ref<HospitalLevelAndRegionArr>([])
	let RegionArr = ref<HospitalLevelAndRegionArr>([])
	//控制医院等级高亮响应式数据
	let activeFlag = ref<string>('')
	//组件挂载完毕
	onMounted(() => {
		getLevel()
		getRegion()
	})
	//获取医院的数据
	const getLevel = async () => {
		let result: HospitalLevelAndRegionResponseData =
			await reqHospitalLevelAndRegion('HosType')
		console.log('level数据:', result)
		//存储医院等级的数组
		if (result.code == 200) {
			levelArr.value = result.data
		}
	}
	const getRegion = async () => {
		let result: HospitalLevelAndRegionResponseData =
			await reqHospitalLevelAndRegion('beijin')
		console.log('Region数据:', result)
		//存储医院地区的数组
		if (result.code == 200) {
			RegionArr.value = result.data
		}
	}
	//点击等级的按钮回调
	const changeLevel = (level: string) => {
		//高亮响应式数据存储level数值
		console.log(level)
		activeFlag.value = level
		$emit('getLevel', level)
	}
	const changeRegion = (Region: string) => {
		console.log(Region)
		activeFlag.value = Region
		$emit('getRegion', Region)
	}

	let $emit = defineEmits(['getLevel', 'getRegion'])
</script>

<script lang="ts">
	export default {
		name: 'Level',
	}
</script>

<style scoped lang="scss">
	.level {
		color: rgb(168, 168, 168);
		h1 {
			font-weight: 900;
			font-size: 20px;
			color: black;
			margin: 10px 0px;
		}
		.content {
			margin-top: 20px;
			display: flex;
			.left {
				margin-right: 10px;
				width: 53px;
			}
			.hospital {
				display: flex;
				li {
					margin-right: 20px;

					&.active {
						color: rgb(125, 209, 255);
					}
				}
				li:hover {
					color: rgb(125, 209, 255);
				}
			}
		}

		.region {
			margin-top: 20px;
			display: flex;
			.left {
				margin-right: 10px;
				width: 80px;
			}
			.hospital {
				display: flex;
				flex-wrap: wrap;
				li {
					margin-right: 20px;
					margin-bottom: 5px;

					&.active {
						color: rgb(125, 209, 255);
					}
				}
				li:hover {
					color: rgb(125, 209, 255);
				}
			}
		}
	}
</style>

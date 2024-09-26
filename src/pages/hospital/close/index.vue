<template>
	<div>
		<div class="name">{{hospitalStore.hospitalInfo.hospital?.hosname}}停诊信息</div>
		<el-empty description="暂无信息" />
	</div>
</template>

<script setup lang="ts">
	import useDetailStore from '@/store/modules/hospitalDetail'
	let hospitalStore = useDetailStore()
</script>

<style scoped>
.name{
    display: flex;
    margin: 20px;
    font-size: 24px;
    font-weight: 900;
    justify-content: center;
    align-items: center;
}
</style>

<template>
	<div>
		<span>获取验证码(5s)</span>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	//倒计时事件
	let time = ref<number>(5)

	watch(
		() => props.flag,
		() => {
			console.log(123)
		},
		{
			immediate: true,
		}
	)

	let props = defineProps(['flag'])
	console.log(props.flag)
</script>

<style scoped></style>

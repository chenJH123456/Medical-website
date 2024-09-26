<template>
	<div class="buttom">
		<div class="content">
			<div class="left">京ICP备 13018369号 电话挂号010-56253825</div>
			<div class="right">
				<span>联系我们</span>
				<span>合作伙伴</span>
				<span>用户协议</span>
				<span>隐私协议</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.buttom {
		position: fixed;
		z-index: 998;
		width: 100%;
		height: 50px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		left: 0;
		right: 0;
		bottom: 0;
		.content {
			width: 1200px;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			.right {
				span {
					margin: 0px 5px;
				}
			}
		}
	}
</style>

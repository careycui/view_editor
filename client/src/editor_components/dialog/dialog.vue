<template>
	<transition name="dialog-fade">
		<div class="el-dialog__wrapper" style="z-index:1100">
			<div class="el-dialog ani-dialog">
				<div class="el-dialog__header">
					<span class="el-dialog__title">动画效果</span>
				</div>
				<div class="el-dialog__body"></div>
				<div class="el-dialog__footer">
					<span class="dialog-footer">
						<el-button size="small">取消</el-button>
						<el-button type="primary" size="small">确定</el-button>
					</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		name: 'cDialog'
	}
</script>
<style>
	.ani-dialog{
		position: fixed;
		width: 500px;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>
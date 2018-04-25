<template>
	<div class="hello" >
		<div class="el-icon-error" style="width: 40px;height: 40px;"></div>
		欢迎进入洗到家后台管理系统
	</div>
</template>

<script>
	let Hello={
		created(){
			this.$store.dispatch("Tokentf")
		}
	}
	export default Hello
</script>

<style lang="scss">
   .hello{
   	 padding: 20px;
   	 text-align: center;
   	 font-size: 32px;
   	 color: #666;
   }
</style>
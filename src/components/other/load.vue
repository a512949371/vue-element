<template>
  <div class="load-box">
   <div class="load-shaw"></div>
   <div class="load-text">数据加载中......</div>
  </div>
</template>

<script>
	let Load={
		
	}
	export default Load
</script>

<style lang="scss">
  	.postion-box{
  		position: relative;
	   	.load-box{
	  		position: absolute;
	  		top: 0;
	  		left: 0;
	  		right:0;
	  		bottom:0;
	  		z-index:199;
	  		.load-shaw{
	  			background-color: rgba(0,0,0,0.5);
	  			width: 100%;
	  			height: 100%;
	  		}
	  		.load-text{
	  			position: absolute;
	  			top: calc(50%-35px);
	  			top: 40%;
	  			left: calc(50%-140px);
	  			left: 40%;
	  			padding: 20px 40px;
	  			width: 200px;
	  			color: #333;
	  			background-color: #fff;
	  			font-size: 16px;
	  			text-align: center;
	  		}
	  	}
  	}
</style>
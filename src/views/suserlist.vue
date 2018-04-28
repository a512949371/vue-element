<template>
 <div class="bastic-table postion-box">
	<div class="select-box">
		用户名称: <input type="text" v-model="pagedata.username" class="inputbox"/>
	</div>
	<div class="select-box">
		<div class="select" style="text-align: right;">
			<el-button type="primary" icon="el-icon-search" size="small" v-on:click="Addsuser">新增</el-button>
			<el-button type="primary" icon="el-icon-share" size="small" v-on:click="Parentsearch">查询</el-button>
			<!--<el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>-->
		</div>
	</div>
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="listdata" border
	    highlight-current-row
	    :row-class-name="tableRowClassName"
	    @current-change="Singleselection">
	    <el-table-column width="55">
	     <template slot-scope="scope">
	     	<div class="check-box" v-if="scope.row.index===selectnum">
	     		<img src="../assets/images/icon-2.png" />
	     	</div>
	     	<div class="check-box" v-else>
	     		<img src="../assets/images/icon-1.png" />
	     	</div>
	     </template>
	    </el-table-column>	    
	    <el-table-column 
	      type="index"
	      label="序号"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="username"
	      label="账号">
	    </el-table-column>
	    <el-table-column 
	      prop="nickname"
	      label="店面">
	    </el-table-column>
	    <el-table-column 
	      prop="roleDesc"
	      label="角色">
	    </el-table-column>
	    <el-table-column 
	      prop="status"
	      label="状态">
	    </el-table-column>
	    <el-table-column 
	      prop="createTime"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="240">
	      <template slot-scope="scope">
	        <!--<el-button type="danger" size="small">冻结</el-button>-->
	        <el-button type="info" size="small" v-on:click="Editsuser(scope.$index, scope.row)">编辑</el-button>
	        <!--<el-button type="danger" size="small">删除</el-button>-->
	      </template>
	    </el-table-column>
	  </el-table>
    <div class="pagination mt20">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagedata.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagedata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
  </div>
   <Editsuser v-show="fixedTF"  :editdata="editdata" v-on:Closeedit="Closeedit"></Editsuser>
   <Addsuser v-show="fixedTFtwo"  v-on:Closeadd="Closeadd"></Addsuser>
   <Load v-show="loadTF"></Load>
  </div>
</template>

  <script>
  	import Editsuser from '../components/other/editsuser'
  	import Addsuser from '../components/other/addsuser'
  	import Load from '../components/other/load'
    export default {
    	components:{
    		Editsuser:Editsuser,
    		Addsuser:Addsuser,
    		Load
    	},
      data() {
        return {
          fixedTF:false,
          fixedTFtwo:false,
	      pagedata:{
          pageNum:1,
          pagesize:10,
          username:''
	      },
          total:1,
          listdata:[],
          editdata:'',
          editnum:'',
          loadTF:false,
          searchdata:'',
          selectnum:''
        }
      },
      created(){
      	var that=this;
      	this.loadTF=true;
      	this.$store.dispatch("Getsuser",this.pagedata).then((res)=>{
      		if(res.data.ok==true){
	      		that.listdata=this.$store.state.app.suserdata.list;
	            that.total=this.$store.state.app.suserdata.total;
		      	that.pagedata.pageNum=this.$store.state.app.suserdata.pageNum;
		      	that.pagedata.pagesize=this.$store.state.app.suserdata.pageSize; 
		      	that.loadTF=false      			
      		}

      	})
      },
      methods: {
        handleSizeChange(val) {
	         var that=this;
	         this.loadTF=true;
	         this.pagedata.pagesize=val;
	         this.$store.dispatch("Getsuser",this.pagedata).then((res)=>{
	         	if(res.data.ok==true){
		        	that.total=this.$store.state.app.suserdata.total;
		      		that.pagedata.pageNum=this.$store.state.app.suserdata.pageNum;
		      		that.pagedata.pagesize=this.$store.state.app.suserdata.pageSize;
		      		that.listdata=this.$store.state.app.suserdata.list;
		      		that.loadTF=false	         		
	         	}

	        })
          console.log('每页 '+this.pagedata.pagesize+' 条');
        },
        handleCurrentChange(val) {
	        var that=this;
	        this.loadTF=true;
	        this.pagedata.pageNum=val;
	        this.$store.dispatch("Getsuser",this.pagedata).then((res)=>{
	        	if(res.data.ok==true){
		        	if(res.data.data.list.length==0){
		        		console.log("23333")
		        	}else{
		        	that.total=this.$store.state.app.suserdata.total;
		      		that.pagedata.pageNum=this.$store.state.app.suserdata.pageNum;
		      		that.pagedata.pagesize=this.$store.state.app.suserdata.pageSize;
		      		that.listdata=this.$store.state.app.suserdata.list;
		      		}	
		      	that.loadTF=false
	        	}

	        })
          console.log(`当前页: ${val}`);
        },
        Editsuser(index,row,num){
        	console.log(row)
        	this.fixedTF=true;
        	this.editdata=row;
        	this.editnum=num;
        },
        Addsuser(){
        	this.fixedTFtwo=true;
        },
        Closeedit(){
        	this.fixedTF=false;
        },
        Closeadd(){
        	this.fixedTFtwo=false;
        },
        Parentsearch(){
			var that =this;
	      	this.loadTF=true;
	      	this.$store.dispatch("Getsuser",this.pagedata).then((res)=>{
	      		if(res.data.ok==true){
		      		that.listdata=this.$store.state.app.suserdata.list;
		            that.total=this.$store.state.app.suserdata.total;
			      	that.pagedata.pageNum=this.$store.state.app.suserdata.pageNum;
			      	that.pagedata.pagesize=this.$store.state.app.suserdata.pageSize; 
			      	that.loadTF=false	      			
	      		}
	      	})		        	
        },
        Singleselection(val){
        	this.currentRow = val
        	for(var i=0;i<this.listdata.length;i++){
        		if(this.currentRow.id==this.listdata[i].id){
        			this.selectnum= i
        			return
        		}
        	}
        },
        tableRowClassName(row, index) {
            //把每一行的索引放进row
            row.index = index
        },
      }
    }
  </script>
  <style lang="scss">
  	.inputbox{
  		padding: 3px 10px;
  		border-radius: 5px;
  		margin-left: 10px;
  	}
  </style>
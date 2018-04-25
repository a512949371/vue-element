<template>
 <div class="bastic-table">
	<div class="select-box">
		角色名称: <input type="text" value="" class="inputbox"/>
	</div>
	<div class="select-box">
		<div class="select" style="text-align: right;">
			<el-button type="primary" icon="el-icon-search" size="small">新增</el-button>
			<el-button type="primary" icon="el-icon-share" size="small">查询</el-button>
			<el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
		</div>
	</div>
      <div class="page-content">
	 <el-table
	    style="width: 100%" :data="tableData" border>
        <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column 
	      type="index"
	      label="序号"
	      width="100">
	    </el-table-column>
	    <el-table-column 
	      prop="date"
	      label="角色名称"
	      width="150">
	    </el-table-column>
	    <el-table-column 
	      prop="name"
	      label="角色描述">
	    </el-table-column>
	    <el-table-column 
	      prop="address"
	      label="数据权限">
	    </el-table-column>
	    <el-table-column 
	      prop="address"
	      label="状态">
	      <template slot-scope="scope">
      	  </template>
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="240">
	      <template slot-scope="scope">
	        <el-button type="danger" size="small">冻结</el-button>
	        <el-button type="info" size="small" v-on:click="Editrole">编辑</el-button>
	        <el-button type="danger" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
    <div class="pagination mt20">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
      </el-pagination>
    </div>
  </div>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          currentPage: 1,
          tableData: [{
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }]
        }
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        Editrole(){
        	this.$router.push("/syetemmanagement/editrole")
        }
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
<template>
  <div class="search">
    <el-row class="btns" align="middle">
      <el-col :span="24" class="col">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="地区">
            <el-input v-model.trim="conditions.area" placeholder="请输入城市中文名称"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model.trim="conditions.key" placeholder="请输入专业关键字"></el-input>
          </el-form-item>
          <el-form-item label="最低薪酬">
            <el-input v-model.number="conditions.low" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="最高薪酬">
            <el-input v-model.number="conditions.high" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="infos">
      <el-col :span="24">
        <p class="showResult" v-if="show === true">{{ temp.area }}、{{ temp.key }}，月薪{{ temp.low }}-{{ temp.high }}万，现有用人单位有:{{ result.dw }}家，提供岗位:{{ result.gw }}个。</p>
        <p class="showResult" v-else>Loading...</p>
      </el-col>
      <el-col :span="24">
        <div style="height: 0vh"></div>
      </el-col>
      <el-col :span="24">
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="序号" width="90" />
            <el-table-column prop="zyzs" label="专业知识" width="180" />
            <el-table-column label="快速入门" width="90">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-link :underline="false" type="primary" :href="scope.row.ksrm" target="_blank">查看</el-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="学习资源" width="90">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-link :underline="false" type="primary" :href="scope.row.xxzy" target="_blank">查看</el-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gwfg" label="专业知识可覆盖的岗位要求" />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conditions: {
        area: '成都',
        key: '大数据',
        high: 1,
        low: 0
      },
      result: {
        dw: 0,
        gw: 0
      },
      show: true,
      temp: {
        area: '成都',
        key: '大数据',
        high: 1,
        low: 0
      },
      tableData: []
    };
  },
  methods: {
    onSubmit() {
      this.show = false;
      this.search();
      this.temp = this.conditions;
      this.demo();
    },
    async search() {
      await this.$http
        .post('/api/search', {
          data: this.conditions
        })
        .then(resp => {
          console.log(resp.data);
          const { data: res } = resp;
          this.result.dw = res.data.gs;
          this.result.gw = res.data.gw;
          this.show = true;
        });
    },
    async demo() {
      const { data: res } = await this.$http.post('http://222.209.223.235:20838/domain', {
        peronalized_demand: {
          city: this.conditions.area,
          post: this.conditions.key,
          remuneration: '0-1000'
        }
      });
      res.forEach((element, index) => {
        const tmp = {
          id: index + 1,
          gwyq: element[0],
          zyzs: element[1],
          slcd: element[2],
          ksrm: element[3],
          xxzy: element[4],
          gwfg: element[7]
        };
        this.tableData.push(tmp);
      });
    }
  },
  created() {
    // this.demo();
  }
};
</script>

<style lang="less" scoped>
.search {
  margin: 20px auto 0 auto;
  width: 1170px;
  min-height: 45vh;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 0 10px #e3e4e4;
  .btns {
    height: 20vh;
    // background-color: pink;
    background-color: #ffffff80;
  }
  .infos {
    min-height: 300px;
    background-color: #ffffff80;
    p {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .cols {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .table {
    // width: 0%;
    padding: 20px;
    // background-color: pink;
  }
}
</style>

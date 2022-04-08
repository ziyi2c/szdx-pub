<template>
  <el-container>
    <el-header>
      <Title></Title>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <p class="showTotal">全国：{{ city }} 城市，招聘：{{ zp }} 人，招聘单位：{{ dw }} 家，提供岗位：{{ gw }} 个。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <Echarts> </Echarts>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <Search></Search>
          <!-- <Table></Table> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="height: 20vh"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title.vue';
import Echarts from '@/components/Echarts.vue';
import Search from '@/components/Search.vue';
// import Table from '@/components/Table.vue';
export default {
  name: 'Home',
  data() {
    return {
      city: 0,
      zp: 0,
      dw: 0,
      gw: 0
    };
  },
  methods: {
    async getCity() {
      const { data: res } = await this.$http.get('/api/city');
      // console.log(res);
      this.city = res.data;
    },
    async getZp() {
      const { data: res } = await this.$http.get('/api/people');
      // console.log(res);
      this.zp = res.data;
    },
    async getDw() {
      const { data: res } = await this.$http.get('/api/company');
      // console.log(res);
      this.dw = res.data;
    },
    async getGw() {
      const { data: res } = await this.$http.get('/api/job');
      // console.log(res);
      this.gw = res.data;
    },
    async getToken() {
      await this.$http.post('/token', { user: '1940510102', pwd: 'zezo0000' }).then(resp => {
        const { data: res } = resp;
        console.log(res);
        window.localStorage.setItem('token', res.token);
        // 等待返回token再进行数据请求
        // todo: 查询四个api
        this.getCity();
        this.getZp();
        this.getGw();
        this.getDw();
      });
    }
  },
  components: {
    Title,
    Echarts,
    Search
    // Table
  },
  created() {
    this.getToken();
  }
};
</script>
<style lang="less" scoped>
.el-header {
  height: 10vh;
}
.el-main {
  height: 90vh;
  --el-main-padding: 0;
}
.showTotal {
  width: 1170px;
  height: 10vh;
  line-height: 10vh;
  // border: 1px solid #000;
  background-color: #fff;
  // margin-bottom: 50px;
  margin: 0 auto 20px auto;
  border-radius: 7px;
  box-shadow: 0 0 10px #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>

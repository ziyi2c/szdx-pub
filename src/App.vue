<template>
  <router-view />
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    async getToken() {
      await this.$http.post('/token', { user: 'yourusername', pwd: 'yourpassword' }).then(resp => {
        const { data: res } = resp;
        console.log(res);
        window.localStorage.setItem('token', res.token);
        this.setToken(res.token);
      });
      // console.log(res);
    },
    ...mapMutations(['setToken'])
  },
  created() {}
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #ffffff, #6dd5fa, #2980b9); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #ffffff, #6dd5fa, #2980b9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

<template>
  <div class="hello">
    <div class="login">
        <input type="text" v-model.trim='mobile' name=""> <br/>
        <input type="password" v-model.trim='password' name=""> <br/>
        <button @click="login()">登录</button>
    </div>
    <div class="bg"> </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      mobile: "199198075774",
      password: "123456",
    }
  },
  computed: {},
  methods: {
    login() {
      // 把输入的值，通过vuex交互进行存储
      let iptVal = {
        'mobile': this.mobile,
        'password': this.password,
      };  
      this.$store.dispatch('addMyInfo', iptVal);
      this.$store.dispatch('showLogin', false);
    },
  },

  // 映射 this.login() 为  this.$store.commit('LOGIN_SUC')]), => 这样在actions中也就不需要再commit了
  // 如果需要参数 => 直接在调用时传递即可 
  // methods: {
  //   ...mapMutations({
  //     login: 'LOGIN_SUC',
  //   }),
  // },

}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .login {
    width: 300px;
    height: 190px;
    position: fixed;
    z-index: 999;
    background-color: white;
    border-radius: 2px;
    padding-top: 30px;
    left: 50%;
    top: 50%;
    margin-top: -85px;
    margin-left: -150px;
    text-align: center;
  }

  input {
    width: 200px;
    height: 35px;
    border-radius: 2px;
    border: 1px solid #8e8e8e;
    margin-top: 10px;
    padding-left: 5px;
  }

  button {
    width: 208px;
    height: 35px;
    background-color: #42b983;
    color: white;
    border-radius: 2px;
    border: 0px;
    margin-top: 10px;
  }

  .bg {
    background-color: black;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

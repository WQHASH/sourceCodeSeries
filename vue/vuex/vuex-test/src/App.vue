<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/logo.png">
    </div>

    <div class="myInfo">
      <p v-if="isHaveMobile">欢迎您，{{mobile}}</p>
      <p @click="goLogin" v-if="!isHaveMobile">登录</p>
    </div>

    
    <addTodo></addTodo>
    <todoList></todoList>
    <div>
      <h3>用于测试=> this.$store.getters.xxx </h3>
       <p>{{getMsg}}</p> 
    </div>  

    <login v-if="isShowLogin"></login>
  </div>

</template>

<script>
import login from './components/login';
import addTodo from './components/addTodo';
import todoList from './components/todoList';
import { mapState, mapGetters, mapActions } from 'vuex';
// mapState => 该方法暂时没有暂时，因为他需要将整个computed进行改动
export default {
  name: 'app',
  computed:{
    // getMsg: function(){
    //   return this.$store.getters.getMsg
    // },
    
    // ...mapGetters(['getMsg']),
     ...mapGetters({
        getMsg: 'getMsg',
     }),

    isShowLogin:function(){
      return this.$store.state.login.isShowLogin;
    },
    mobile: function () {
      return this.$store.state.login.mobile;
    },
    isHaveMobile: function () {
      let mobile = this.$store.state.login.mobile;
      if(mobile.length == 11){
        return true;
      }else{
        return false;
      }
    },
    

  },
  data(){
    return {

    }
  },
  components: {
    login,
    addTodo,
    todoList
  },
  methods:{
    goLogin:function () {
      this.$store.dispatch('showLogin' , true);
    },
    // 或者使用这种 方式来分发 action
    // ...mapActions({
    //   goLogin: 'showLogin',
    // }),
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 0px;
}
  .logo{
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  .myInfo{
    width: 200px;
    height: 40px;
    margin: 0 auto;
    text-align: center;
  }
</style>

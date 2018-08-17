<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/logo.png">
    </div>
    <div class="myInfo">
      <p @click="goLogin">登录</p>
    </div>
    <addTodo></addTodo>  
    <todoList></todoList>

    <login v-if="!isShowLogin"></login>
   
  </div>
</template>

<script>
import login from './components/login';
import addTodo from './components/addTodo';
import todoList from './components/todoList';
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {return {}},
  components: {
    login,
    addTodo,
    todoList,
  },
  computed: mapState({
    /**
     * [isShowLogin 记录状态变化 ]
     * @DateTime 2018-08-05T21:13:43+0800
     * @param    {Object}                 state [全局中的状态， store中的]
     * @return   {Object}                 [暂时未一个空对象]
     */
    isShowLogin(state){
      return this.$store.state.login.isShowLogin;
    },


  }),
  methods: {
    // 该方法用在主页面的登录，不是弹框组件的
    goLogin() {
      this.$store.dispatch('showLogin', true);      
    },
  },

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

  .logo {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .myInfo {
    width: 200px;
    height: 40px;
    margin: 0 auto;
    text-align: center;
  }
</style>

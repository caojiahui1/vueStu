<template>
  <div id="app"> 

    <mu-appbar  style="text-align: center;position: fixed;top: 0;">
      <mu-icon-button  slot="left"  icon="menu" style="position: absolute;left:0;" label="undocked drawer" @click="toggle(true)"/>
        {{titleBar}}
      </mu-appbar>
    <mu-appbar title="Title" style="text-align: center;visibility: hidden">

    </mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
     
      <mu-list @itemClick="toggle()">
        <mu-list-item v-if="isLogin"><router-link to="/login">登录/注册</router-link></mu-list-item>
         <mu-list-item v-if="myLogin"><router-link to="/userCon">{{username}}</router-link></mu-list-item>
        <mu-list-item title='首页' to="/" />
        <mu-list-item title="资本视野" to="/" @click.native="open = false"/>
        <mu-list-item title="资本需求" to="demand" @click.native="open = false"/>
        <mu-list-item title="老股转让" @click.native="open = false"/>
        <mu-list-item  v-if="myLogin" @click.native='loginOut'  title="退出" />
      </mu-list>

    </mu-drawer>

    <router-view></router-view>
    
  </div>
</template>

<script>
import store from './vuex'
import router from './router'
import { Indicator } from 'mint-ui';
export default {
  name: 'app',
    data () {
    return {

      open: false,
      docked: true,
      ic:'menu',
      my:'123',
      myUser:''
      
    }
  },
  methods: {

    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    loginOut (){

       let that=this
      
       Indicator.open('正在退出');
            
       store.commit('isLoginchange',true)
       store.commit('myLoginchange',false)
       store.commit('namechange',that.myUser)
       util.store.removeItem('_user_');
       setTimeout(function(){

            Indicator.close()
            that.$router.push({path:'/'})

                    },1000)
    },
    checkLogin(){
      let user = util.store.getItem('_user_')  
      
      if(user!=null){
        console.log('瞎提交')
        store.commit('isLoginchange',false)
        store.commit('myLoginchange',true)
        console.log('提交完了')
        let username=JSON.parse(user)
        store.commit('namechange',username.username)
        
      }else{

        store.commit('isLoginchange',true)
        store.commit('myLoginchange',false)
        store.commit('namechange','登录/注册')

      }
    }
  },
  created (){
   let that=this;
   store.commit('titlechange','首页列表')

   that.checkLogin()
  },
  computed: {
    titleBar () {
      return store.state.title
    },
    isLogin (){
      return store.state.isLogin
    },
    myLogin (){
      return store.state.myLogin
    },
    username (){
      return store.state.myName
    }

  }
}
</script>

<style>
html,body{padding: 0;margin: 0}
a{text-decoration: none;}

</style>

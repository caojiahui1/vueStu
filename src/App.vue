<template>
  <div id="app"> 

<mu-appbar  style="text-align: center;position: fixed;top: 0;">
  <mu-icon-button  slot="left"  icon="menu" style="position: absolute;left:0;" label="undocked drawer" @click="toggle(true)"/>
  {{count}}
</mu-appbar>
<mu-appbar title="Title" style="text-align: center;visibility: hidden">

</mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="toggle()">
        <mu-list-item v-if="haha"><router-link to="/login">登录/注册</router-link></mu-list-item>
         <mu-list-item v-if="heihei"><router-link to="/userCon">{{mylogin}}</router-link></mu-list-item>
        <mu-list-item ><router-link to="/">首页</router-link></mu-list-item>
        <mu-list-item title="资本视野"/>
        <mu-list-item title="资本需求"/>
        <mu-list-item title="老股转让" @click.native="open = false"/>
        <mu-list-item  v-if="heihei" @click.native='loginOut'  title="退出"></mu-list-item>
      </mu-list>
    </mu-drawer>
    <router-view>
    </router-view>
    
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
      var that=this
      
 Indicator.open('正在退出');
            
              store.commit('isLoginchange',true)
              store.commit('myLoginchange',false)
              store.commit('namechange',that.myUser)
               util.store.removeItem('_user_');
                //window.location.reload();
              setTimeout(function(){

                       Indicator.close()
                       that.$router.push({path:'/'})
                    },1000)
    }
  },
  created :function(){
    
   store.commit('titlechange','首页列表')
   // this.title=store.state.title;
    
     //console.log(util.store.getItem('_user_').username)
  },
  computed: {
    count () {
      return store.state.title
    },
    haha (){
    return store.state.isLogin
    },
    heihei (){
     return store.state.myLogin
    },
    xixi (){
     let username=JSON.parse(store.state.myName)
     return username.username
    },
    mylogin (){
      let user = util.store.getItem('_user_')||{}
      console.log(111)
      console.log(user)
      if(user!=null){
        store.commit('isLoginchange',false)
        store.commit('myLoginchange',true)
        let username=JSON.parse(store.state.myName)
        return username.username
        
      }else{
        store.commit('isLoginchange',true)
        store.commit('myLoginchange',false)
        return  222
      }

    }

  }
}
</script>

<style>
html,body{padding: 0;margin: 0}
a{text-decoration: none;}

</style>

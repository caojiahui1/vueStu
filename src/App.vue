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
         <mu-list-item v-if="heihei"><router-link to="/login">{{xixi}}</router-link></mu-list-item>
        <mu-list-item  ><router-link to="/">首页</router-link></mu-list-item>
        <mu-list-item title="资本视野"/>
        <mu-list-item title="资本需求"/>
        <mu-list-item title="老股转让"/>
        <mu-list-item  @click.native="open = false" title="关闭"/>
      </mu-list>
    </mu-drawer>

    <router-view>
    </router-view>
    
  </div>
</template>

<script>
import store from './vuex'
export default {
  name: 'app',
    data () {
    return {
      open: false,
      docked: true,
      ic:'menu',
      title:'123'
      
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  },
  created :function(){
    
   store.commit('titlechange','首页列表')
    this.title=store.state.title;
    
     console.log(util.store.getItem('_user_').username)
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
     return store.state.myName
    }

  }
}
</script>

<style>
html,body{padding: 0;margin: 0}
a{text-decoration: none;}

</style>

<template>
  <div id="app"> 

<mu-appbar  style="text-align: center;position: fixed;top: 0;">
  <mu-icon-button  slot="left"  icon="menu" style="position: absolute;left:0;" label="undocked drawer" @click="toggle(true)"/>
  {{title}}
</mu-appbar>
<mu-appbar title="Title" style="text-align: center;visibility: hidden">

</mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="toggle()">
        <mu-list-item  ><router-link to="/register">登录/注册</router-link></mu-list-item>
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
export default {
  name: 'app',
    data () {
    return {
      open: false,
      docked: true,
      ic:'menu',
      title:"首页"
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>

<style>
html,body{padding: 0;margin: 0}
a{text-decoration: none;}

</style>

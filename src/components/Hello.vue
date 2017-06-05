<template>
  <div>
    <h1>{{ id }}</h1>

    
        <router-link to="/Hello2">跳到hello2</router-link>
    
      <mt-button type="default" v-text="btnMsg" @click="plus">default</mt-button>
      <mt-button type="primary">primary</mt-button>
      <mt-button type="danger">danger</mt-button>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      btnMsg:'确认'
    }
  },
   created(){
     this.id = this.$route.query.id;
     console.log(this.id)
        },
  methods : {
    plus: function () {
      alert(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

ul {
  list-style-type: none;
  padding: 0;
}



a {
  color: #42b983;
}
</style>

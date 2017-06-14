<template>
  <div class="myBox" style="padding:10px;">

    
    <h2>{{newsList.title}}</h2>

    <div v-html="newsList.content"></div>

    <div>相关评论({{pinglist.length}})</div>
    <div style="margin: 20px 0;"><input type="text"  style="height:30px;" v-model='iptVal' /><mt-button type="primary" @click='addList'>primary</mt-button></div>

    <div v-for="item in pinglist">{{item}}</div>
      <router-link to="/">跳到hello2</router-link>
      <mt-button type="default" v-text="btnMsg" @click="plus">default</mt-button>
      <mt-button type="primary">primary</mt-button>
      <mt-button type="danger">danger</mt-button>
    </div>
</template>

<script>
import store from '../../../vuex'
import router from '../../../router'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      btnMsg:'确认',
      newsList:'',
      myPing:1,
      pinglist:['嘎哈呢','咋的了'],
      iptVal:'',
      title:''
    }
    
  },
   created(){
     this.id = this.$route.query.id;
     console.log(this.id)
         var that=this;
    var url='/api/remote/cms/findNewsById?id='+this.id
      this.$http.get(url).then(function(data){
           // var jsonObject = data;
           // console.log(jsonObject)
           that.newsList=data.body.body;
           console.log(that.newsList)
                },function(response){
                    console.info(response);
                    console.log(222)
                })
        store.commit('increment')

        store.commit('titlechange','详情')
         this.title=store.state.title;
         console.log(this.title)

        },
  methods : {
    plus: function () {
      alert(2)
    },
    addList : function (){
      var that=this
      if(that.iptVal!=''){
 that.pinglist.push(that.iptVal)
      that.iptVal=''
      }
     
    }
  },
  computed: {
    count () {
      return store.state.title
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
.myBox img{width: 100%;}
p img{float: left;}
a {
  color: #42b983;
}
</style>
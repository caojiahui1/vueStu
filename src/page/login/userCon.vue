<template>
  <div class="myBox" style="padding:10px;">
   <h2 style="text-align: center;font-size: 26px;">个人信息</h2>
   <mu-row gutter>
    <mu-col width="30" tablet="50" desktop="33"><img :src=headImage /></mu-col>
     <mu-col width="70" tablet="50" desktop="33">
        <mu-col width="100" tablet="50" desktop="33">{{phone}}</mu-col>
        <mu-col width="100" tablet="50" desktop="33">{{username}}</mu-col>
        <mu-col width="100" tablet="50" desktop="33">{{company}}</mu-col>
     </mu-col>
   </mu-row>
  </div>
</template>

<script>
import store from '../../vuex'
import router from '../../router'
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
      username:'',
      phone:'',
      company:'',
      headImage:''
    }
    
  },
  created(){
    let that=this;
    store.commit('titlechange','个人信息')  
    let user = util.store.getItem('_user_')||{}
      if(user===null){
         that.$router.push({path:'/'})
      }else{
      user = JSON.parse(user)
      that.username=user.username;
      that.phone=user.phone;
      that.company=user.company;
      that.headImage=user.headImage;
      }
     
        },
  methods : {
 
  }
}
</script>

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
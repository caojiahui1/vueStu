<template>
  <div class="myBox" style="padding:10px;">
    <h2 style="text-align: center;font-size: 26px;">注册</h2>
  <mu-text-field label="账号" hintText="请输入账号" v-model='username' labelFloat fullWidth/><br/>
  <mu-text-field label="密码" hintText="请输入密码" v-model='password' type="password" labelFloat fullWidth/><br/>
  <mu-text-field label="确认密码" hintText="请再次输入密码" v-model='password' type="password" labelFloat fullWidth/><br/>

      <mu-raised-button @click='changeRouter' label="提交" class="demo-raised-button" primary fullWidth/>


  
  <mu-raised-button to='login' label="登录" class="demo-raised-button" secondary fullWidth/>
    </div>
</template>

<script>
import store from '../../vuex'
import router from '../../router'
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
     
      value: '默认文字',
      username:'',
      password:'',
      username2:'',
      password2:''
    }
    
  },
   created(){
     let that=this;
     this.id = this.$route.query.id;
     console.log(this.id)
      store.commit('titlechange','登录/注册')   
        },
  methods : {
 
    addList : function (){
      var that=this
     
    },
    changeRouter : function(){
     //this.$router.push({path:'/'})
     //this.username2=hex_md5(this.uesename)



    var that=this;
    var timestamp = util.timeStamp();
    var sign  = hex_md5(that.username+'|'+hex_md5(that.password)+'|'+timestamp);
    var pwd=hex_md5(that.password);
    var phone=that.username;
    console.log(phone)
    var url='/api/remote/h5User/login?phone='+phone+'&pwd='+pwd+'&sign='+sign+'&timestamp='+timestamp
      console.log(url)
      this.$http.get(url).then(function(data){
            if(data.status==200){
            console.log(data.body.message)
            Indicator.open(data.body.message);
             util.store.setItem('_user_',util.jsonToString(data.body.body));
             that.username2=util.store.getItem('_user_')
              store.commit('isLoginchange',false)
              store.commit('myLoginchange',true)
               store.commit('namechange',that.username2)
               console.log(that.username2.username)
             console.log(that.username2)
              setTimeout(function(){
                       Indicator.close()
                    },1000)
                this.$router.push({path:'/'})
            }
           
                },function(response){
                    console.info(response);
                })
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
.mu-raised-button{margin-top: 20px;}
</style>
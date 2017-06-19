<template>
  <div class="myBox" style="padding:10px;">
    <h2 style="text-align: center;font-size: 26px;">登录</h2>
  <mu-text-field label="账号" hintText="请输入账号" v-model='username' labelFloat fullWidth/><br/>
  <mu-text-field label="密码" hintText="请输入密码" v-model='password' type="password" labelFloat fullWidth/><br/>

      <mu-raised-button @click='changeRouter' label="提交" class="demo-raised-button" primary fullWidth/>


  <mu-raised-button to='register' label="注册" class="demo-raised-button" secondary fullWidth/>
  <mu-raised-button  to='forget' label="忘记密码" class="demo-raised-button" secondary fullWidth/>
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
      password:'',
      username2:'',
      password2:''
    }
    
  },
  created(){
     let that=this;
     this.id = this.$route.query.id;
     //console.log(this.id)
     store.commit('titlechange','登录/注册')   
        },
  methods : {
 
    addList  (){
      let that=this
     
    },
    changeRouter (){
    let that=this;
    let timestamp = util.timeStamp();
    let sign  = hex_md5(that.username+'|'+hex_md5(that.password)+'|'+timestamp);
    let pwd=hex_md5(that.password);
    let phone=that.username;
    let url='/api/remote/h5User/login?phone='+phone+'&pwd='+pwd+'&sign='+sign+'&timestamp='+timestamp
      this.$http.get(url).then(function(data){
            if(data.status==200){
            console.log(data.body.message)
            Indicator.open(data.body.message);
            util.store.setItem('_user_',util.jsonToString(data.body.body));
            that.username2=JSON.parse(util.store.getItem('_user_'))
            store.commit('isLoginchange',false)
            store.commit('myLoginchange',true)
            store.commit('namechange',that.username2.username)
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
<template>
  <div class="myBox" style="padding:10px;">
    <h2 style="text-align: center;font-size: 26px;">注册</h2>
  
    <mu-row gutter>
    
     <mu-col width="100" tablet="50" desktop="33" class="phoneBox">
       <mu-text-field label="手机号" hintText="请输入手机号" v-model='phone' labelFloat fullWidth/>
       <mu-raised-button @click='smsBtn'  class="smsBtn demo-raised-button" primary >{{value}}</mu-raised-button>
     </mu-col>
    
     <mu-col width="100" tablet="50" desktop="33">
        <mu-text-field label="验证码" hintText="请输入验证码" v-model='smscode' type="text" labelFloat fullWidth/><br/>
     </mu-col>

     <mu-col width="100" tablet="50" desktop="33">
        <mu-raised-button @click='submitRegister' label="提交" class="demo-raised-button btnstyle" primary fullWidth/>
     </mu-col>

     <mu-col width="100" tablet="50" desktop="33">
        <mu-raised-button to='login' label="登录" class="demo-raised-button btnstyle" secondary fullWidth/>
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
      phone:'',
      smscode:'',
      value:'获取验证码',
      getSmsStatus:true,
      username2:''
    }
    
  },
   created(){

      store.commit('titlechange','登录/注册')  

        },
  methods : {

    smsBtn : function(){

      let that=this
      if(that.getSmsStatus==false){

        Indicator.open('请不要重复获取',1000)
        setTimeout(function(){Indicator.close()},1000)
        return false

      }

      that.value=60;
      that.getSmsStatus=false
      let timer= setInterval(function(){

        that.value--
        if(that.value==0){

            clearInterval(timer);
            that.value='再次获取'
            that.getSmsStatus=true

        }
      },100);
      this.smsAjax()

    },
    smsAjax (){
     
    let that=this;
    let timestamp = util.timeStamp();
    let sign  = this.getSign(that.phone,"register")
    let smscode=hex_md5(that.smscode);
    let phone=that.phone;
    let url='/api/remote/h5User/getSmsCode?phone='+phone+'&type=register'+'&sign='+sign
      this.$http.get(url).then(function(data){
            if(data.status==200){

             Indicator.open(data.body.message);
             util.store.setItem('_user_',util.jsonToString(data.body.body));

              setTimeout(function(){
                       Indicator.close()
                    },1000)
            }
           
                },function(response){
                    console.info(response);
                })
    },
   getSign : function(phone,type){
    let strs="phone="+phone+"&type="+type+"pctqpc5yf5zh79pLoI5KrhkFnhdv0EL";
    let sign=hex_md5(strs);
    return sign;
    },
    submitRegister:function(){

    let that = this;
    let url='/api/remote/h5User/regist?phone='+that.phone+'&code='+that.smscode
    this.$http.get(url).then(function(data){
            if(data.status==200){
              
            Indicator.open(data.body.message);
            util.store.setItem('_user_',util.jsonToString(data.body.body));
            that.username2=util.store.getItem('_user_')
              store.commit('isLoginchange',false)
              store.commit('myLoginchange',true)
              store.commit('namechange',that.username2)
              setTimeout(function(){

                       Indicator.close()

                    },1000)
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
.btnstyle{margin-top: 20px;}
.smsBtn{font-size: 12px;position: absolute;right: 0;top:20%;}
.mu-raised-button-label{padding: 0;}
.phoneBox{position: relative;}
</style>
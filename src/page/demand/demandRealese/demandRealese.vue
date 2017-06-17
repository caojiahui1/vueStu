
  <template> 
   <div class="myBox" style="padding:10px;"> 
 <mu-row>
 <mu-col width="30" tablet="50" desktop="33" >
  
 </mu-col> 
 </mu-row>
    <h2></h2> 
    <mu-row> 
     <mu-col style="height:30px;line-height: 30px;display:flex;flex-direction:row">
      浏览:
     </mu-col> 
    </mu-row> 
    <mu-row style="color:red;font-size: 18px;margin: 10px 0;font-weight: 600;">
     详细信息
    </mu-row> 
    <div style="margin-bottom: 30px;" ></div> 

    <mu-row style="color:red;font-size: 18px;margin: 10px 0;font-weight: 600;">
     联系方式
    </mu-row>
    <mu-row style='margin:20px 0;'>
     <mu-col width="70" tablet="50" desktop="33">
       <mu-col width="100" tablet="50" desktop="33">联系人：</mu-col>
       <mu-col width="100" tablet="50" desktop="33">手机号：</mu-col>
     </mu-col>
     <mu-col width="30" tablet="50" desktop="33">
      <mt-button type="danger" style="font-size: 14px">
     联系方式
     </mt-button>
     </mu-col>
    </mu-row>



 
     <mu-toast v-if="toast" message="评论成功" @close="hideToast"/>
   </div> 
  </template> 
  <script>
import store from '../../../vuex'
import router from '../../../router'
export default {
  data () {
    return {
     
      uuid:'',
      totalCount:'',
      snackbar: false,
      toast: false

    }
    
  },
   created(){
    var that=this;
    store.commit('increment')
    store.commit('titlechange','免费发布需求')
        },
  methods : {
    showToast () {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    plus: function () {
      alert(2)
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
.redSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid red;padding:5px;color: red;text-align: center;}
    .blueSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid blue;padding:5px;color:blue;text-align: center;}
.pingListStyle{background: #e3e3e3;padding: 5px;margin-top:10px;border-radius: 5px;}
</style>

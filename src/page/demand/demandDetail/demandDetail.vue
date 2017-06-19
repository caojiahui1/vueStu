
  <template> 
   <div class="myBox" style="padding:10px;"> 
 <mu-row>
 <mu-col width="30" tablet="50" desktop="33" :class="newsList.supplyDemandString==='求'?'redSty':'blueSty' ">
   {{newsList.typeString}}
 </mu-col> 
 </mu-row>
    <h2>{{newsList.title}}</h2> 
    <mu-row> 
     <mu-col style="height:30px;line-height: 30px;display:flex;flex-direction:row">
      浏览:{{newsList.pv}}
     </mu-col> 
    </mu-row> 
    <mu-row style="color:red;font-size: 18px;margin: 10px 0;font-weight: 600;">
     详细信息
    </mu-row> 
    <div style="margin-bottom: 30px;" v-html="newsList.content"></div> 

    <mu-row style="color:red;font-size: 18px;margin: 10px 0;font-weight: 600;">
     联系方式
    </mu-row>
    <mu-row style='margin:20px 0;'>
     <mu-col width="70" tablet="50" desktop="33">
       <mu-col width="100" tablet="50" desktop="33">联系人：{{newsList.nameString}}</mu-col>
       <mu-col width="100" tablet="50" desktop="33">手机号：{{newsList.phoneString}}</mu-col>
     </mu-col>
     <mu-col width="30" tablet="50" desktop="33">
      <mt-button type="danger" style="font-size: 14px">
     联系方式
     </mt-button>
     </mu-col>
    </mu-row>



    <div>
     相关评论({{totalCount}})
    </div> 
    <div style="margin: 10px 0;">
     <input type="text" style="height:30px;" v-model="iptVal" />
     <mt-button type="primary" @click="addList">
      评论
     </mt-button>
    </div> 
    <div v-for="item in pinglist">
      <mu-row class="pingListStyle">
        <mu-col width="50">{{item.phoneString}}</mu-col>
        <mu-col width="50">{{item.dateString}}{{item.timeString}}</mu-col>
        <mu-col width="20"></mu-col>
        <mu-col width="80">{{item.content}}</mu-col>
      </mu-row>
    </div> 
     <mu-toast v-if="toast" message="评论成功" @close="hideToast"/>
   </div> 
  </template> 
  <script>
import store from '../../../vuex'

export default {
  data () {
    return {

      btnMsg:'确认',
      newsList:'',
      myPing:1,
      pinglist:['嘎哈呢','咋的了'],
      iptVal:'',
      title:'',
      pingPageNum:1,
      uuid:'',
      totalCount:'',
      snackbar: false,
      toast: false

    }
    
  },
   created(){

    let that=this;
    this.id = this.$route.query.demandId;
    let user = util.store.getItem('_user_')
    console.log(user)
    if(user!==null){
    user = JSON.parse(user)
    console.log(user.uuid)
    that.uuid=user.uuid
    }
    
    this.getDetail();
    this.getPingList();
    store.commit('increment')
    store.commit('titlechange','详情')
    this.title=store.state.title;

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
    addList : function (){

      let that=this;
      let url='/api/remote/h5User/isLogin?uuid='+that.uuid; 
      this.$http.get(url).then(function(data){
        if(that.iptVal!=''){
        let url='/api/remote/cms/doCommentsing?objId='+that.id+'&type=1&content='+that.iptVal+'&uuid='+that.uuid;
          this.$http.get(url).then(function(data){
          
           that.showToast()
           that.getPingList()

                },function(response){
                    console.info(response);
                })
         that.iptVal=''
      }

                },function(response){
                    console.info(response);
                })
     
    },
    getDetail:function(){

      let that=this;
      let url='/api/remote/appDemand/getDemandInfo?demandId='+this.id
      this.$http.get(url).then(function(data){
       
           that.newsList=data.body.body;
                },function(response){

                    console.info(response);

                })

        store.commit('increment')
        store.commit('titlechange','详情')
        this.title=store.state.title;
    },
    getPingList:function(){
      let that=this;
      let url='/api/remote/appDemand/findAPPCommentList?pingPageNum='+that.pingPageNum+'&pageSize=5&demandId='+that.id;
      this.$http.get(url).then(function(data){

           that.pinglist=data.body.body.list;
           that.totalCount=data.body.body.totalCount

                },function(response){

                    console.info(response);

                })
       
    }
  },
  computed: {

    count () {
      return store.state.title
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
.redSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid red;padding:5px;color: red;text-align: center;}
    .blueSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid blue;padding:5px;color:blue;text-align: center;}
.pingListStyle{background: #e3e3e3;padding: 5px;margin-top:10px;border-radius: 5px;}
</style>

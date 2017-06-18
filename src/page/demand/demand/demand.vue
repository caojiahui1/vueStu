<template> 
   <div class="hello"> 

    <mu-row gutter="" style="margin-top: 10px;margin-bottom: 10px;"> 

     <mu-col width="5" tablet="50" desktop="33"> 
     </mu-col> 

     <mu-col width="30" tablet="50" desktop="33"> 
      <select class="selSty" @change="selectClick()" v-model="demandTypeId"> <option :value="0">请选择</option> <option v-for="item in typeList" :value="item.id">{{item.name}}</option> </select> 
     </mu-col> 

     <mu-col width="1" tablet="50" desktop="33"> 
     </mu-col> 

     <mu-col width="30" tablet="50" desktop="33"> 
      <select class="selSty" @change="selectClick()" v-model="supplyDemandType"> <option v-for="item in list" :value="item.id">{{item.name}}</option> </select> 
     </mu-col> 

     <mu-col width="30" tablet="50" desktop="33"> 
      <mu-raised-button @click="realese()" class="smsBtn demo-raised-button" >
       免费发布需求
      </mu-raised-button> 
     </mu-col> 

    </mu-row> 

    <div style="background:#f2f2f2"> 

     <mu-row v-for="item in demandList" @click.native="plus(item.demandId)" gutter="" style="height:80px;min-height: 80px;margin-top: 10px;margin-bottom: 10px;padding:10px;padding-left:0;background:#fff;"> 

      <mu-col width="40" tablet="50" desktop="33" :class="item.supplyDemandType== 1 ? 'redSty':'blueSty' ">
        {{item.demandTypeString}} 
      </mu-col> 

      <mu-col width="15" tablet="50" desktop="33" style="height: 60px;line-height: 60px;text-align: center;"> 
       <mu-badge :content="item.supplyDemandString" circle="" secondary=""> 
       </mu-badge> 
      </mu-col> 

      <mu-col width="50" tablet="50" desktop="33" class="mySty"> 
       <mu-col width="100" tablet="50" desktop="33">
         {{item.title}} 
       </mu-col> 
       <mu-col width="100" tablet="50" desktop="33">
         {{item.pv}} {{item.dateString}} 
       </mu-col> 
      </mu-col> 

     </mu-row> 

    </div> 

    <div style="text-align: center;width:100%;" v-if="btnClose"> 
     <mt-button type="danger" @click="listplus">
      加载更多
     </mt-button> 
    </div> 

   </div> 
</template> 
<script>
import { Swipe, SwipeItem ,InfiniteScroll ,loading} from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../../../vuex';
import router from '../../../router'
export default {

  name: 'hello2',
  data () {
    return {

      selected:0,
      newsList:[],
      pageNum:1,
      tempArr:[],
      btnClose:true,
      supplyDemandType:0,//供求类型 0 全部 1供 2求
      demandTypeId:0,//需求类型id
      list: [{name:'全部',id:0}, {name:'求',id:1}, {name:'供',id:2}],
      typeList:[],//需求类型列表
      demandList:[]  //资本需求列表

    }
  },
  
   methods : {

    realese(){
      router.push({'path':'demandRealese'})
    },
    selectClick:function(event){

      let that=this;
      that.pageNum=1
       let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
          this.$http.get(listUrl).then(function(data){

          that.demandList=data.body.body.list

                },function(response){

                })
    },
    selectClick2:function(event){

      let that=this;
      that.pageNum=1
      let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
           this.$http.get(listUrl).then(function(data){
           that.demandList=data.body.body.list
          
                },function(response){

                })

    },
    plus: function (eve) {

      router.push({path: '/demandDetail', query: {demandId: eve}});

    },
   
   listplus: function () {

       let that=this;
       Indicator.open('加载中...');
       that.btnClose=false;
       that.demandList =  that.demandList.concat(that.tempArr);
       that.tempArr=[];

      //start
      that.pageNum++;
      let url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){

            that.tempArr=data.body.body.list;
            Indicator.close();
            that.btnClose=true;
                },function(response){

                })
//end
      }
   },
   created(){

    store.commit('titlechange','资本需求') 
    Indicator.open('加载中...');
      let that=this;
      let url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           that.demandList=data.body.body.list;
           Indicator.close();
//start
           that.pageNum++;
      let url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){

           that.tempArr=data.body.body.list;

                },function(response){
                    //console.info(response);
                })
//end
          },function(response){
              //console.info(response);
          })


//类型数据 remote/appDemand/findAPPDemandList
       let typeUrl='/api/remote/appDemand/getDemandTypeList';
          this.$http.get(typeUrl).then(function(data){

          let tempList=data.body.body.queryDemandTypeList
          that.typeList=tempList

                },function(response){
                    //console.info(response);
                })

 

        let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
              this.$http.get(listUrl).then(function(data){

              that.demandList=data.body.body.list
                },function(response){

                    //console.info(response);
                })

     }

}
</script> 
<style scoped="">
.hide{display: none;}
ul{padding: 0;}
li{list-style: none;height: 80px;text-align: center;color: #666;border: 1px solid #e3e3e3;border-radius: 5px;background: #e3e3e3;margin-top: 10px;}
.imgSize{width:100%;height:100%;}
a{overflow: hidden;}
.selSty{
    width: 100%;
    height: 30px;
    line-height: 30px;}
    .redSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid red;padding:5px;border-left: 0;}
    .blueSty{height: 40px;line-height: 25px;margin-top: 10px;border-radius: 10px 0 10px 0px;border:3px solid blue;padding:5px;border-left: 0;}
    .mySty{    display: flex;3
    height: 100%;
    flex-direction: column;
    justify-content: space-around;}

    .mu-badge{background-color: #fff!important;}
    .gongsty{
      background: #7e57c2;
      border-radius: 50%;
    }
    .qiusty{
      background: #ff4081;
      border-radius: 50%;
    }
</style>

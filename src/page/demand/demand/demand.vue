<template>
  <div class="hello">
    



  
<mu-row gutter style="margin-top: 10px;margin-bottom: 10px;">
    
<mu-col width="5" tablet="50" desktop="33" >
  
  </mu-col>


  <mu-col width="30" tablet="50" desktop="33" >
    <select class="selSty" @change='selectClick()' v-model="demandTypeId">
     <option :value="0">请选择</option>
      <option v-for="item in typeList" :value="item.id">{{item.name}}</option>
    </select>
  </mu-col>
{{demandTypeId}}
<mu-col width="1" tablet="50" desktop="33" >

  </mu-col>


  <mu-col width="30" tablet="50" desktop="33" >
    <select class="selSty"  @change='selectClick()' v-model="supplyDemandType">

      <option v-for="item in list" :value="item.id">{{item.name}}</option>
    </select>
  </mu-col>

<mu-col width="30" tablet="50" desktop="33" >
  <mu-raised-button @click=''  class="smsBtn demo-raised-button" fullWidth>免费发布需求</mu-raised-button>
  </mu-col>

    </mu-row>
   

  <ul>
    <li v-for="item in demandList"  style="display:flex;padding:10px 10px;">
      <!-- <img :src="item.image_url" style="height:100%;width: 20%;"/> -->
      <div style="display: flex; flex-direction:column;justify-content: flex-start;width:80%;">
       <router-link :to='{path: "newsDetail", query: {id: item.demandId}}'  >{{item.title.substring(0,15)}}...</router-link>
      </div>
    </li>
</ul>
<div style="text-align: center;width:100%;" v-if="btnClose">
  <mt-button type="danger" @click='listplus'>加载更多</mt-button>
</div>
</div>
</template>

<script>
import { Swipe, SwipeItem ,InfiniteScroll ,loading} from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../../../vuex'
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
    selectClick:function(event){
      let that=this;
               let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
              this.$http.get(listUrl).then(function(data){
           that.demandList=data.body.body.list
          
          // console.log(that.demandList[0].title)
                },function(response){
                    //console.info(response);
                })
    },
        selectClick2:function(event){
      let that=this;
               let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
              this.$http.get(listUrl).then(function(data){
           that.demandList=data.body.body.list
          
          // console.log(that.demandList[0].title)
                },function(response){
                    //console.info(response);
                })
    },
    plus: function () {
      router.go({name: '/', params: {userId: 1}});
    },
   
   listplus: function () {
       var that=this;
       Indicator.open('加载中...');
       that.btnClose=false;
       //console.log(that.tempArr[0])
       that.demandList =  that.demandList.concat(that.tempArr);
       that.tempArr=[];

      //start
      that.pageNum++;
      var url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
            that.tempArr=data.body.body.list;
            Indicator.close();
             that.btnClose=true;
                },function(response){
                   // console.info(response);
                })
//end
      }
   },
   created :function(){
    store.commit('titlechange','资本需求') 
      Indicator.open('加载中...');
      let that=this;
      let url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           that.demandList=data.body.body.list;
          // console.log(that.newsList)
           Indicator.close();
//start
           that.pageNum++;
      let url='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           //console.log(data.body.body.list)
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

 //列表数据
//  dateString
// :
// "2017-05-15"
// demandId
// :
// 484
// demandTypeId
// :
// 8
// demandTypeString
// :
// "收购并购"
// pv
// :
// 752
// supplyDemandString
// :
// "求"
// supplyDemandType
// :
// 1
// title
// :
// "【1.6亿资金投资】有明确退出途径的文化科技类新三板公司"

        let listUrl='/api/remote/appDemand/findAPPDemandList?demandTypeId='+that.demandTypeId+'&supplyDemandType='+that.supplyDemandType+'&pageNum='+that.pageNum
              this.$http.get(listUrl).then(function(data){
           that.demandList=data.body.body.list
          
          console.log(that.demandList[0].title)
                },function(response){
                    //console.info(response);
                })


     }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{display: none;}
ul{padding: 0;}
li{list-style: none;height: 80px;text-align: center;color: #666;border: 1px solid #e3e3e3;border-radius: 5px;background: #e3e3e3;margin-top: 10px;}
.imgSize{width:100%;height:100%;}
a{overflow: hidden;}
.selSty{
    width: 100%;
    height: 30px;
    line-height: 30px;}
</style>
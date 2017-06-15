<template>
  <div class="hello">
    



  
<mu-row gutter style="margin-top: 10px;margin-bottom: 10px;">
    
<mu-col width="5" tablet="50" desktop="33" >

  </mu-col>


  <mu-col width="40" tablet="50" desktop="33" >
    <mu-select-field @change='selectClick()'  v-model="game1"  :labelFocusClass="['label-foucs']" :maxHeight="300"  fullWidth>
    <mu-menu-item    v-for="text,index in typeList"   :id="text.id" :title='text.name' :value='text.name'  />
  </mu-select-field>
  </mu-col>

<mu-col width="5" tablet="50" desktop="33" >

  </mu-col>


  <mu-col width="20" tablet="50" desktop="33" >
    <mu-select-field v-model="game2" :labelFocusClass="['label-foucs']"  fullWidth>
    <mu-menu-item v-for="text,index in list" :key="index" :id="text.id" :value="index.name" :title="text.name" />
  </mu-select-field>
  </mu-col>

<mu-col width="30" tablet="50" desktop="33" >
  <mu-raised-button @click=''  class="smsBtn demo-raised-button" fullWidth>免费发布需求</mu-raised-button>
  </mu-col>

    </mu-row>
   

  <ul>
    <li v-for="item in newsList"  style="display:flex;padding:10px 10px;">
      <img :src="item.image_url" style="height:100%;width: 20%;"/>
      <div style="display: flex; flex-direction:column;justify-content: flex-start;width:80%;">
       <router-link :to='{path: "newsDetail", query: {id: item.id}}'  >{{item.title.substring(0,15)}}...</router-link>
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
      newsList:[],
      pageNum:1,
      tempArr:[],
      btnClose:true,
      game1: 0,
      game2: 0,
      list: [{name:'全部',id:0}, {name:'供',id:1}, {name:'求',id:2}],
      typeList:[]
    }
  },
  
   methods : {
    selectClick:function(){
        
    },
    plus: function () {
      router.go({name: '/', params: {userId: 1}});
    },
   
   listplus: function () {
       var that=this;
       Indicator.open('加载中...');
       that.btnClose=false;
       //console.log(that.tempArr[0])
       that.newsList =  that.newsList.concat(that.tempArr);
       that.tempArr=[];

      //start
      that.pageNum++;
      var url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
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
      let url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           that.newsList=data.body.body.list;
          // console.log(that.newsList)
           Indicator.close();
//start
           that.pageNum++;
      let url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
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


//类型数据
       let typeUrl='/api/remote/appDemand/getDemandTypeList';
              this.$http.get(typeUrl).then(function(data){
                
          // console.log(data.body.body.queryDemandTypeList)
           let tempList=data.body.body.queryDemandTypeList
          //that.typeList=that.typeList.concat(tempList);
          that.typeList=tempList
          // console.log('哈哈哈')
          // console.log(tempList)
          // console.log(that.typeList)
            // for(var i=0;i<tempList.length;i++){
            //   that.typeList.push(tempList[i].name);
            //   console.log(tempList[i].name)
            // }
           
                },function(response){
                    //console.info(response);
                })
     
       
        console.log(that.game1)


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
</style>
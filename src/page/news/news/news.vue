<template>
  <div class="hello">


   <router-link to="/" class="hide">跳到hello1</router-link>
   <mt-swipe :auto="4000" style="height: 150px;">
    <mt-swipe-item  v-for="item in sw">
      <img :src="item.color"  class="imgSize"/>
    </mt-swipe-item>
   </mt-swipe>
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
      sw: [{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=100&h=100&img.JPEG',val:1},{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=179&h=119&img.JPEG',val:2},{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=179&h=119&img.JPEG',val:3}],
      newsList:[],
      pageNum:1,
      tempArr:[],
      btnClose:true
    }
  },
  
   methods : {
    plus: function () {
      router.go({name: '/', params: {userId: 1}});
    },
   
   listplus: function () {
       var that=this;
       Indicator.open('加载中...');
       that.btnClose=false;
       console.log(that.tempArr[0])
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
                    console.info(response);
                })
//end
      }
   },
   created :function(){
      Indicator.open('加载中...');
      var that=this;
      var url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           that.newsList=data.body.body.list;
           console.log(that.newsList)
           Indicator.close();
//start
           that.pageNum++;
      var url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           console.log(data.body.body.list)
           that.tempArr=data.body.body.list;
                },function(response){
                    console.info(response);
                })
//end
          },function(response){
              console.info(response);
          })

      store.commit('titlechange','首页列表')
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
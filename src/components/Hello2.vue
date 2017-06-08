<template>
  <div class="hello">
    
    <router-link to="/" class="hide">跳到hello1</router-link>
 
   <mt-swipe :auto="4000" style="height: 150px;">
  <mt-swipe-item  v-for="item in sw"><img :src="item.color"  class="imgSize"/></mt-swipe-item>
  
</mt-swipe>
<ul
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <li v-for="item in newsList"  style="display:flex;padding:10px 10px;">
  <img :src="item.image_url" style="height:100%;width: 20%;"/>
  <div style="display: flex; flex-direction:column;justify-content: flex-start">
  <router-link :to='{path: "/", query: {id: item.id}}'  >{{item.title.substring(0,15)}}...</router-link>
  
  </div>
  </li>
  
</ul>
<mt-button type="danger" @click='listplus'>加载更多</mt-button>
  </div>
</template>

<script>
import { Swipe, SwipeItem ,InfiniteScroll ,loading} from 'mint-ui';
export default {
  name: 'hello2',
  data () {
    return {
      msg: '黑额呵呵呵呵呵呵呵呵',
      sw: [{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=100&h=100&img.JPEG',val:1},{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=179&h=119&img.JPEG',val:2},{color:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1312092207,1376369244&fm=80&w=179&h=119&img.JPEG',val:3}],
      newsList:[],
      pageNum:1
     
    }
  },
  
   methods : {
    plus: function () {
      router.go({name: '/', params: {userId: 1}});
    },
    loadMore() {
  // this.loading = true;
  // setTimeout(() => {
  //   let last = this.newsList[this.list.length - 1];


  //   var url='/api/remote/cms/findNewsPage?pageNum=1'
  //     this.$http.get(url).then(function(data){
  //          // var jsonObject = data;
  //          // console.log(jsonObject)
  //          that.newsList=data.body.body.list;
  //          console.log(that.newsList)
  //               },function(response){
  //                   console.info(response);
  //                   console.log(222)
  //               })
    
  //   // for (let i = 1; i <= 10; i++) {
  //   //   this.list.push(last + i);
  //   // }
  //   this.loading = false;
  // }, 2500);
},
 listplus: function () {
      // `this` points to the vm instance
       var that=this;
       that.pageNum++;
    var url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           // var jsonObject = data;
           // console.log(jsonObject)
           console.log(data.body.body.list)
           var temp=data.body.body.list;
           for(var i=0;i<temp.length;i++){
            that.newsList.push(data.body.body.list[i]);
           }
          
           console.log(that.newsList)
                },function(response){
                    console.info(response);
                    console.log(222)
                })
     
    }
  },
  created :function(){
    var that=this;
    var url='/api/remote/cms/findNewsPage?pageNum='+that.pageNum
      this.$http.get(url).then(function(data){
           // var jsonObject = data;
           // console.log(jsonObject)
           that.newsList=data.body.body.list;
           console.log(that.newsList)
                },function(response){
                    console.info(response);
                    console.log(222)
                })
  },
  computed: {
    // a computed getter
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{display: none;}
ul{padding: 0;}
li{list-style: none;height: 50px;line-height: 50px;text-align: center;color: #666;border: 1px solid #e3e3e3;border-radius: 5px;background: yellow;margin-top: 10px;}
.imgSize{width:100%;height:100%;}
a{overflow: hidden;}
</style>

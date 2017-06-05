<template>
  <div class="hello">
    
    <router-link to="/" class="hide">跳到hello1</router-link>
 
   <mt-swipe :auto="4000" style="height: 150px;">
  <mt-swipe-item  v-for="item in sw"><img :src="item.color" /></mt-swipe-item>
  
</mt-swipe>
<ul
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <li v-for="item in list"  ><router-link :to='{path: "/", query: {id: item}}' >跳到hello1</router-link></li>
</ul>
  </div>
</template>

<script>
import { Swipe, SwipeItem ,InfiniteScroll } from 'mint-ui';
export default {
  name: 'hello2',
  data () {
    return {
      msg: '黑额呵呵呵呵呵呵呵呵',
      list:[1,2,3,4,5,6,7],
      sw: [{color:'./logo.png',val:1},{color:'./logo.png',val:2},{color:'./logo.png',val:3}],
      id:1,
    }
  },
  
   methods : {
    plus: function () {
      router.go({name: '/', params: {userId: 1}});
    },
    loadMore() {
  this.loading = true;
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    this.loading = false;
  }, 2500);
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{display: none;}
ul{padding: 0;}
li{list-style: none;height: 50px;line-height: 50px;text-align: center;color: #666;border: 1px solid #e3e3e3;border-radius: 5px;background: yellow;margin-top: 10px;}
</style>

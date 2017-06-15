import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Hello2 from '@/components/Hello2'
// import login from '@/components/login'
// import userCon from '@/page/login/userCon'

import news from '@/page/news/news/news'
import newsDetail from '@/page/news/newsDetail/newsDetail'
import login from '@/page/login/login'
import userCon from '@/page/login/userCon'
import register from '@/page/register/register'
import forget from '@/page/forget/forget'
import demand from '@/page/demand/demand/demand'

Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Hello',
      component: news
    },
    {
     path: '/newsDetail',
     // name: 'Hello2',
	   component: newsDetail
	  },
     {
     path: '/login',
     // name: 'Hello2',
     component: login
    },
     {
     path: '/userCon',
     // name: 'Hello2',
     component: userCon
    },
     {
     path: '/register',
     // name: 'Hello2',
     component: register
    },
     {
     path: '/forget',
     // name: 'Hello2',
     component: forget
    },
     {
     path: '/demand',
     // name: 'Hello2',
     component: demand
    }
  ]
})

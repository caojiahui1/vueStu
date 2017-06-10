import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hello2 from '@/components/Hello2'
import header from '@/components/header'

Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Hello',
      component: Hello2
    },
    {
     path: '/hello',
     // name: 'Hello2',
	   component: Hello
	  },
    {
     path: '/header',
     // name: 'Hello2',
     component: header
    }
  ]
})

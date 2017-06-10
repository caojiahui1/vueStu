import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hello2 from '@/components/Hello2'
import register from '@/components/register'

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
     path: '/register',
     // name: 'Hello2',
     component: register
    }
  ]
})

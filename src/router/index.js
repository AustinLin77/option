import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/mycomplain'},
    { path: '/main', component: resolve => require(['@/components/main.vue'], resolve),},
      // children:[
        // {path: '/', redirect: '/mycomplain'},
        {path: '/mycomplain',name:"mycomplain", component: resolve => require(['@/components/children/mycomplain.vue'], resolve),
          // children:[
          //   {path: '/', redirect: '/mine'},
          //   {path: '/mine',name:"mine", component: resolve => require(['@/components/children/mine.vue'], resolve)},
          //   {path: '/waitConfirm',name:"waitConfirm", component: resolve => require(['@/components/children/waitConfirm.vue'], resolve)},
          //   {path: '/waitRate',name:"waitRate", component: resolve => require(['@/components/children/waitRate.vue'], resolve)},
          //   {path: '/closed',name:"closed", component: resolve => require(['@/components/children/closed.vue'], resolve)},
          //   {path: '/waitSolve',name:"waitSolve", component: resolve => require(['@/components/children/waitSolve.vue'], resolve)}
          // ]
        },
      //   {path: '/mysalve', name:"mysalve",component: resolve => require(['@/components/children/mysalve.vue'], resolve),},
      // ]

    {path: '/addcomplain',name:"addcomplain", component: resolve => require(['@/components/children/addcomplain.vue'], resolve),},


    {path: '/complainItem', component: resolve => require(['@/components/complainItem.vue'], resolve)},
    {path: '/nodeList', component: resolve => require(['@/components/nodeList.vue'], resolve)},
  ]
})

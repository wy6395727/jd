import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// const Index = resovle => require(['../components/index'], resovle);
const Home = resovle => require(['../components/home'], resovle);
const Step1 = resovle => require(['../components/step1'], resovle);
const Step2 = resovle => require(['../components/step2'], resovle);
const Login = resovle => require(['../components/login'], resovle);


export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/login"
    },
    {
      path: '/login',
      name:'login',
      component: Login
    },

    {
      path: '/home',
      name:"home",
      component: Home
    },
    {
      path: '/step1',
      name:'step1',
      component: Step1
    },
    {
      path: '/step2',
      name:'step2',
      component: Step2
    },

  ]
})

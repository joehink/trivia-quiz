import Vue from 'vue'
import VueRouter from 'vue-router';

import store from './store';

import App from './App.vue'
import FrontPage from './components/FrontPage.vue';
import Categories from './components/Categories.vue';
import Question from './components/Question.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: FrontPage },
    { path: '/categories', component: Categories },
    { path: '/question', component: Question }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

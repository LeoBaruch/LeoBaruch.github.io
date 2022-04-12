import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import App from './App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 5. 创建并挂载根实例
const app = createApp(App);
// 确保 _use_ 路由实例使
// 整个应用支持路由。
app.use(router);

app.mount('#app');

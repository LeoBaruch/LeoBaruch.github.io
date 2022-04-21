import Home from './pages/Home.vue';
import Sort from './pages/Sort.vue';
import PriorityQueue from './pages/PriorityQueue.vue';
import Bst from './pages/Bst.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/sort', component: Sort },
  { path: '/priority-queue', component: PriorityQueue },
  { path: '/bst', component: Bst },
];

export default routes;

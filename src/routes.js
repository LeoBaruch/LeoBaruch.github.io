import Home from './pages/Home.vue';
import Sort from './pages/Sort.vue';
import PriorityQueue from './pages/PriorityQueue.vue';
import Bst from './pages/Bst.vue';
// eslint-disable-next-line camelcase
import tree2_3 from './md/2-3tree.md';
import RedBlackBST from './pages/RedBlackBST.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/sort', component: Sort },
  { path: '/priority-queue', component: PriorityQueue },
  { path: '/bst', component: Bst },
  { path: '/2-3tree', component: tree2_3 },
  { path: '/redBlackBST', component: RedBlackBST },
];

export default routes;

<template>
    <h2>最近文章</h2>
    <ul>
      <li>
        <router-link :to="'/sort'">排序</router-link>
      </li>
      <li>
        <router-link :to="'/priority-queue'">优先队列</router-link>
      </li>
    </ul>
</template>
<script>
export default {
  /* eslint-disable */
  name: 'About',
  data() {
    return {
      aboutMsg: '我是about组件',
    };
  },
};
</script>

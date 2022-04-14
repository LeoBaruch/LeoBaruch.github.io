<template>
  <div class="markdown-body">
    <SortMd />
  </div>
</template>

<script>
import SortMd from '../md/sort.md';
import 'highlight.js/styles/github.css';

export default {
  /* eslint-disable-next-line */
  name: 'Sort',
  components: {
    SortMd,
  },
};
</script>

<style>

</style>

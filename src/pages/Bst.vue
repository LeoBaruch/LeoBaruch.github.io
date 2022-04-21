<template>
  <div class="markdown-body">
    <BstMd />
  </div>
</template>

<script>
import BstMd from '../md/bst.md';
import 'highlight.js/styles/github.css';

export default {
  /* eslint-disable-next-line */
  name: 'Bst',
  components: {
    BstMd,
  },
};
</script>

<style>

</style>

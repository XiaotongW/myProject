<template>
  <q-page class="flex flex-center">
      <img
        :alt="mtgName"
        src="~assets/magic-the-gathering.svg" />
  </q-page>
</template>

<script>
import { mtgName } from '../common/utils/mtgValue';

export default {
  name: 'PageIndex',
  data() {
    return {
      mtgName,
    };
  },
  methods: {
  },
  created() {
  },
};
</script>

<style lang="stylus" scoped>
  img {
    width: 30rem;
    height: 30rem;
  }
</style>

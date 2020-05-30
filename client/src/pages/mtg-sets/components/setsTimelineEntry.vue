<template>
  <q-item>
    <q-item-section>
      <q-avatar :icon="imageCache"></q-avatar>
    </q-item-section>
  </q-item>
</template>

<script>

export default {
  name: 'sets-timeline-entry',
  props: {
    icon: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      imageCache: {},
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    initialize() {
    },
  },
};
</script>

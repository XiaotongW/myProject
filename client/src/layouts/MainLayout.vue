<template>
  <q-layout view="lHH Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen">
        </q-btn>

        <q-toolbar-title>{{ mtgName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>

        <q-item
          clickable
          to="/home"
          @click="leftDrawerOpen = false"
          >
          <q-item-section>
            <q-item-label>{{ 'Main' }}</q-item-label>
            <q-item-label caption>
              {{ '' }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/mtg-sets"
          @click="leftDrawerOpen = false"
          >
          <q-item-section>
            <q-item-label>{{ 'Magic The Gathering Sets' }}</q-item-label>
            <q-item-label caption>
              {{ 'List of all set in Magic The Gathering' }}
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mtgName } from '../common/utils/mtgValue';

export default {
  name: 'MainLayout',

  components: {
  },

  data() {
    return {
      leftDrawerOpen: false,
      mtgName,
      links: [
        {
          title: 'Sets',
          caption: 'List of all set in Magic The Gathering',
          icon: 'school',
          link: 'Sets',
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch('mtgSet/initialize')
      .then(() => this.$store.dispatch('mtgSet/getAllSet'));
  },
};
</script>

<style lang="stylus" scoped>
</style>

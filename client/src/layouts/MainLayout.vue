<template>
  <q-layout view="lHh Lpr lFf">
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

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
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
          to="/sets"
          @click="leftDrawerOpen = false"
          >
          <q-item-section>
            <q-item-label>{{ 'Sets' }}</q-item-label>
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

export default {
  name: 'MainLayout',

  components: {
  },

  data() {
    return {
      leftDrawerOpen: false,
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
};
</script>

<style lang="stylus" scoped>
</style>

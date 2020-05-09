<template>
  <q-page padding>
    <q-timeline v-if="setsLoaded === true" color="primary">

      <q-timeline-entry v-for="(entry, key) in getAllSetsGroup" :key="key">

        <template v-slot:title>
          <q-list>
            <q-item v-for="set in entry" :key="set.code">
                <q-item-section avatar>
                  <q-icon v-if="typeof setImageCache !== 'undefined'"
                    :name="setImageCache[`${set.code}-Common.png`]" />
                </q-item-section>
            </q-item>
          </q-list>
        </template>

        <template v-slot:subtitle>
          {{ key }}
        </template>

      </q-timeline-entry>

    </q-timeline>
    <!-- <div class="table">
      <q-table
        dense
        class="sticky-header-column"
        :loading="setsLoading"
        row-key="code"
        :data="setsList"
        :columns="columns"
        :pagination.sync="pagination"
        :rows-per-page-options="[5, 10, 15, 25, 30, 50, 100, 0]">
      </q-table>

      <q-tr slot="header" slot-scope="props" :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </div> -->
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

const setImageCache = {};

function importAll(r) {
  r.keys().forEach(key => {
    setImageCache[key] = r(key);
  });
}

importAll(require.context('src/assests/set-logo/', true, /\.-Common.png$/));

export default {
  name: 'set-list',
  components: {
  },
  data() {
    return {
      setlist: {},

      columns: [
        {
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type',
          sortable: true,
        },
        {
          name: 'block',
          label: 'Block',
          align: 'left',
          field: 'block',
          sortable: true,
        },
        {
          name: 'code',
          label: 'Code',
          align: 'left',
          field: 'code',
          sortable: true,
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'releaseDate',
          label: 'Release Date',
          align: 'left',
          field: 'releaseDate',
          sortable: true,
        },
        {
          name: 'onlineOnly',
          label: 'Online Only',
          align: 'left',
          field: 'onlineOnly',
          sortable: true,
        },
      ],
    };
  },
  // Before leaving this page, uninitialize the tags store
  // beforeRouteLeave(to, from, next) {
  //   this.unInitialize().then(() => next());
  // },
  created() {
    this.initialize()
      .then(() => this.getAllSet())
      .then(() => {
        const tmp = this.getAllSetsGroup;
        console.dir(tmp);
      });
  },
  computed: {
    ...mapState('set', [
      'initialized',
      'setsList',
      'setsLoaded',
    ]),
    ...mapGetters('set', [
      'getAllSetsGroup',
    ]),
  },
  methods: {
    ...mapActions('set', [
      'initialize',
      'unInitialize',
      'getAllSet',
    ]),
  },
  mounted() {
  },
  watch: {
  },
};
</script>

<style lang="stylus" scoped>

.sticky-header-column {
  max-width: 100%;

  tr:first-child th {
    background-color: $page-container-background;
    position: sticky;
    top: 0;
    // Opacity is important to not display the other rows through the header
    opacity: 1;
    z-index: 1;
  }
}

.q-table__container >>> .q-table__top {
  padding-top: 0;
  padding-bottom: 0;
}
</style>

<template>
  <q-page padding>
    <page-box-container>
      <page-box>
        <div class="column">
          <div v-if="getAllFilterOption.length >= 1" class="row justify-end full-width">
            <q-select
            v-model="selectedOption"
            :options="getAllFilterOption"
            outlined
            multiple
            use-chips
            clearable />
          </div>

          <div class="row">

            <q-timeline v-if="setsLoaded === true" color="primary">

              <q-timeline-entry v-for="(sets, key) in getFilteredMtgSet" :key="key">

                <template v-slot:title>
                  <q-list>
                    <q-item v-for="mtgSet in sets" :key="mtgSet.code">
                        <q-item-section side>
                          <q-avatar v-if="getCacheImg(mtgSet.image, mtg_rarity.common).length >= 1"
                            rounded>
                            <img :src="getCacheImg(mtgSet.image, mtg_rarity.common)" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ mtgSet.name }}</q-item-label>
                          <q-item-label caption>{{ formatSetTypeLabel(mtgSet.type) }}</q-item-label>
                        </q-item-section>
                    </q-item>
                  </q-list>
                </template>

                <template v-slot:subtitle>
                  {{ key }}
                </template>

              </q-timeline-entry>

            </q-timeline>

          </div>

        </div>
      </page-box>
    </page-box-container>
  </q-page>
</template>

<script>
import _ from 'lodash';
import { QSpinnerOval } from 'quasar';
import { mapState } from 'vuex';
import { PageBoxContainer, PageBox } from 'src/common/components/PageBox/index.js';
import { mtgRarity } from '../../common/utils/mtgValue.js';

const mtgSetImageCache = {};
function importAll(r) {
  r.keys().forEach((key) => {
    mtgSetImageCache[key] = r(key);
  });
}
importAll(require.context('src/assets/images/logo/', true, /\.png$/));

export default {
  name: 'mth-set-list',
  components: {
    PageBox,
    PageBoxContainer,
  },
  data() {
    return {
      mtg_rarity: mtgRarity,
      filterOptionValue: [],
      filterOptions: [{
        value: 'all',
        label: this.$t('all'),
      }],

    };
  },
  created() {
  },

  mounted() {
    if (this.setsLoading === true) {
      this.showWaiting();
    }
  },
  computed: {
    ...mapState('mtgSet', [
      'initialized',
      'setsList',
      'setsLoading',
      'setsLoaded',
    ]),

    selectedOption: {
      get() {
        return this.filterOptionValue.length < 1
          ? [this.filterOptions[0]]
          : this.filterOptionValue;
      },
      set(optionSelected) {
        if (optionSelected[optionSelected.length - 1] === this.filterOptions[0]) {
          this.filterOptionValue = [this.filterOptions[0]];
        } else {
          this.filterOptionValue = optionSelected.filter(opt => opt !== this.filterOptions[0]);
        }
      },
    },

    getFilteredMtgSet() {
      if (this.setsLoaded === false
        || Array.isArray(this.getMtgSetWithImg) === false
        || this.getMtgSetWithImg.length < 1) {
        return {};
      }
      const filteredList = this.getMtgSetWithImg
        .filter(({ type }) => (
          this.selectedOption.findIndex(({ value }) => (
            value === this.filterOptions[0].value
            || value === type
          )) >= 0
        ));
      return _(filteredList)
        .orderBy(
          ['releaseDate', 'block', 'type', 'name', 'code', 'onlineOnly'],
          ['desc', 'asc', 'asc', 'asc', 'asc', 'asc'],
        )
        .groupBy('releaseDate')
        .value();
    },

    getMtgSetWithImg() {
      if (this.initialized === false || this.setsLoaded === false) {
        return [];
      }

      if (Array.isArray(this.setsList) === true) {
        return this.setsList
          .reduce((acc, mtgSet) => {
            if (typeof mtgSet === 'undefined' || mtgSet === null) {
              return acc;
            }
            const currentSet = { ...mtgSet };
            if (typeof mtgSet.code === 'string') {
              const code = mtgSet.code.toUpperCase();
              const result = {};
              if (typeof mtgSetImageCache[`./common/${code}-Common.png`] === 'string'
                && mtgSetImageCache[`./common/${code}-Common.png`].length > 700) {
                result.common = mtgSetImageCache[`./common/${code}-Common.png`];
              }
              if (typeof mtgSetImageCache[`./uncommon/${code}-Uncommon.png`] === 'string'
                && mtgSetImageCache[`./uncommon/${code}-Uncommon.png`].length > 700) {
                result.unCommon = mtgSetImageCache[`./uncommon/${code}-Uncommon.png`];
              }
              if (typeof mtgSetImageCache[`./rare/${code}-Rare.png`] === 'string'
                && mtgSetImageCache[`./rare/${code}-Rare.png`].length > 700) {
                result.rare = mtgSetImageCache[`./rare/${code}-Rare.png`];
              }
              if (typeof mtgSetImageCache[`./mythic-rare/${code}-Mythic Rare.png`] === 'string'
                && mtgSetImageCache[`./mythic-rare/${code}-Mythic Rare.png`].length > 700) {
                result.mythicRare = mtgSetImageCache[`./mythic-rare/${code}-Mythic Rare.png`];
              }
              if (Object.entries(result).length >= 1) {
                currentSet.image = result;
              }
              acc.push(currentSet);
            }
            return acc;
          }, []);
      }
      return [];
    },

    getAllFilterOption() {
      if (this.initialized === false || this.setsLoaded === false) {
        return this.selectedOption;
      }
      return _(this.setsList)
        .orderBy(['type'], ['asc'])
        .reduce((acc, mtgSet) => {
          if (typeof mtgSet !== 'undefined') {
            if (typeof mtgSet.type === 'string') {
              if (acc.length === 0 || acc.findIndex(e => e.value === mtgSet.type) === -1) {
                acc.push({
                  value: mtgSet.type,
                  label: this.formatSetTypeLabel(mtgSet.type),
                });
              }
            }
          }
          return acc;
        }, this.filterOptions);
    },
  },
  methods: {
    pageInitialize() {
    },

    /**
     * @param {Object} mtgImage
     * @param {string} rarity
     *                 - common
     *                 - unCommon
     *                 - rare
     *                 - mythicRare
     */
    getCacheImg(mtgImage, rarity) {
      if (typeof mtgImage === 'undefined' || mtgImage === null || Object.entries(mtgImage).length < 1) {
        return '';
      }
      let result;
      switch (rarity) {
        case this.mtg_rarity.common:
          result = mtgImage.common;
          break;
        case this.mtg_rarity.unCommon:
          result = mtgImage.unCommon;
          break;
        case this.mtg_rarity.rare:
          result = mtgImage.rare;
          break;
        case this.mtg_rarity.mythicRare:
          result = mtgImage.mythicRare;
          break;
        default:
          result = '';
      }
      return typeof result === 'string' ? result : '';
    },

    formatSetTypeLabel(label) {
      if (typeof label !== 'string') {
        return '';
      }
      return _.capitalize(label.split('_').join(' '));
    },

    showWaiting() {
      this.$q.loading.show({
        delay: 200,
        spinner: QSpinnerOval,
      });
    },
  },
  watch: {
    setsLoaded: {
      handler() {
        if (this.setsLoading === true) {
          this.showWaiting();
        } else {
          this.$q.loading.hide();
        }
      },
    },
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

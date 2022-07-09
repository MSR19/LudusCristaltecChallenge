<template>
  <v-app>
    <v-main>
      <HeaderSite @SearchSection='SearchSection' @StatisticalSection='StatisticalSection' />
      <SearchPage v-if="SearchSectionBool"/>
      <StatisticalPage v-if="StatisticalSectionBool" />
    </v-main>
  </v-app>
</template>

<script>
import HeaderSite from './components/HeaderSite.vue'

import SearchPage from './components/SearchPage.vue'

import StatisticalPage from './components/StatisticalPage.vue'


export default {
  name: 'App',

  components: {
    HeaderSite,
    SearchPage,
    StatisticalPage
  },

  data: () => ({
    SearchSectionBool: true,
    StatisticalSectionBool: false
  }),
  methods: {
    SearchSection() {
        this.SearchSectionBool = true;
        this.StatisticalSectionBool = false;
    },
    StatisticalSection() {
      this.StatisticalSectionBool = true;
      this.SearchSectionBool = false;
    }
  }
}
</script>

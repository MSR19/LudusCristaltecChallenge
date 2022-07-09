<template>
    <div>
      <v-form @submit='onSubmit'>
        <v-text-field
          v-model="searchResult"
          single-line
        ></v-text-field>
      </v-form>
      <SearchSuggestion @click-btn='sendTag' :tags=tagsRecomendations />
    </div>
</template>


<script>

import SearchSuggestion from './SearchSuggestion.vue'

export default {
    name: "SearchBar",
    data() {
      return { 
        tags: [],
        searchResult: "Search the type of cat you want to see",
        rocomendedTags: Array
      }
    },
    components: {
      SearchSuggestion
    },
    methods: {
      async fetchTags() {
        const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'api/v1/tags')

        return res.json()
      },
      onSubmit(e) {

        e.preventDefault();

        if(this.tags.includes(this.searchResult)) {
            this.$emit('search-result', this.searchResult)
        }
        else {
          this.$emit('subString', this.searchResult)
        }

        this.searchResult = ''
      },
      sendTag(tag) {

        this.searchResult = ''

        this.$emit('click-btn', tag)
      }
    },
    async created() {
      this.tags =  await this.fetchTags()
    },
    computed: {
      tagsRecomendations: {
        get() {
          let data = [];

          if(this.searchResult != "") {
            for (let i = 0; i != this.tags.length; i++) {
              if(this.tags[i].includes(this.searchResult)) 
                data.push( this.tags[i] );
            }
          }

          data = data.slice(0, 4)

          return data;
        }
      }
    }


}
</script>

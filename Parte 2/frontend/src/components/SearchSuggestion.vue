<template>
    <div class="d-flex justify-space-around align-center flex-column flex-sm-row">
    <div  v-for="tag in tags" :key=tag>
      <v-btn @click='sendTag(tag)'>{{tag}}</v-btn>
    </div>
    </div>
</template>


<script>
export default {
    name: "SearchSuggestion",
    props: {
        tags: Array
    },
    methods: {
        sendTag(tag) {
            this.$emit('click-btn', tag)
        }
    }
}
</script>
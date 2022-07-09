<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length=numPages
      @click="onclick"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    name: "PaginationPart",
    data () {
      return {
        page: 1,
      }
    },
    props: {
        numPages: Number,
    },
    methods: {
      onclick() {
        this.$emit('pageNumber', this.page);
      }
    }
  }
</script>
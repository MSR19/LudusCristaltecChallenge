<template>
    <v-row>
        <v-col cols="6" v-for="cat in catPictures" :key="cat.id">
            <v-card>
              <v-img
                :src="'https://cataas.com/cat/' + cat.id"
                max-height="300"
                class="bg-grey-lighten-2"
              ></v-img>

            </v-card>
        </v-col>    
    </v-row>   
</template>

<script>
export default {
    name: "ImagesSection",
    props: {
        catPictures: Array
    },
}
</script>
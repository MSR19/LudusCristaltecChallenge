<template>
    <div>
        <v-row>
            <v-col cols="6">
                <TypeOfCats @setImages='setImagesArray'/>
            </v-col>
            <v-col cols="6">
                <ListQueries @doQuery='doQuery'/>
            </v-col>
        </v-row>
        <ImagesSection :catPictures=arrayOfPage(page) />
        <PaginationPart @pageNumber="changePage" :numPages=numberOfPages />       
    </div>
</template>

<script>

import TypeOfCats from './TypeOfCatsStats.vue'

import ListQueries from './ListQueries.vue'

import ImagesSection from './ImagesSection.vue'

import PaginationPart from './PaginationPart.vue'

export default {
    name: 'StatisticalPage',
    data () {
        return {
            imagesArray: [],
            page: "1"
        }
    },
    components: {
        TypeOfCats,
        ListQueries,
        ImagesSection,
        PaginationPart
    },
    methods: {
        setImagesArray(images) {
            this.page = 1
            this.imagesArray = images;
        },
        changePage(page) {
            this.page = page;
        },
        arrayOfPage(pageNumber) {
            let res = [];
            for (let i = (pageNumber-1)*10; i < this.imagesArray.length && i < (pageNumber-1)*10+10; i++) {
                res.push(this.imagesArray[i])
            }
            return res
        },
        async doQuery(catQuery) {
            const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'api/v1/cats/match?string='+ catQuery)
            const data = await res.json()

            let dataFinal = [];
            let ids = []

            for(let i = 0; i != data.length; i++) {
                for(let j = 0; j != data[i].Content.length; j++) {
                    if(!ids.includes(data[i].Content[j].id)) {
                        dataFinal.push(data[i].Content[j])
                        ids.push(data[i].Content[j].id)
                    }
                }
            }

            this.imagesArray = dataFinal
        }
    },    
    computed: {
        numberOfPages() {
            return Math.ceil(this.imagesArray.length/10);
        }
    },  
}
</script>

<template>
    <div>
    <SearchBar @click-btn='fetchCats' @search-result='fetchCats' @subString='subStringFetch' />
    <SearchSuggestion @click-btn='fetchCats' :tags=tags />
    <ImagesSection :catPictures=arrayOfPage(page)   /> 
    <PaginationPart @pageNumber="changePage" :numPages=numberOfPages />
    </div>
</template>


<script>

import SearchBar from './SearchBar.vue'

import PaginationPart from './PaginationPart.vue'

import ImagesSection from './ImagesSection.vue'

import SearchSuggestion from './SearchSuggestion.vue'

export default {
    name: "SearchPage",
    components: {
        SearchBar,
        ImagesSection,
        PaginationPart,
        SearchSuggestion
    },
    data() {
            return {
      posts: [],
      tags: [],
      page: "1"
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.posts.length/10);
        }
    },
    methods: {
        arrayOfPage(pageNumber) {
            let res = [];
            for (let i = (pageNumber-1)*10; i < this.posts.length && i < (pageNumber-1)*10+10; i++) {
                res.push(this.posts[i])
            }
            return res
        },
        changePage(page) {
            this.page = page;
        },
        async subStringFetch(string) {
            const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'api/v1/cats/match?string='+ string)
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

            this.posts = dataFinal

            this.page = 1

            this.getTags()

            this.post(string, this.processData())
        },
        getTags() {
            let tags = []
            for (let i = 0; i != this.posts.length && tags.length != 6; i++) {
                for(let j = 0; j != this.posts[i].tags.length && tags.length != 6; j++) {
                    if(!tags.includes(this.posts[i].tags[j]))
                        tags.push(this.posts[i].tags[j])
                }
            }

            this.tags = tags;
        },
        async fetchCats(catType) {
            const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'api/v1/cats/filter?tag='+ catType + '&omit=0&total=0')

            const data = await res.json()

            this.posts = data

            this.page = 1

            this.getTags()

            this.post(catType, this.processData())
        },
        processData() {
            let postData = "["

            for(let i = 0; i != this.posts.length; i++) {
                if(i != 0) postData += ","
                postData += "{"

                postData += '"id": ' + '"' +this.posts[i].id + '"' + ", "

                postData += '"tags": [' 
                
                for(let j = 0; j != this.posts[i].tags.length; j++) {
                    if(j != 0) postData += ","
                    postData += '"' + this.posts[i].tags[j] + '"'
                } 
                
                
                postData += ']' 

                postData += "}"
            }

            postData += "]"

            return postData
        },
        async post (query, content) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            var raw = JSON.stringify({
                "query": query,
                "content": content
            });

            var requestOptions = {
                method: 'POST',
                mode: 'cors', // this cannot be 'no-cors'
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: raw
            };

            fetch(process.env.VUE_APP_SERVER_URL + "database/addSearchResult", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            }
        },
    }
</script>
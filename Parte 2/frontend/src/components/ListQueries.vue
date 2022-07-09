<template>
    <div>
        <h3 class="text-center text-h3"> Last {{queriesLimited.length}} queries</h3>
        <v-table fixed-header  height="530px">
            <thead>
                <tr>
                    <th class="text-center">
                        Position
                    </th>
                    <th class="text-center">
                        Query
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item, index) in queriesLimited" :key="item"
                >
                    <td class="text-center" @click='sendQuery(item)'>{{ index+1 }}</td>
                    <td class="text-center" @click='sendQuery(item)'>{{ item }}</td>
                </tr>
            </tbody>
        </v-table>
        <h3 class="text-center" @click='toggleSeeMore()' v-if="seeMore"> See Less </h3>
        <h3 class="text-center" @click='toggleSeeMore()' v-else> See More </h3>
    </div>
</template>

<script>
export default {
    name: "ListQueries",
    data() {
        return{
            seeMore: false,
            queries: []
        }
    },
    methods: {
        toggleSeeMore() {
            this.seeMore = !this.seeMore;
        },
        async updateTags() {
            const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'database/getAllSearchResult')

            const data = await res.json()


            let tags = []

        for (let i = data.length-1; i != -1; i--) {
                tags.push(data[i].query)
            }
            
        this.queries = tags;
        
        },
        sendQuery(query) {
            this.$emit('doQuery',query)
        }
    },
        computed: {
        queriesLimited() {

            if(this.seeMore) {
                return this.queries
            }
            else {
                let data = [];
                
                for(let i = 0; i != 10 && i != this.queries.length; i++) {
                    data.push(this.queries[i])
                }

                return data
            }

            
        }
    }, 
    beforeMount(){
    this.updateTags()
    },    
}
</script>
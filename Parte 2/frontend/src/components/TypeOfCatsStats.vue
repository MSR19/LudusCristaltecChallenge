<template>
    <div >
        <h3 class="text-center text-h3"> TOP {{catPictures.length}} most viewed categories </h3>
        <v-table fixed-header  height="530px">
            <thead>
                <tr>
                    <th class="text-center">
                        Tag
                    </th>
                    <th class="text-center">
                        Number of cats
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in catPictures" :key="item"
                >
                    <td class="text-center" @click='setImages(item.ids)'>{{ item.tag }}</td>
                    <td class="text-center" @click='setImages(item.ids)'>{{ item.cont }}</td>
                </tr>
            </tbody>
        </v-table>
        <h3 class="text-center" @click='toggleSeeMore()' v-if="seeMore"> See Less </h3>
        <h3 class="text-center" @click='toggleSeeMore()' v-else> See More </h3>
    </div>
</template>

<script>
export default {
    name: 'TypeOfCats',
    data() {
        return{
            seeMore: false,
            catPictures: []
        }
    },
    methods: {
        toggleSeeMore() {
            this.seeMore = !this.seeMore;
            this.numberOfEachTag()
        },
        async numberOfEachTag() {
            const res =  await fetch(process.env.VUE_APP_SERVER_URL + 'database/getAllSearchResult')

            const data = await res.json()


            const finalInf = []

            for (let i = 0; i != data.length; i++) {
                finalInf.push(JSON.parse(data[i].content))
            }


            this.catPictures = finalInf;

            let dataFinal = [];
            let tags = [];
            let cont = [];
            let ids = [];
            let idsAux = [];


            if(this.catPictures.length == undefined) {
                return;
            }
            
            for (let k = 0; k != this.catPictures.length; k++) {
                for (let i = 0; i != this.catPictures[k].length; i++) {
                    for(let j = 0; j != this.catPictures[k][i].tags.length; j++) {
                        if(-1 == tags.indexOf(this.catPictures[k][i].tags[j])) { 
                            tags.push(this.catPictures[k][i].tags[j]);
                            cont.push(1);
                            ids.push([this.catPictures[k][i].id])
                            idsAux.push([{id: this.catPictures[k][i].id}])

                        }
                        else { 
                            let index = tags.indexOf(this.catPictures[k][i].tags[j]);
                            if(!ids[index].includes(this.catPictures[k][i].id)) {
                                cont[index]++;
                                ids[index].push(this.catPictures[k][i].id)
                                idsAux[index].push({id: this.catPictures[k][i].id})
                            }
                                
                        }
                    }
                }
            }
            
            let size = tags.length

            if(this.seeMore) {
    
                for(let i = 0; i != size; i++) {
                    let indexAux = cont.indexOf(Math.max.apply(null, cont))
                    dataFinal.push({tag: tags[indexAux], cont: cont[indexAux], ids: idsAux[indexAux]})
                    cont.splice(indexAux,1);
                    tags.splice(indexAux,1);
                    idsAux.splice(indexAux,1);
                }
            }
            else {
                
                for(let i = 0; i < 10 && i !=size; i++) {
                    let indexAux = cont.indexOf(Math.max.apply(null, cont))
                    dataFinal.push({tag: tags[indexAux], cont: cont[indexAux], ids: idsAux[indexAux]})
                    cont.splice(indexAux,1);
                    tags.splice(indexAux,1);
                    idsAux.splice(indexAux,1);
                }
            }
            
           

            this.catPictures = dataFinal;

            return dataFinal
            
        },
        setImages(ids) {
            this.$emit('setImages', ids)
        }
    }, 
    beforeMount(){
    this.numberOfEachTag()
    }, 
}
</script>
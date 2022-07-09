<template>
    <h3> 
        <div class="button" v-on:click="SearchSection"> 
            <button class="button"> Search Section </button>
        </div>
        <div class="button" v-on:click="StatisticalSection">  
            <button class="button"> Statistical page </button>
        </div>
    </h3>
</template>

<script>
export default {
    name: 'HeaderSite',
    methods: {
        SearchSection() {
            this.$emit('SearchSection')
        },
        StatisticalSection() {
            this.$emit('StatisticalSection')
        }
    }
}

</script>



<style scoped>
h3{
    display: flex;
    flex-flow: column wrap;
    size: 100vw;
    background-color: #333;
    padding: 0%;
    margin: 0%;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    padding: 10px;
}




.button{
  display: inline-block;
  width: 50vw;
  color: #333;
  background-color:#fff;
  font-size: clamp(16px, 4vw, 30px);
}

.button:hover{
 color:#ffffff;
 background-color:#060606;
}


</style>

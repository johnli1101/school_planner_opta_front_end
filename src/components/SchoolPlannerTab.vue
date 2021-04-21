<template>
    <v-card flat>
        <v-card-text>
            <h1>{{title.name}}</h1>
            <SchoolList 
                @update-item-list="passItemsUp($event)" 
                :items="items" 
                :lessons="lessons"
                :type="title.id"
            />
        </v-card-text>
    </v-card>
</template>

<script>

  import SchoolList from './SchoolList';

  export default {

    data: () => ({

    }),
    props: {
        items: Object
        ,title: Object
        ,lessons: Array
    },
    components: {
        SchoolList
    },
    methods: {
        //only for lifting the item list up to the parent level
        passItemsUp (event) {
            console.log(event);
            this.$emit("update-item-list", event);
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

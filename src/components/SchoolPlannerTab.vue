<template>
    <v-card flat>
        <v-card-text>
            <h1>{{title}}</h1>
            <SchoolList @update-item-list="passItemsUp($event)" :items="items" />
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
        ,title: String
    },
    components: {
        SchoolList
    },
    methods: {
        //only for lifting the item list up to the parent level
        passItemsUp (event) {
            this.$emit("update-item-list", event);
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

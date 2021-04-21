<template>
    <v-btn
        color="green lighten-2"
        dark
        @click="handleSolve()"
    >
        Solve
    </v-btn>
</template>

<script>

    export default {
        data: () => ({

        }),
        props: {
            items: Object
        },
        components: {

        },
        methods: {
            handleSolve() {
                this.$emit("invoke-solve");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

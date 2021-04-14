<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
            >
            </v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>

  export default {

    data: () => ({

    }),
    props: {

    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

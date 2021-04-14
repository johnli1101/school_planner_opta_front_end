<template>
    <form  @submit.prevent="addItem()">
        <input
            v-model="newItem"
            maxlength="20"
            type="text"
            class="form-control insert-form"
            placeholder="Create new entry"
        />
    </form>
</template>

<script>

    export default {
        data: () => ({
            newItem: ""
        }),
        
        methods: {
            addItem() {
                if (this.newItem.length > 0) {
                    this.$emit("on-add-item", this.newItem);
                }
                this.newItem = "";
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .insert-form {
        margin-top: 2vh;
        width: 60vh;
        font-size: 20px;
    }
</style>

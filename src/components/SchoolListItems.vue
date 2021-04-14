<template>
    <v-list-item class="school-item">
        <v-list-item-content>
                <v-col class="text-left">
                    <form v-if="isEditing" class="flex-grow-1" @submit.prevent="doneEditing()">
                        <input
                            type="text"
                            class="form-control"
                            v-model="newItemDescription"
                            @blur="doneEditing()"
                            ref="newItem"
                        />
                    </form>
                    <span v-else> {{itemContent.name}} </span>
                </v-col>
                <v-col class="text-right">
                    <v-tooltip top> 
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="editingItem()" v-bind="attrs" v-on="on" class="item-button" fab small dark color="cyan">
                                <v-icon dark>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip top> 
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="$emit('on-delete-item')" v-bind="attrs" v-on="on" class="item-button" fab small dark color="indigo">
                                <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                    </v-tooltip>
                </v-col>
        </v-list-item-content>           
    </v-list-item>
</template>

<script>

  export default {
    data: () => ({
        isEditing: false
        ,newItemDescription: ""
    }),
    props: {
        itemContent: Object
    },
    methods: {
        editingItem() {
            if (this.isEditing) {
                this.doneEditing();
            } 
            else {
                console.log(this)
                this.newItemDescription = this.itemContent.name;
                this.isEditing = true;
                this.$nextTick(() => this.$refs.newItem.focus())
            }
        },
        doneEditing() {
            this.isEditing = false;
            this.$emit("on-item-edit", this.newItemDescription);
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item-button {
        float: right;
        margin-left: 1vh;
        margin-right: 1vh;
    }
    .school-item {
        color: black !important;
        background-color: white !important;
    }
    .school-item:hover {
        color: #fff !important;
        background-color: #a4c4ff !important;
    }
</style>

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
                            <v-btn @click="handleDelete()" v-bind="attrs" v-on="on" class="item-button" fab small dark color="indigo">
                                <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span>
                    </v-tooltip>
                </v-col>
        </v-list-item-content>      
        <v-dialog
            v-model="dialog"
            width="50vh"
            height="100vh"
        >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    WARNING!
                </v-card-title>

                <v-card-text>
                    This current item <b> {{itemContent.name}} </b> is currently being used in some lessons, are you sure you want to continue?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="handleDeleteConfirm()"
                >
                    Yes
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    No
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>     
    </v-list-item>
</template>

<script>

  export default {
    data: () => ({
        isEditing: false
        ,newItemDescription: ""
        ,dialog: false
    }),
    props: {
        itemContent: Object
        ,lessons: Array
        ,type: String
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
        },
        handleDelete() {
            //check if the item is currently being used in other lessons
            //start by removing the "s" from the type like teachers -> teacher
            let typeString = this.type.slice(0, -1);
            let toDeleteItem = this.itemContent;
            console.log(typeString);
            console.log(toDeleteItem);
            console.log(this.checkIfExistsInLessons(toDeleteItem.id, typeString));
            if(this.checkIfExistsInLessons(toDeleteItem.id, typeString)) {
                this.dialog = true;
            }
            else {
                this.$emit("on-delete-item");
            }
        },
        handleDeleteConfirm() {
            this.$emit("on-delete-item");
            this.dialog = false;
        },
        checkIfExistsInLessons(id, typeString) {
            let lessonList = this.lessons;
            for (let lesson in lessonList) {
                if(lessonList[lesson][typeString].toString() === id.toString()) {
                    return true;
                }
            }
            return false;
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

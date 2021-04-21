<template>
    <v-card class="list-container" flat>
        <SchoolListAddItem @on-add-item="addItem($event)"/>
        <v-list class="school-list">
            <SchoolListItems v-for="(item, index) in items"
                :key="index" 
                :itemContent="item" 
                :lessons="lessons"
                :type="type"
                @on-item-edit="editItem(item, $event)"
                @on-delete-item="deleteItem(item)"
            />
        </v-list>
    </v-card>
</template>

<script>

    import SchoolListItems from './SchoolListItems';
    import SchoolListAddItem from './SchoolListAddItem';

    export default {
        data: () => ({
            dialog: false
        }),
        props: {
            items: Object
            ,lessons: Array
            ,type: String
        },
        components: {
            SchoolListItems, SchoolListAddItem
        },
        methods: {
            addItem(newItem) {
                console.log(newItem);

                //create array to pass through emit
                let argArr = [];
                //argArr.push(this.items);
                argArr.push(newItem);
                argArr.push("post");

                //console.log(JSON.stringify(this.items, null, 2));
                this.$emit("update-item-list", argArr);

            },
            deleteItem(toDeleteItem) {
                console.log(JSON.stringify(toDeleteItem, null, 2));
                let argArr = [];
                argArr.push(toDeleteItem);
                argArr.push("delete");
                
                this.$emit("update-item-list", argArr)
            },
            //greatest number function to help create unique ID for new item
            findGreatestNumber(arr) {
                let greatestNumber = 0;
                for (let i = 0; i < arr.length; ++i) {
                    if (arr[i] > greatestNumber) {
                        greatestNumber = arr[i]
                    }
                }
                return greatestNumber;
            },
            editItem(currentItem, newItemDescription) {
                currentItem.name = newItemDescription;
                let argArr = [];
                let newObj = {id: currentItem.id, name: newItemDescription};

                argArr.push(newObj);
                argArr.push("put");

                this.$emit("update-item-list", argArr);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list-container {
        height: 80vh;
    }
    .school-list {
        overflow: auto;
        max-height: 80vh;
        max-width: 50vh;
        font-size: 20px;
        display: block;
        align-items: center;
    }
</style>

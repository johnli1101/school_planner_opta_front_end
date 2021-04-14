<template>
    <v-card class="list-container" flat>
        <SchoolListAddItem @on-add-item="addItem($event)"/>
        <v-list class="school-list">
            <SchoolListItems v-for="(item, index) in items"
                :key="index" 
                :itemContent="item" 
                @on-item-edit="editItem(item, $event)"    
            />
        </v-list>
    </v-card>
</template>

<script>

    import SchoolListItems from './SchoolListItems';
    import SchoolListAddItem from './SchoolListAddItem';

    export default {
        data: () => ({

        }),
        props: {
            items: Object
        },
        components: {
            SchoolListItems, SchoolListAddItem
        },
        methods: {
            addItem(newItem) {
                console.log(newItem);
                const asArray = Object.entries(this.items);
                let itemKeys = asArray.map(item => parseInt(item[0]));
                let maxIndex = this.findGreatestNumber(itemKeys) + 1;
                let newItemObject = {
                    id: maxIndex.toString()
                    ,name: newItem
                }

                //need to use $set for vue because of how reactivity works with objects
                this.$set(this.items, maxIndex.toString(), newItemObject);

                console.log(JSON.stringify(this.items, null, 2));
                this.$emit("update-item-list", this.items);

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
                console.log(newItemDescription);
                currentItem.name = newItemDescription;
                console.log(JSON.stringify(this.items, null, 2));
                this.$emit("update-item-list", this.items);
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

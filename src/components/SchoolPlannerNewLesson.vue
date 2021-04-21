<template>

        <v-btn
            color="blue lighten-2"
            dark
            @click="handleOpenAddDialog()"
        >
            Add New Lesson
                    <v-dialog
            v-model="dialog"
            width="50vh"
            height="100vh"
        >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add New Lesson
                </v-card-title>

                <v-col cols="12">
                    <v-select
                        :items="this.translateToArray(timeslots, 1)"
                        item-text="name"
                        item-value="id"
                        v-model="newTimeslot.id"
                        label="Time slot"
                        required
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-select
                        :items="this.translateToArray(rooms, 1)"
                        item-text="name"
                        item-value="id"
                        v-model="newRoom.id"
                        label="Room"
                        required    
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-select
                        :items="this.translateToArray(subjects, 0)"
                        item-text="name"
                        item-value="id"
                        v-model="newSubject.id"
                        label="Subject"
                        required
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-select
                        :items="this.translateToArray(teachers, 0)"
                        item-text="name"
                        item-value="id"
                        v-model="newTeacher.id"
                        label="Teacher"
                        required
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <v-select
                        :items="this.translateToArray(studentGroups, 0)"
                        item-text="name"
                        item-value="id"
                        v-model="newStudentGroup.id"
                        label="Student Year"
                        required
                    ></v-select>
                </v-col>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="handleAddNewLesson"
                    >
                        Add Lesson
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog=false"
                    >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-btn>


</template>

<script>

    export default {
        data: () => ({
            dialog: false
            ,newTeacher: {id: "", name: "N/A"}
            ,newSubject: {id: "", name: "N/A"}
            ,newStudentGroup: {id: "", name: "N/A"}
            ,newRoom: {id: "", name: "N/A"}
            ,newTimeslot: {id: "", name: "N/A"}
        }),
        props: {
            timeslots: Object
            ,rooms: Object
            ,subjects: Object
            ,teachers: Object
            ,studentGroups: Object
        },
        components: {

        },
        methods: {
            translateToArray (obj, addNull) {
                let newArray = []
                if(addNull) {
                    newArray.push({id: "", name: "N/A"});
                }
                for (const key in obj) {
                    newArray.push(obj[key]);
                }
                return newArray;
            },
            handleOpenAddDialog() {
                this.newTeacher = this.teachers ? {id: this.teachers[Object.keys(this.teachers)[0]].id, name: this.teachers[Object.keys(this.teachers)[0]].name} : {id: "", name: ""};
                this.newSubject = this.subjects ? {id: this.subjects[Object.keys(this.subjects)[0]].id, name: this.subjects[Object.keys(this.subjects)[0]].name}  : {id: "", name: ""};
                this.newStudentGroup = this.studentGroups ? {id: this.studentGroups[Object.keys(this.studentGroups)[0]].id, name: this.studentGroups[Object.keys(this.studentGroups)[0]].name}  : {id: "", name: ""};
                this.newRoom = {id: "", name: ""};
                //this.newTimeslot = this.timeslots ? this.timeslots[Object.keys(this.timeslots)[0]] : {id: "", name: ""};

                this.dialog = true;
            },
            handleAddNewLesson() {
                let newLessonObject = {};

                newLessonObject = { 
                                    teacher: this.newTeacher.id
                                    ,subject: this.newSubject.id
                                    ,studentGroup: this.newStudentGroup.id
                                    // ,room: {id: 11, name: "Room A"}
                                    // ,timeslot: {id: 3, dayOfWeek: "MONDAY", startTime: [10, 30], endTime: [11, 30]}
                                }

                console.log(newLessonObject);
                this.$emit("add-new-lesson", newLessonObject);  
                this.dialog = false;
            },
            onSelectionSubmit() {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

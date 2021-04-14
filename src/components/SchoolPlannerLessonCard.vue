<template>
    <v-card>
          <v-btn
              color="red lighten-2"
              dark
              @click.stop="handleDialogOpen()"
          >
              Edit
          </v-btn>
          <v-col class="text-right">
            <v-dialog
              v-model="dialog"
              width="50vh"
              height="100vh"
            >
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Lesson Details
                    </v-card-title>

                   <v-col cols="12">
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="Time slot"
                          required
                        ></v-select>
                    </v-col>

                   <v-col cols="12">
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="Room"
                          required
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                          :items="this.translateToArray(subjects)"
                          item-text="name"
                          item-value="id"
                          v-model="currentSubject.id"
                          label="Subject"
                          required
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                          :items="this.translateToArray(teachers)"
                          item-text="name"
                          item-value="id"
                          v-model="currentTeacher.id"
                          label="Teacher"
                          required
                        ></v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                          :items="this.translateToArray(studentGroups)"
                          item-text="name"
                          item-value="id"
                          v-model="currentStudentGroup.id"
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
                          @click="onSelectionSubmit"
                        >
                          Done
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col class="text-left">
            <v-card-text class="lesson-text">
                <h2>{{subjects[lesson.subject].name}}</h2>
                <h3>{{teachers[lesson.teacher].name}}</h3>
                <h3>{{studentGroups[lesson.studentGroup].name}}</h3>
                
            </v-card-text>
        </v-col>
  </v-card>
</template>

<script>

  export default {

    data: () => ({
        dialog: false
        ,currentSubject: {id: "", name: ""}
        ,currentTeacher: {id: "", name: ""}
        ,currentStudentGroup: {id: "", name: ""}
        ,currentTimeslot: {id: "", name: ""}
        ,currentRoom: {id: "", name: ""}
    }),
    props: {
        lesson: Object
        ,subjects: Object
        ,teachers: Object
        ,studentGroups: Object
        ,timeslots: Object
        ,rooms: Object
    },
    methods: {
        //translate obj to array to be used in select
        translateToArray (obj) {
            let newArray = []
            for (const key in obj) {
                newArray.push(obj[key]);
            }
            return newArray;
        },
        handleDialogOpen() {
            this.currentSubject = {id: this.subjects[this.lesson.subject].id, name: this.subjects[this.lesson.subject].name};
            this.currentTeacher = {id: this.teachers[this.lesson.teacher].id, name: this.teachers[this.lesson.teacher].name};
            this.currentStudentGroup = {id: this.studentGroups[this.lesson.studentGroup].id, name: this.studentGroups[this.lesson.studentGroup].name}
            this.dialog = true;
        },
        onSelectionSubmit () {
            console.log(this.lesson);
            console.log(this.currentSubject.id);
            console.log(this.currentTeacher.id);
            console.log(this.currentStudentGroup.id);

            let newLessonObj = { id: this.lesson.id, 
                                  room: this.lesson.room, 
                                  studentGroup: this.currentStudentGroup.id, 
                                  subject: this.currentSubject.id, 
                                  teacher: this.currentTeacher.id, 
                                  timeslot: this.lesson.timeslot
                                };

            //this.lesson = newLessonObj;
            console.log(this.lesson);
            this.$emit('updated-lesson', newLessonObj);
            this.dialog = false;
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

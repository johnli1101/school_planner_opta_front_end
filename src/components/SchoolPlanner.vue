<template>
    <v-card flat>
        <v-card-text>
            <h1>プラナー</h1>
        </v-card-text>
        <SchoolPlannerSolve @invoke-solve="passSolveSignalUp()" />  
        <v-btn
            color="purple lighten-2"
            dark
            @click="handleStopSolve()"
        >
            Stop Solve
        </v-btn>
        <SchoolPlannerNewLesson 
            @add-new-lesson="addNewLesson($event)" 
            :teachers="teachers"
            :subjects="subjects"
            :studentGroups="studentGroups"
            :rooms="rooms"
            :timeslots="timeslots"    
        />
        <v-simple-table
            fixed-header
            height="100vh"
        >
            <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        <h1>Timeslots</h1>
                    </th>
                    <th v-for="room in rooms"
                        :key="room.id">
                        <h1>{{ room.name }} </h1>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(time, key) in tableArray"
                        :key="key"
                    >
                        <td>
                            <h3>{{timeslots[key].name}}</h3>
                        </td>
                        <td v-for="(lesson, key) in time"
                            :key="key"  >
                            <SchoolPlannerLessonCard 
                                @updated-lesson="passLessonUp(lesson, $event)" 
                                v-if="lesson['id']" 
                                :lesson="lesson" 
                                :teachers="teachers" 
                                :subjects="subjects" 
                                :studentGroups="studentGroups" 
                                :timeslots="timeslots" 
                                :rooms="rooms" />
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

<script>
    import SchoolPlannerLessonCard from './SchoolPlannerLessonCard';
    import SchoolPlannerSolve from './SchoolPlannerSolve';
    import SchoolPlannerNewLesson from './SchoolPlannerNewLesson';

    export default {
        data: () => ({
        currentItem: 'tab-Web'
        }),
        props: {
            rooms: Object
            ,timeslots: Object
            ,teachers: Object
            ,subjects: Object
            ,studentGroups: Object
            ,lessons: Array
            ,tableArray: Object
        },
        components: {
            SchoolPlannerLessonCard, SchoolPlannerSolve, SchoolPlannerNewLesson
        },

        methods: {
            //just for passing up to the Lesson Planner Level
            passLessonUp(currentLesson, alteredLesson) {
                this.$emit('update-lesson-card', alteredLesson);
            },
            passSolveSignalUp() {
                this.$emit("invoke-solve");
            },
            addNewLesson(newLesson) {
                console.log(newLesson);
                this.$emit("add-new-lesson", newLesson);
            },
            handleStopSolve() {
                console.log();
                this.$emit("invoke-stop-solve");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

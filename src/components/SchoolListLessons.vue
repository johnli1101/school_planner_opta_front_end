<template>
    <v-card flat>
        <v-card-text>
            <h1>授業 リースト</h1>
            <v-simple-table
                fixed-header
                height="100vh"
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                        <th>
                            <h1>Lessons without Room and/or Timeslot</h1>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(lesson, key) in lessons"
                            :key="key"
                        >
                            <td>
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
        </v-card-text>
    </v-card>
</template>

<script>

    import SchoolPlannerLessonCard from './SchoolPlannerLessonCard';

    export default {

        data: () => ({

        }),
        props: {
            lessons: Array
            ,subjects: Object
            ,teachers: Object
            ,studentGroups: Object
            ,rooms: Object
            ,timeslots: Object
        },
        components: {
            SchoolPlannerLessonCard
        },
        methods: {
            //only for lifting the lesson list up to the parent level
            passLessonUp(currentLesson, alteredLesson) {
                this.$emit('update-lesson-card', alteredLesson);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

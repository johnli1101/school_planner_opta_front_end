<template>
  <v-card>
    <span v-if="loading">
      <SchoolPlannerOverlay />
    </span>
    <span v-else></span>
    <v-toolbar
      color="deep-purple accent-4"
      dark
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>スクールプランナー</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          fixed-tabs
          slider-color="white"
        >
          <v-tab
            v-for="item in items"
            :key="item.id"
            :href="'#tab-' + item.id"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="item in items"
        :key="item.id"
        :value="'tab-' + item.id"
      >
        <div v-if="item.id === 'planner'">

        <span>
            <SchoolPlanner 
                @invoke-solve="solveNewSet()" 
                @update-lesson-card="updateLessonCard($event)"
                @add-new-lesson="addLessonCard($event)"
                @invoke-stop-solve="stopSolve()"
                :lessons="lessons" 
                :timeslots="simplifyTimeslotObject(timeslots)" 
                :rooms="rooms" 
                :teachers="teachers" 
                :subjects="subjects" 
                :studentGroups="studentGroups" 
                :tableArray="tableArray" 
            />
        </span>
        </div>
        <div v-else-if="item.id === 'lessons'">
            <SchoolListLessons 
                :lessons="filterNullLessons(lessons)" 
                :timeslots="timeslots" 
                :rooms="rooms" 
                :teachers="teachers" 
                :subjects="subjects" 
                :studentGroups="studentGroups" 
            />
        </div>
        <div v-else-if="item.id === 'teachers'">
            <SchoolPlannerTab 
                @update-item-list="updateList($event, 'teachers')" 
                :title="item" 
                :items="teachers" 
                :lessons="lessons"
            />
        </div>
        <div v-else-if="item.id === 'subjects'">
            <SchoolPlannerTab 
                @update-item-list="updateList($event, 'subjects')" 
                :title="item" 
                :items="subjects"
                :lessons="lessons"
            />
        </div>
        <div v-else-if="item.id === 'studentGroups'">
            <SchoolPlannerTab 
                @update-item-list="updateList($event, 'studentGroups')" 
                :title="item" 
                :items="studentGroups" 
                :lessons="lessons"
            />
        </div>
        <div v-else-if="item.id === 'rooms'">
            <SchoolPlannerTab 
                @update-item-list="updateList($event, 'rooms')" 
                :title="item" 
                :items="rooms" 
                :lessons="lessons"
            />
        </div>
        <div v-else-if="item.id === 'timeslots'">
          <v-card flat>
            <v-card-text>
              <h2>{{ item.name }}</h2>
              {{ text }}
            </v-card-text>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import { axios } from '@/plugins/axios'
  import SchoolPlanner  from './SchoolPlanner';
  import SchoolPlannerTab from './SchoolPlannerTab';
  import SchoolPlannerOverlay from './SchoolPlannerOverlay';
  import SchoolListLessons from './SchoolListLessons';

  export default {
    name: 'SchoolPlannerContainer',
    data: () => ({
      currentItem: 'tab-Web',
      tableArray: {},
      items: [
        {id: 'planner', name: "プラナー"}
        ,{id: 'lessons', name: "授業"}
        ,{id: 'teachers', name: "教員"} 
        ,{id: 'subjects', name: "教科"}
        ,{id: 'studentGroups', name: "年生"}
        ,{id: 'rooms', name: "教室"}
        ,{id: 'timeslots', name: "時間"}
      ],
      isSolving: false,
      json_data: {},
      timeslots: {},
      rooms: {},
      studentGroups: [
                      {id: "1", name: "9th Grade"}
                      ,{id: "2", name: "10th Grade"}
                      ,{id: "3", name: "11th Grade"}
                    ],
      teachers: [
                  {id: "1", name: "A Turing"}
                  ,{id: "2", name: "Y Kenshi"}
                  ,{id: "3", name: "B Marly"}
                  ,{id: "4", name: "J Smith"}
                ],
      subjects: [
                  {id: "1", name: "Biology"}
                  ,{id: "2", name: "Mathematics"}
                  ,{id: "3", name: "English"}
                  ,{id: "4", name: "Physics"}
                ],
      lessons: [ {id: "1", room: "11", studentGroup: "1", subject: "1", teacher: "14", timeslot: "1"}
                ,{id: "2", room: "11", studentGroup: "1", subject: "2", teacher: "3", timeslot: "3"}
                ,{id: "3", room: "12", studentGroup: "1", subject: "1", teacher: "15", timeslot: "1"}
                ,{id: "4", room: "12", studentGroup: "1", subject: "2", teacher: "14", timeslot: "3"}
                ,{id: "5", room: "13", studentGroup: "1", subject: "4", teacher: "3", timeslot: "6"}
                ,{id: "6", room: "13", studentGroup: "1", subject: "4", teacher: "15", timeslot: "8"}
                ,{id: "7", room: "13", studentGroup: "2", subject: "3", teacher: "4", timeslot: "1"}
                ,{id: "8", room: "11", studentGroup: "2", subject: "3", teacher: "4", timeslot: "6"}
                ,{id: "9", room: "12", studentGroup: "2", subject: "1", teacher: "15", timeslot: "5"}
                ,{id: "10", room: "12", studentGroup: "2", subject: "4", teacher: "3", timeslot: "2"}
                ,{id: "11", room: "11", studentGroup: "1", subject: "3", teacher: "14", timeslot: "2"}
                ,{id: "12", room: "12", studentGroup: "2", subject: "1", teacher: "15", timeslot: "4"}
              ],
      loading: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    components: { SchoolPlanner, SchoolPlannerTab, SchoolPlannerOverlay, SchoolListLessons },
    methods: {
      //pulls in default json from the java api
      getJson() {
          this.loading = true;
          axios.get("http://localhost:8080/timeTable").then(response => {
            this.json_data = response.data
            console.log(JSON.stringify(this.json_data, null, 2));
            this.initializeAPIData(this.json_data);
            console.log("Hello");
            this.loading = false;

          }).catch(error => {
            console.log(error);
          })

      },
      simplifyTimeslotObject(timeslotArr){
          //console.log(JSON.stringify(timeslotArr, null, 2));
          let newTimeArr = {};
          for (let i in timeslotArr) {
              newTimeArr[timeslotArr[i].id] = {
                  id: timeslotArr[i].id
                  ,name: timeslotArr[i].dayOfWeekName + " " + timeslotArr[i].startTime + " - " + timeslotArr[i].endTime
              }
          }
          //console.log(JSON.stringify(newTimeArr, null, 2));
          return newTimeArr;
      },
      filterNullLessons(timeRoomArr) {
          const result = timeRoomArr.filter((property) => {
            return !property["timeslot"];
          });
          return result;
      },
      stopSolve() {
          if(this.isSolving) {
              let newJson = {};
              this.isSolving = false;
              this.loading = true;
              axios.post("http://localhost:8080/timeTable/stopSolving").then(response => {
                  console.log(JSON.stringify(response, null, 2));
                  axios.get("http://localhost:8080/timeTable").then(response2 => {
                    console.log(JSON.stringify(response2, null, 2));
                    newJson = response2.data;
                    this.lessons = this.curateLessonData(newJson["lessonList"]);
                    this.createTableArray(this.timeslots, this.rooms, this.lessons);
                    this.loading = false;
                  }).catch(error2 => {
                    console.log(error2);
                    
                  })
              }).catch(error => {
                console.log(error);
              })
          }
      },
      solveNewSet() {
          if(!this.isSolving) {
              this.isSolving = true;
              this.loading = true;
              axios.post("http://localhost:8080/timeTable/solve").then(response => {
                  console.log(JSON.stringify(response, null, 2));
                  setTimeout(this.stopSolve, 3000)

              }).catch(error => {
                console.log(error);
              })
          }
      },
      apiCallAddNew(newEntry, listName) {
          console.log(newEntry);
          console.log(listName);
      },
      //from floating the teachers list up from teacher component and updates here
      updateList(args, toUpdate) {
        console.log(JSON.stringify(args,null, 2));

        let toChangeItem = args[0];
        let postRequest = args[1];
        let routeURL = "http://localhost:8080/" + toUpdate;
        let listToGrab = "";
        let newJson = {};

        console.log(toChangeItem);

        switch (toUpdate) {
            case "teachers":
                listToGrab = "teacherList";
                break;
            case "rooms":
                listToGrab = "roomList";
                break;
            case "subjects":
                listToGrab = "subjectList";
                break;
            case "studentGroups":
                listToGrab = "studentGroupList";
                break;
            default:
                break;
        }

        switch (postRequest) {
            case "post":
              this.loading = true;
              axios.post(routeURL, {"name": toChangeItem}).then(response => {
                    console.log(JSON.stringify(response, null, 2));
                    axios.get("http://localhost:8080/timeTable").then(response2 => {
                        console.log(JSON.stringify(response2, null, 2));
                        newJson = response2.data;
                        this[toUpdate] = this.initializeListToObject(newJson[listToGrab]);
                        console.log(JSON.stringify(this[toUpdate], null, 2)); 
                        if(toUpdate === "rooms" || toUpdate === "timeslots") {
                            this.createTableArray(this.timeslots, this.rooms, this.lessons);
                        }
                        this.loading = false;
                    }).catch(error2 => {
                        console.log(error2);
                    })

                    this.loading = false;
                }).catch(error => {
                  console.log(error);
                })

                break;
            case "put":
                this.loading = true;
                routeURL = routeURL + "/" + toChangeItem.id;
                console.log(routeURL);
                axios.put(routeURL, toChangeItem).then(response => {
                      console.log(JSON.stringify(response, null, 2));
                      axios.get("http://localhost:8080/timeTable").then(response2 => {
                          console.log(JSON.stringify(response2, null, 2));
                          newJson = response2.data;
        
                          this[toUpdate] = this.initializeListToObject(newJson[listToGrab]);
                          console.log(JSON.stringify(this[toUpdate], null, 2)); 
                        if(toUpdate === "rooms" || toUpdate === "timeslots") {
                            this.createTableArray(this.timeslots, this.rooms, this.lessons);
                        }
                          this.loading = false;
                      }).catch(error2 => {
                          console.log(error2);
                      })

                    this.loading = false;
                }).catch(error => {
                  console.log(error);
                })

                break;
            case "delete":
                this.loading = true;
                routeURL = routeURL + "/" + toChangeItem.id;
                console.log(routeURL);
                axios.delete(routeURL).then(response => {
                      console.log(JSON.stringify(response, null, 2));
                      axios.get("http://localhost:8080/timeTable").then(response2 => {
                          console.log(JSON.stringify(response2, null, 2));
                          newJson = response2.data;
        
                          this[toUpdate] = this.initializeListToObject(newJson[listToGrab]);
                          console.log(JSON.stringify(this[toUpdate], null, 2)); 
                        if(toUpdate === "rooms" || toUpdate === "timeslots") {
                            this.createTableArray(this.timeslots, this.rooms, this.lessons);
                        }
                          this.loading = false;
                      }).catch(error2 => {
                          console.log(error2);
                      })

                    this.loading = false;
                })
                break;
            default:
                break;
        }

      },
      //initializes all the main data variables from the java api
      initializeAPIData(json_data) {
        //translate timeslot into something more concise and readable
        this.timeslots = this.translateTimeslots(json_data["timeslotList"]);
      
        //set the other arrays here
        this.rooms = this.initializeListToObject(json_data["roomList"]);
        this.teachers = this.initializeListToObject(json_data["teacherList"]);
        this.subjects = this.initializeListToObject(json_data["subjectList"]);
        this.studentGroups = this.initializeListToObject(json_data["studentGroupList"]);
        this.lessons = this.curateLessonData(json_data["lessonList"]);
        console.log(JSON.stringify(this.lessons, null, 2));

        //initialize the 2d array to print into the array
        this.createTableArray(this.timeslots, this.rooms, this.lessons);
      },
      //function to curate the Lesson data that would assign all names to the corresponding teacher, studentGroup arrays
      curateLessonData(lessonList) {
          let returnList = [];
          let newObject = {};
          let timeslotTemp = {};
          let roomTemp = {};
          for(let i = 0; i < lessonList.length; ++i) {
              if(lessonList[i].timeslot) {
                  timeslotTemp = lessonList[i].timeslot.id;
              } else {
                  timeslotTemp = "";
              }
              if(lessonList[i].room) {
                  roomTemp = lessonList[i].room.id;
              } else {
                  roomTemp = "";
              }
              newObject = {
                  id: lessonList[i].id
                  ,subject: lessonList[i].subject
                  ,teacher: lessonList[i].teacher
                  ,studentGroup: lessonList[i].studentGroup
                  ,timeslot: timeslotTemp
                  ,room: roomTemp
              }
              returnList.push(newObject);
          }
          return returnList;
      },
      //for transitioning the room array into object for easier book keeping
      initializeListToObject(arrayList) {
        let newObject = {};
        for (let i = 0; i < arrayList.length; ++i) {
          newObject[arrayList[i]["id"]] = arrayList[i];
        }
        
        return newObject;
      },
      //updates lesson card from the event
      updateLessonCard(event) {
        console.log(event);

        let routeURL = "http://localhost:8080/lessons/" + event.id;
        console.log(routeURL);
        let newJson = {};
        this.loading = true;
        axios.put(routeURL, event).then(response => {
              console.log(JSON.stringify(response, null, 2));
              axios.get("http://localhost:8080/timeTable").then(response2 => {
                  console.log(JSON.stringify(response2, null, 2));
                  newJson = response2.data;

                  this["lessons"] = this.curateLessonData(newJson["lessonList"]);
                  console.log(JSON.stringify(this["lessons"], null, 2)); 

                  this.createTableArray(this.timeslots, this.rooms, this.lessons);
                  this.loading = false;
              }).catch(error2 => {
                  console.log(error2);
              })

            this.loading = false;
        }).catch(error => {
          console.log(error);
        })
        //simply update the event passed up
        this.createTableArray(this.timeslots, this.rooms, this.lessons);

        console.log(JSON.stringify(this.lessons, null, 2));
      },
      addLessonCard(event) {
          console.log(event);
          let routeURL = "http://localhost:8080/lessons";
          let newJson = {};
          this.loading = true;
          axios.post(routeURL, event).then(response => {
                console.log(JSON.stringify(response, null, 2));
                axios.get("http://localhost:8080/timeTable").then(response2 => {
                    console.log(JSON.stringify(response2, null, 2));
                    newJson = response2.data;
                    this["lessons"] = this.curateLessonData(newJson["lessonList"]);
                    console.log(JSON.stringify(this["lessons"], null, 2)); 
                    this.createTableArray(this.timeslots, this.rooms, this.lessons);
                    this.loading = false;
                }).catch(error2 => {
                    console.log(error2);
                })

                this.loading = false;
            }).catch(error => {
              console.log(error);
            })
      },
      //creates readable clockstring in format HH:mm by attending 0s if necessary
      createClockString(hourString, minuteString) {
        let newHour = hourString.toString();
        let newMinute = minuteString.toString();

        if(newHour.length === 1) {
          newHour = "0" + newHour;
        }
        if(newMinute.length === 1) {
          newMinute = newMinute + "0";
        }

        return newHour + ":" + newMinute;
      },
      //creates a timeslot object from the java api timeslot received
      translateTimeslots(timeslotObject)
      {
        const weekdayName = {"MONDAY": 0, "TUESDAY": 1, "WEDNESDAY": 2, "THURSDAY": 3, "FRIDAY": 4, "SATURDAY": 5, "SUNDAY": 6};
        let timeslotArray = [];

        //initialize the timeslot array and change weekday names to integers for easier sorting
        for (let i = 0; i < timeslotObject.length; ++i) {

          let newTimeSlotObject = { id: timeslotObject[i]["id"]
                                    ,dayOfWeek: weekdayName[timeslotObject[i]["dayOfWeek"]]
                                    ,dayOfWeekName: timeslotObject[i]["dayOfWeek"]
                                    ,startTime: this.createClockString(timeslotObject[i]["startTime"][0], timeslotObject[i]["startTime"][1])
                                    ,endTime: this.createClockString(timeslotObject[i]["endTime"][0], timeslotObject[i]["endTime"][1])
                                  };
          timeslotArray.push(newTimeSlotObject);
        }

        //sort the array in ascending order
        for(let i = 0; i < timeslotArray.length - 1; ++i) {
          for(let j = i + 1; j < timeslotArray.length; ++j) {
            
            if(this.compareTimeslots(timeslotArray[i], timeslotArray[j])) {
              timeslotArray = this.swapIndexes(timeslotArray, i, j);
            }
          }
        }

        let newTimeslotObject = {};

        //create new Object for timeslot
        for(let i = 0; i < timeslotArray.length; ++i) {
          newTimeslotObject[timeslotArray[i]["id"]] = timeslotArray[i];
        }

        return newTimeslotObject;
      },
      //swap 2 positions in array (for sorting out the time variables mainly)
      swapIndexes(arr, index1, index2) {

        let tempVar = arr[index1];
        let tempInd = arr[index1]["id"];
        arr[index1] = arr[index2];
        arr[index2] = tempVar;
        arr[index1]["id"] = arr[index2]["id"];
        arr[index2]["id"] = tempInd;

        return arr;
      },
      //assumes there are no 2 time slots that are the same returns true if timeObject1 > timeObject2
      compareTimeslots(timeObject1, timeObject2) {

        if(timeObject1["dayOfWeek"] > timeObject2["dayOfWeek"]) {
          return true;
        }
        else if(timeObject1["dayOfWeek"] === timeObject2["dayOfWeek"]) {

          if(timeObject1["startTime"] === timeObject2["startTime"]) {
            //not possible but just in case
          }
          else if(timeObject1["startTime"] > timeObject2["startTime"]) {
            return true;
          }
        }

        return false;

      },
      //creates the table array that gets used to fill out the school planner
      createTableArray(timeslots, rooms, lessons)
      {
        let newTableArray = {};

        //initialize an empty table consisting of time slot and lessons
        for (const time in timeslots) {

          //create a new array to house the room number under the 
          newTableArray[timeslots[time]["id"]] = {};

          for (const room in rooms) {
            newTableArray[timeslots[time]["id"]][rooms[room]["id"]] = {};
          }
        }

        //fill in the table with the lessons
        for (const lesson in lessons) {
            if(lessons[lesson]["timeslot"] && lessons[lesson]["room"]) {
                newTableArray[lessons[lesson]["timeslot"]][lessons[lesson]["room"]] = lessons[lesson]; 
            }
        }
        
        //console.log(JSON.stringify(newTableArray, null, 2));
        this.tableArray = newTableArray;
      }
    },
    mounted() {
      this.getJson();
      //this.createTableArray();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

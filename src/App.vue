<template>
    <v-app>
      <SchoolPlannerContainer/>
    </v-app>
</template>

<script>
import SchoolPlannerContainer from './components/SchoolPlannerContainer';

export default {
  name: 'App',

  components: {
    SchoolPlannerContainer
  },

  data: () => ({
    //
  }),
};
</script>

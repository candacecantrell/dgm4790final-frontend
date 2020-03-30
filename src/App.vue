
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
//import ApolloExample from './components/ApolloExample';
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  components: {
    //ApolloExample,
    HelloWorld
  },
  data: () => ({
    //
  }),
};
</script>

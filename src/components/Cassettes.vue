<template>
 <!-- Apollo watched Graphql query -->
  <ApolloQuery :query="require('../graphql/searchCassettes.gql')"
  :variables="{ searchString }">
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div class="pageWidth">
          <div class="text-center">
  </div>
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>
      
      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-row>
          <v-col cols="4" v-for="(item, i) in data.searchCassettes" :key="i">
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <div>{{ item.price }}</div>
                <p class="cassetteTitle">
                  {{ item.title }}
                </p>
                <p>{{ item.artist }}</p>
                <div class="text--primary">
                  {{ item.genre }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4">
                  Learn More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
// import gql from 'graphql-tag'

// const ALL_CASSETTES = gql`
// query searchCassettes {
//   searchCassettes {
//     title
//     artist
//     price
//     genre
//   }
// }`

// const SEARCH_CASSETTES = gql`
// query searchCassettes ($searchString: String) {
//   searchCassettes (searchString: $searchString) {
//     title
//     artist
//     price
//     genre
//   }
// }`
  export default {
    name: 'home',

    data: () => ({

    }),
  }
</script>
<style scoped>
@media only screen and (max-width: 1200px) {
 .pageWidth {
   max-width: 96vw;
   margin: 0 auto;
   padding: 50px 2% 50px 2%;
 }
}
.pageWidth {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
<template>
 <!-- Apollo watched Graphql query -->
  <ApolloQuery :query="require('../graphql/HelloWorld.gql')"
  :variables="{ searchString }">
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-row>
          <v-col cols="4" v-for="(item, i) in data.Cassettes" :key="i">
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <div>{{ item.price }}</div>
                <p class="courseName">
                  {{ item.title }}
                </p>
                <p>{{ item.artist }}</p>
                <div class="text--primary">
                  {{ item.genre | truncate(200) }}
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
    </template>
  </ApolloQuery>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      searchString: "pop"
    }),
  }
</script>
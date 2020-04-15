<template>
      <div class="pageWidth">
          <div class="text-center">
  </div>
        <v-row>
          <v-col cols="4" v-for="(item, i) in Cassettes.data.searchCassettes" :key="i">
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
                <p>id: {{ item.id}}</p>
              </v-card-text>
              <v-card-actions>
                <template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" ><v-icon>mdi-circle-edit-outline</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Cassette</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newtitle" label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newartist" label="Artist" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Genre*"
                  v-model="newgenre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newprice" label="Price*" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newid" label="Id*" type="text" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
</template>

<script>
import gql from 'graphql-tag'

const ALL_CASSETTES = gql`
query searchCassettes {
  searchCassettes {
    title
    artist
    price
    genre
    id
  }
}`

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

    data() {
        return {
        dialog: false,
        Cassettes: [],
        ListCassettes: {
        newtitle: '',
        newartist: '',
        newgenre: '',
        newprice: 0,
        }
        }

    },
    methods: {
        refetch () {
            this.$apollo.queries.ALL_CASSETTES.refetch()
        },

        mutationEditCassette () {
            
        }
    },
  created: function () {
    this.ListCassettes.newtitle = this.Cassettes.data.SearchCassettes.title
    this.ListCassettes.newprice = this.Cassettes.price.SearchCassettes.price
    this.ListCassettes.newartist = this.Cassettes.artist.SearchCassettes.artist
    this.ListCassettes.newprice = this.Cassettes.price.SearchCassettes.price
  },

async mounted () {
    this.Cassettes = await this.$apollo.query({
        query: ALL_CASSETTES,
    })
    console.log(this.Cassettes.data.searchCassettes)


}
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
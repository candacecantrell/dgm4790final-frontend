<template>
      <div class="pageWidth">
          <div class="text-center">
  </div>
        <v-row>
          <v-col :class="{ active: i === activeItem}"
          cols="4" v-for="(item, i) in currentCassettes" :key="i"
          >
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <v-card-title v-model="item.title">{{ item.title }}</v-card-title>
                <v-card-subtitle  v-model="item.artist">{{ item.artist }}</v-card-subtitle>
                <v-card-text label="Current Genre" v-model="item.genre">{{item.genre}}</v-card-text>
                <v-card-text label="Current Price" v-model="item.price">{{item.id}}</v-card-text>
                <v-card-text v-model="item.id"></v-card-text>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="mutationDeleteCassette(i), updateCassette()" icon><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
                                <template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
     {{ snackbartitle }} Cassette Deleted
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
      </div>
</template>

<script>
import gql from 'graphql-tag'

// const ALL_CASSETTES = gql`
// query searchCassettes {
//   searchCassettes {
//     title
//     artist 
//     price
//     genre
//     id
//   }
// }`

// import EDIT_CASSETTE from '../graphql/EditCassette.gql'

// const EDIT_CASSETTE = gql`
// mutation UpdateCassette ($id: ID, $title: String, $artist: String, $genre: String, $price: Float) {
//   updateCassette (
//         id: $id,
//     title: $title,
//     artist: $artist,
//     genre: $genre,
//     price: $price,
//     ) {
//       id
//       title
//       artist
//       price
//       genre
//   }
// }
// `

const DELETE_CASSETTE = gql`
mutation deleteOneCassette($id: String) {
    deleteOneCassette(where: {id: $id}) {
        id
        title
        artist
        price
        genre
    }}`

  export default {
    name: 'deletecassette',

    data() {
        return {
          snackbar: false,
          snackbartitle: 'default',
        dialog: false,
        Cassettes: [],
        currentCassettes: [],
        newtitle: 'default title',
        newartist: 'default artist',
        newgenre: 'default genre',
        newprice: 0,
        newid: 'default id',
        editableCassette: [],
        activeItem: {},
        componentKey: 0,
        }

    },
    methods: {
      updateCassette () {
         this.$apollo.queries.searchCassettes.refetch()

      },
        mutationDeleteCassette (i) {
          this.$apollo.queries.searchCassettes.refetch()
            this.activeItem = i
            console.log(this.activeItem)
            const editTitle = this.currentCassettes[i].title 
            console.log(editTitle)
            const editArtist = this.currentCassettes[i].artist
            const editGenre = this.currentCassettes[i].genre
            const editPrice = this.currentCassettes[i].price
            const getId = this.currentCassettes[i].id
            //console.log(getId)
      this.$apollo.mutate({
        mutation: DELETE_CASSETTE,
        variables: {
            id: getId,
          title: editTitle,
          artist: editArtist,
          price: editPrice,
          genre: editGenre 
        },
        
      })
      this.$apollo.queries.searchCassettes.refetch()
      this.currentCassettes[i].title = editTitle
      this.currentCassettes[i].artist = editArtist
      this.currentCassettes[i].genre = editGenre
      this.currentCassettes[i].price = editPrice
      this.currentCassettes[i].id = getId 
      this.$apollo.queries.searchCassettes.refetch()
          //this.Cassettes.data.searchCassettes[i].id = getId
          // this.Cassettes.data.searchCassettes[i].title = editTitle
          // this.Cassettes.data.searchCassettes[i].artist = editArtist
          // this.Cassettes.data.searchCassettes[i].price = editPrice
          // this.Cassettes.data.searchCassettes[i].genre = editGenre
          // this.Cassettes.data.searchCassettes[i].id = getId
          console.log(this.currentCassettes)
          this.snackbartitle = this.currentCassettes[i].title
          this.snackbar = true
    },
            
        },
async created () {
  this.$apollo.queries.searchCassettes.refetch()
    // this.Cassettes = await this.$apollo.query({
    //     query: ALL_CASSETTES,
    // })
    // this.currentCassettes = this.Cassettes.data.searchCassettes
    // console.log(this.currentCassettes)
    // this.$apollo.queries.searchCassettes.fetch()

  

},
apollo: {
  searchCassettes: {

    query: gql`query searchCassettes{
  searchCassettes{
    title
    artist 
    price
    genre
    id
  }
}`,
variables() {
  return {
  title: this.Cassettes.data.searchCassettes.title,
  artist: this.Cassettes.data.searchCassettes.artist,
  price: this.Cassettes.data.searchCassettes.price,
  genre: this.Cassettes.data.searchCassettes.genre,
  id: this.Cassettes.data.searchCassettes.id,
  }
},
update (data) {
      //console.log(data)
      this.currentCassettes = data.searchCassettes
      console.log(this.currentCassettes)
      return this.currentCassettes
    },
  },
},
  }
</script>
<style scoped>
@media only screen and (max-width: 1200px) {
 .pageWidth {
   max-width: 96vw;
   margin: 0 auto;
   padding: 50px 4% 50px 4%;
 }
}
.pageWidth {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
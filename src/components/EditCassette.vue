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
                <v-text-field
                label="Current Title" v-model="item.title">{{ item.title }}</v-text-field>
                <v-text-field label="Current Artist" v-model="item.artist">{{ item.artist }}</v-text-field>
                <v-text-field label="Current Genre" v-model="item.genre">{{ item.genre }}</v-text-field>
                <v-text-field label="Current Price" v-model="item.price">{{ item.price }}</v-text-field>
                <div><p>id: {{item.id}}</p></div>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="mutationEditCassette(i)" icon><v-icon>mdi-circle-edit-outline</v-icon></v-btn>
              </v-card-actions>
              
            </v-card>
          </v-col> 
        </v-row>
        <template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar" 
    >
     {{ this.snackbartitle }} Cassette Edited
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

const EDIT_CASSETTE = gql`
mutation UpdateCassette ($id: ID, $title: String, $artist: String, $genre: String, $price: Float) {
  updateCassette (
        id: $id,
    title: $title,
    artist: $artist,
    genre: $genre,
    price: $price,
    ) {
      id
      title
      artist
      price
      genre
  }
}
`

  export default {
    name: 'home',

    data() {
        return {
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
      snackbar: false,
      snackbartitle: 'default',
      text: 'Cassette Edited',
        }

    },
    methods: {
        mutationEditCassette (i) {
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
        mutation: EDIT_CASSETTE,
        variables: {
            id: getId,
          title: editTitle,
          artist: editArtist,
          price: editPrice,
          genre: editGenre 
        },
      })
    //   this.currentCassettes[i].title = editTitle
    //   this.currentCassettes[i].artist = editArtist
    //   this.currentCassettes[i].genre = editGenre
    //   this.currentCassettes[i].price = editPrice
    //   //this.currentCassettes[i].id = getId
          //this.Cassettes.data.searchCassettes[i].id = getId
          this.snackbartitle = editTitle
          this.snackbar = true 
          this.Cassettes.data.searchCassettes[i].title = editTitle
          this.Cassettes.data.searchCassettes[i].artist = editArtist
          this.Cassettes.data.searchCassettes[i].price = editPrice
          this.Cassettes.data.searchCassettes[i].genre = editGenre
          
    },
            
        },
async mounted () {
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
   padding: 50px 2% 50px 2%;
 }
}
.pageWidth {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
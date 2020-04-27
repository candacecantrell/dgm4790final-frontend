<template>
<div class="pageWidth">
         <div class="popCassetteDiv">
          <v-row>
          <v-col cols="4" v-for="(item, i) in searchCassettes" :key="i">
          <v-card class="mx-auto" max-width="350">
              <v-img
              eager="true"
              :src="require(`@/static/img/${item.image}.jpg`)"
              ></v-img>
              <v-card-title class="cassetteTitle">
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  {{ item.artist }}
                </v-card-subtitle>
              <v-card-text>
                <p>{{ item.genre }}</p>
                <div class="priceText">${{ item.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined="" color="black"
                @click="AddToBag(i)"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
                            <template>
  <div class="text-center">

    <v-snackbar
      v-model="snackbar"
      :right="x === 'right'"
      :top="y === 'top'"
      color="white"
      class="snackbarStyle"
    >
      {{ this.snackbartitle }} Added to Cart  
      <v-icon class="cartIcon">mdi-cart</v-icon>
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
          </div>
          </div>
</template>

<script>
import gql from 'graphql-tag'
//import * as cassetteImg from '@/assets/cassetteImg2.jpg'

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
    name: 'cassettes',

    data: () => ({
      cassetteImg: "cassetteImg2",
                  x: 'right',
        y: 'top',
       snackbartitle: 'default',
       snackbar: false,
      searchedCassette: {
      searchedtitle: 'searched',
      searchedartist: 'searched',
      searchedgenre: 'searched',
      searchedimage: '/image.jpg',
      searchedprice: 0.00,
      },
      bagItem: {
        title: '',
        artist: '',
        price: '',
        genre: '',
      },
      activeItem: {},
      itemsAdded: [], 
      storedItem: [],
      cassettes: [],

    }),
    apollo: {
    searchCassettes: {
    query: gql`query searchCassettes($searchString: String) {
  searchCassettes(searchString: $searchString) {
    title
    artist 
    price
    genre
    image
  }
}`,
variables() {
  return {
    title: this.searchedCassette.searchedtitle,
    artist: this.searchedCassette.searchedartist,
    price: this.searchedCassette.searchedprice,
    genre: this.searchedCassette.searchedgenre,
    image: this.searchedCassette.searchedimage,
    searchString: this.searchstring
  }
},
update (data) {
        this.cassettes = data.searchCassettes
      console.log(this.cassettes)
      return data.searchCassettes
    },
  },
},
    methods: {
                  AddToBag(i) {
    this.activeItem = i
    this.itemsAdded = this.$store.getters.storeItem
    console.log(this.itemsAdded)
    this.storedItem.title = this.cassettes[i].title
    this.storedItem.artist  = this.cassettes[i].artist
    this.storedItem.genre = this.cassettes[i].genre
    this.storedItem.price = this.cassettes[i].price
    this.storeItem.image = this.cassettes[i].image
    //const storedItem = this.storeItem
    const storedItem = this.storedItem
    console.log(this.cassettes[i].title) 
    this.$store.commit('baggedItem', {
      storeItem: storedItem
    })
            this.snackbartitle = this.cassettes[i].title
    this.snackbar = true
        this.storedItem = []
},
getImgUrl(pic) {
  pic = this.cassettes[3].image
    return require('../assets/'+pic)
}

    },
    mounted: {
      addToCart() {

      }
    }
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
.snackbarStyle {
    color: #000;
}
.cartIcon {
    float: right;
}
.priceText {
  font-size: 18px;
}
</style>
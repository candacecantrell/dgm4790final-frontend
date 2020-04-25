<template>
  <div class="pageWidth">
           <div class="popCassetteDiv">
          <div><h2 class="divTitle">Sale Cassettes</h2></div>
          <v-row>
          <v-col cols="4" v-for="(item, i) in priceCassettes" :key="i">
          <v-card class="mx-auto" max-width="350">
              <v-img
              src="../assets/cassetteImg2.jpg"
              ></v-img> 
              <v-card-title class="cassetteTitle">
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  {{ item.artist }}
                </v-card-subtitle>
              <v-card-text> 
                <p>{{ item.genre }}</p>
                <div class="fullprice">${{ item.price*2 }}</div>
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
          </div>
          <div>
                <div><h2 class="divTitle">Sale Vinyl</h2></div>
        <v-row>
          <v-col cols="4" v-for="(item, i) in this.salevinyls" :key="i">
          <v-card class="mx-auto" max-width="350">
              <v-img
              src="../assets/vinylImg4.jpg"
              ></v-img>
              <v-card-title class="cassetteTitle">
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  {{ item.artist }}
                </v-card-subtitle>
              <v-card-text>
                <p>{{ item.description }}</p>
                <div class="fullprice">${{ item.price*2 }}</div>
                <div class="priceText">${{ item.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined="" color="black"
                @click="BagVinyl(i)"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
          </div>
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
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "saleitems", 

   data: () => ({
            x: 'right',
        y: 'top',
       snackbartitle: 'default',
       snackbar: false,
      allBaggedItems: [],
      itemsBagged: [],
      activeItem: {},
      cassettes: [],
        storedItem: {
        title: '',
        artist: '',
        price: 0,
        genre: '',
      },
      priceHigh: 10.00,
      searchedCassette: {
      searchedtitle: 'searched',
      searchedartist: 'searched',
      searchedgenre: 'searched',
      searchedprice: 0.00,
      },
      salevinyls: [],
      fullPriceVinyl: 5.00,
      fullPriceCassette: {},
   }),
   apollo: {
          priceCassettes: {
    query: gql`query priceCassettes($priceHigh: Float) {
  priceCassettes(priceHigh: $priceHigh) {
    title
    artist 
    price
    genre
  }
}`,
variables() {
  return {
    title: this.searchedCassette.searchedtitle,
    artist: this.searchedCassette.searchedartist,
    price: this.searchedCassette.searchedprice,
    genre: this.searchedCassette.searchedgenre,
    priceHigh: this.priceHigh,
  }
},
update (data) {
    this.cassettes = data.priceCassettes
    console.log(this.cassettes)
      return data.priceCassettes
    },
  },
   },
   methods: {
           getSaleVinyl: function() {
               
      fetch('https://gentle-tundra-60449.herokuapp.com/shop/products-sale',
      {
          method: 'GET',
      })
      .then(response => {
         response.json().then(data => {
             this.salevinyls = data
           return this.salevinyls
        })
      }) 
          .catch(error => {
          return console.error(error)
      })
  },

                    AddToBag(i) {
    this.activeItem = i
    this.itemsAdded = this.$store.getters.storeItem
    console.log(this.itemsAdded)
    this.storedItem.title = this.cassettes[i].title
    this.storedItem.artist  = this.cassettes[i].artist
    this.storedItem.genre = this.cassettes[i].genre
    this.storedItem.price = this.cassettes[i].price
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
                    BagVinyl(i) {
    this.activeItem = i
    this.itemsAdded = this.$store.getters.storeItem
    console.log(this.itemsAdded)
    this.storedItem.title = this.salevinyls[i].title
    this.storedItem.artist  = this.salevinyls[i].artist
    this.storedItem.genre = this.salevinyls[i].description
    this.storedItem.price = this.salevinyls[i].price
    //const storedItem = this.storeItem
    const storedItem = this.storedItem
    console.log(this.salevinyls[i].title) 
    this.$store.commit('baggedItem', {
      storeItem: storedItem
    })
    this.snackbartitle = this.salevinyls[i].title
    this.snackbar = true
        this.storedItem = []
},
   },
//    beforeCreate: {
//        getSaleVinyl: function() {
//       fetch('http://localhost:3000/shop/products-sale',
//       {
//           method: 'GET',
//       })
//       .then(response => {
//          response.json().then(data => {
//            return this.salevinyls = data
//         })
//       }) 
//           .catch(error => {
//           return console.error(error)
//       })
//    },
//    },
   created: function() {

this.getSaleVinyl()
console.log(this.salevinyls)
//        getSaleVinyl() {
//       fetch('http://localhost:3000/shop/products-sale',
//       {
//           method: 'GET',
//       })
//       .then(response => {
//          response.json().then(data => {
//            return this.salevinyls = data
//         })
//       }) 
//           .catch(error => {
//           return console.error(error)
//       })
//   },
   },
    
}
</script>

<style scoped>
.pageWidth {
    margin: 50px 4% 50px 4%;
}
.fullprice {
    text-decoration: line-through;
    color: #D32F2F;
    font-size: 18px;
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
/* text-decoration: line-through; */
</style>
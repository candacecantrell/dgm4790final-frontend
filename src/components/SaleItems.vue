<template>
  <div class="pageWidth">
           <div class="popCassetteDiv">
          <div><h2 class="divTitle">Sale Cassettes</h2></div>
          <v-row>
          <v-col cols="4" v-for="(item, i) in priceCassettes" :key="i">
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <p class="cassetteTitle">
                  {{ item.title }}
                </p>
                <p>{{ item.artist }}</p>
                <div class="text--primary">
                  {{ item.genre }}
                </div>
                <div>{{ item.price }}</div>
                <div class="fullprice">{{item.price*2}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined="" color="black">
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
              <v-card-text>
                <div>{{ item.title }}</div>
                <p class="courseName">
                  {{ item.artist }}
                </p>
                <p>{{ item.description }}</p>
                <div class="text--primary">
                 {{ item.price }}
                </div>
                <div class="fullprice">{{item.price*2}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined="" color="black">
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
          </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "saleitems",

   data: () => ({
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
//       created: function() {
//        fetch('http://localhost:3000/shop/products-sale',
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
//       this.getSaleVinyl()
//       this.getSaleVinyl()
//    },
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
    console.log(data)
      return data.priceCassettes
    },
  },
   },
   methods: {
           getSaleVinyl: function() {
               
      fetch('http://localhost:3000/shop/products-sale',
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
}
/* text-decoration: line-through; */
</style>
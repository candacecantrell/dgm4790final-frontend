<template>
<div>
          <v-row class="cardrow">
  <v-stepper v-model="e1" class="cardrow">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" color="black" step="1"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" color="black" step="2"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="black" step="3"></v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12 vinylCard"
          color="white"
          height="300px">
          <div class="vinylText">
        <h2>Shop Cassettes</h2>
        <p>{{ title }}</p>
        <p>{{ genre }}</p>
        <p>{{ artist }}</p>
        <p>{{ price }}</p>
        <v-btn outlined="" color="black">
                  View all Cassettes
                </v-btn>
        </div>
        <div>
        <v-img src="../assets/cassetteImg.jpg"
        class="vinylImg"
        max-width="400"
      max-height="200"
        ></v-img>
                </div>
        </v-card>

        <v-btn
        class="slideBtn"
          color="black"
          @click="e1 = 2, getOneVinyl()"
        >
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12 vinylCard"
          color="white"
          height="300px">
          <div class="vinylText">
          <h2>New Vinyls</h2>
        <p>{{ VinylDetails.vinyltitle }}</p>
        <p>{{ VinylDetails.vinylartist }}</p>
        <p>{{ VinylDetails.vinylgenre }}</p> 
        <p>{{ VinylDetails.vinylprice }}</p> 
        <v-btn outlined="" color="black">
                  View all Vinyl
                </v-btn>
          </div>
        <v-img src="../assets/vinylImg2.jpg"
        class="vinylImg"
        max-width="300"
      max-height="200"
        ></v-img>
          </v-card>

        <v-btn
        class="slideBtn"
          color="black"
          @click="e1 = 3"
        >
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="white"
          height="300px"
        ></v-card>

        <v-btn
        class="slideBtn"
          color="black"
          @click="e1 = 1"
        >
          Next
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
          </v-row>
          <div class="popCassetteDiv">
          <div><h2 class="divTitle">New Pop Cassettes</h2></div>
          <v-row>
          <v-col cols="4" v-for="(item, i) in searchCassettes" :key="i">
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
    name: 'home',

    data: () => ({
      e1: 1,
      searchstring: 'pop',
      searchedCassette: {
      searchedtitle: 'searched',
      searchedartist: 'searched',
      searchedgenre: 'searched',
      searchedprice: 0.00,
      },
      title: 'default',
      artist: 'default',
      price: 0.00,
      genre: 'default',
      id: "ck98t2v0t00033lwbh3dmh91k",
      VinylDetails: { 
      vinyltitle: 'default',
      vinylartist: 'default',
      vinylprice: 0.00,
      vinylgenre: 'default',
      productId: '5e59cd64da65f831fbddf345',
      },
      vinyls: [],
    }),
    apollo: {
  Cassette: {

    query: gql`query Cassette($id: ID) {
  Cassette(id: $id) {
    title
    artist 
    price
    genre
    id
  }
}`,
variables() {
  return {
    id: this.id,
    title: this.title,
    artist: this.artist,
    price: this.price,
    genre: this.genre
  }
},
update (data) {
      //console.log(data)
      console.log(data)
      this.id = data.Cassette.id
      this.title = data.Cassette.title
      this.artist = data.Cassette.artist
      this.price = data.Cassette.price
      this.genre = data.Cassette.genre
      return data
    },
  },
    searchCassettes: {
    query: gql`query searchCassettes($searchString: String) {
  searchCassettes(searchString: $searchString) {
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
    searchString: this.searchstring
  }
},
update (data) {
      return data.searchCassettes
    },
  },
  
},
      mounted() {
      fetch('http://localhost:3000/shop/shop-products')
      .then(response => response.json())
         .then(result => {
        this.vinyls = result;
        console.log(this.vinyls)
      })
    },
methods: {
          getOneVinyl() {
            this.VinylDetails.title = this.vinyls[3].title 
            this.VinylDetails.artist = this.vinyls[3].artist
            this.VinylDetails.description = this.vinyls[3].description
            this.VinylDetails.price = this.vinyls[3].price
            this.VinylDetails.productId = this.vinyls[3]._id
      fetch('http://localhost:3000/shop/product-id',
      {
          method: 'POST',
          body: JSON.stringify(this.VinylDetails),
          mode:"cors",
          headers: {
          "content-type": "application/json",
          'Accept': 'application/json'
          },

      }) 
      .then(response => response.json())
      .then(result => {
          if (result.details) {
            // there was an error...
            const error = result.details
            this.oneVinyl = result
              .map(detail => detail.getVinyl)
              .join(". ");
            this.error = error;
          } 
          else {
            console.log(this.VinylDetails)
            this.VinylDetails.vinyltitle = this.VinylDetails.title
            this.VinylDetails.vinylartist = this.VinylDetails.artist
            this.VinylDetails.vinylgenre = this.VinylDetails.genre
            this.VinylDetails.vinylprice = this.VinylDetails.price
            // this.error = "";
            // this.oneVinyl.splice(this.VinylDetails.productId);
            // // this.vinyls.join()
            // console.log(this.VinylDetails)
          }
      })

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

@media only screen and (max-width: 1200px) {
  /* .vinylText {
    padding-left: 50px;
  } */
}


.pageWidth {
  max-width: 1200px;
  margin: 0 auto;
}
.vinylImg {
  /* display: flex;
  justify-content: flex-end; */
  float: right;
  height: 100%;
}
.vinylCard {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cardrow {
  width: 100vw;
}
.popCassetteDiv {
  margin: 50px 4% 50px 4%;
}
.divTitle {
  margin: 30px 0 30px 0;
}

.slideBtn {
  color: white;
}
</style>
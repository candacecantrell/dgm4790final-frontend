 <template>
  <div class="pageWidth">
        <v-row>
          <v-col cols="4" v-for="(item, i) in vinyls" :key="i">
          <v-card class="mx-auto" max-width="350">
              <v-img
              src="../assets/vinylImg3.jpg"
              ></v-img>
              <v-card-title class="cassetteTitle">
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  {{ item.artist }}
                </v-card-subtitle>
              <v-card-text>
                <p>{{ item.description }}</p>
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
export default {
  name: "allvinyl",

   data: () => ({
                 x: 'right',
        y: 'top',
       snackbartitle: 'default',
       snackbar: false,
           allBaggedItems: [],
      itemsBagged: [],
      activeItem: {},
    vinyls: [],
            storedItem: {
        title: '',
        artist: '',
        price: 0,
        genre: '',
      },
  }),
  methods: {
    getAllProducts() {
      fetch('https://gentle-tundra-60449.herokuapp.com/shop/shop-products',
      {
          method: 'GET',
      })
      .then(response => {
         response.json().then(data => {
           return this.vinyls = data
        })
      }) 
          .catch(error => {
          return console.error(error)
      })
  },
                      BagVinyl(i) {
                        
    this.activeItem = i
    console.log(this.vinyls)
    this.itemsAdded = this.$store.getters.storeItem
    console.log(this.itemsAdded)
    this.storedItem.title = this.vinyls[i].title
    this.storedItem.artist  = this.vinyls[i].artist
    this.storedItem.genre = this.vinyls[i].description
    this.storedItem.price = this.vinyls[i].price
    //const storedItem = this.storeItem
    const storedItem = this.storedItem
    console.log(this.vinyls[i].title) 
    this.$store.commit('baggedItem', {
      storeItem: storedItem
    })
            this.snackbartitle = this.vinyls[i].title
    this.snackbar = true
        this.storedItem = []
},
  },
  created: function () {
    this.getAllProducts()
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
  padding-top: 50px;
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
 <template>
  <div class="pageWidth">
        <v-row>
          <v-col cols="4" v-for="(item, i) in vinyls" :key="i">
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <div>{{ item.title }}</div>
                <p class="courseName">
                  {{ item.description }}
                </p>
                <p>{{ item.artist }}</p>
                <div class="text--primary">
                  {{ item.price }}
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
    </template>

<script>
export default {
  name: "allvinyl",

   data: () => ({
    vinyls: [],
  }),
  methods: {
    getAllProducts() {
      fetch('http://localhost:3000/shop/shop-products',
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
   padding: 50px 2% 50px 2%;
 }
}
.pageWidth {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
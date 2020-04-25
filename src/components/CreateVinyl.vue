<template>
<div class="pageWidth">
    <v-form>
      <v-container class="pageContainer">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="VinylDetails.title" 
            placeholder="Vinyl Title" 
            label="Vinyl Title"
            type="text"
            required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="VinylDetails.artist" 
            placeholder="Artist" 
            type="text"
            label="Artist"></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" md="12"> 
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="VinylDetails.description" 
            placeholder="Genre" 
            type="text"
            label="Genre"></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
          <v-text-field single-line
            outlined
            clearable
            v-model="VinylDetails.price" 
            placeholder="23.98"
            class="inputClass"
            type="text" 
            label="price"></v-text-field>
          </v-col>
        </v-row>
        <div class="submitBtn">
        <v-btn large outlined @click="AddVinyl()">Add Vinyl</v-btn>
        </div>
      </v-container>
    </v-form>
        <template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
     {{ snackbartitle }} Vinyl Created
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
//import axios from 'axios'

export default {
  name: "createvinyl",
    data: () => ({
      snackbar: false,
      snackbartitle: 'default',
    vinyls: [],
    VinylDetails: {
    title: 'Vinyl Title',
    artist: 'Artist',
    description: 'Genre',
    price: 23.99,
    id: 'id',
    }
  }),
      mounted() {
      fetch('https://localhost:3000/shop/shop-products')
      .then(response => response.json())
         .then(result => {
        this.messages = result;
      })
    },
  methods: {
          AddVinyl() {
              console.log(this.VinylDetails)
      fetch('https://gentle-tundra-60449.herokuapp.com/shop/add-product',
      {
          method: 'POST',
          body: JSON.stringify(this.VinylDetails),
          headers: {
          "content-type": "application/json",
          'Accept': 'application/json'
          }
      }) 
      .then(response => response.json())
      .then(result => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map(detail => detail.VinylDetails)
              .join(". ");
            this.error = error;
          } else {
            console.log(this.VinylDetails)
            this.error = "";
            this.vinyls.push(result);
          }
      })
  this.snackbar = true;
  this.snackbartitle = this.VinylDetails.title
  },
}
}
</script>
<style scoped>
@media only screen and (max-width: 800px) {
 .pageWidth {
   max-width: 96vw;
   margin: 0 auto;
   padding: 50px 4% 50px 4%;
 }
}
.pageWidth {
  max-width: 800px;
  margin: 0 auto;
}
</style>
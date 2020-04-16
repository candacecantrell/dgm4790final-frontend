<template>
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
          <v-col cols="12" md="2">
          <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="VinylDetails.price" 
            placeholder="23.98" 
            type="number" 
            label="price"></v-text-field>
          </v-col>
        </v-row>
        <div class="submitBtn">
        <v-btn large outlined @click="AddVinyl()">Add Vinyl</v-btn>
        </div>
      </v-container>
    </v-form> 
</template>

<script>
//import axios from 'axios'

export default {
  name: "allvinyl",
    data: () => ({
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
      fetch('http://localhost:3000/shop/shop-products')
      .then(response => response.json())
         .then(result => {
        this.messages = result;
      })
    },
  methods: {
          AddVinyl() {
              console.log(this.VinylDetails)
      fetch('http://localhost:3000/shop/add-product',
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

  },
}
}
</script>
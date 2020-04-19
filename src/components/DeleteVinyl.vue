<template>
      <div class="pageWidth">
          <div class="text-center">
  </div>
        <v-row>
          <v-col :class="{ active: i === activeItem}"
          cols="4" v-for="(item, i) in vinyls" :key="i"
          >
            <v-card class="mx-auto" max-width="350">
              <v-card-text>
                <v-text-field
                label="Current Title" v-model="item.title">{{ item.title }}</v-text-field>
                <v-text-field label="Current Artist" v-model="item.artist">{{ item.artist }}</v-text-field>
                <v-text-field label="Current Genre" v-model="item.description">{{ item.description }}</v-text-field>
                <v-text-field label="Current Price" v-model="item.price">{{ item.price }}</v-text-field>
                <div><p>id: {{item._id}}</p></div>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="EditVinyl(i)" icon><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: "allvinyl",
    data: () => ({
    vinyls: [],
    activeItem: {},
    EditableVinyl: {
    title: 'Vinyl Title',
    artist: 'Artist',
    description: 'Genre',
    price: 23.99,
    productId: 'id',
    }
  }),
      mounted() {
      fetch('http://localhost:3000/shop/shop-products')
      .then(response => response.json())
         .then(result => {
        this.vinyls = result;
        console.log(this.vinyls)
      })
    },
  methods: {
          EditVinyl(i) {
              this.activeItem = i
            console.log(this.activeItem)
            this.EditableVinyl.title = this.vinyls[i].title 
            this.EditableVinyl.artist = this.vinyls[i].artist
            this.EditableVinyl.description = this.vinyls[i].description
            this.EditableVinyl.price = this.vinyls[i].price
            this.EditableVinyl.productId = this.vinyls[i]._id
            console.log(this.EditableVinyl)
            //const getId = this.vinyls[i].id
      fetch('http://localhost:3000/shop/product-delete',
      {
          method: 'POST', 
          body: JSON.stringify(this.EditableVinyl),
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
              .map(detail => detail.VinylDetails)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.vinyls.splice(i);
            this.vinyls.join()
          }
      })

  },
}
}
</script>
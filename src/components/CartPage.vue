<template>
          <div class="cartPage">
          <v-row>
          <v-col v-for="(item, i) in this.itemsBagged" :key="i">
            <v-card class="mx-auto storeCard" >
              <v-card-title>{{ item.storeItem.title }}</v-card-title>
              <v-card-subtitle class="cassetteTitle">
                  {{ item.storeItem.artist }}
              </v-card-subtitle>
              <v-card-text>
                <p>{{ item.storeItem.genre}}</p>
                <div class="text--primary">
                  ${{ item.storeItem.price }}
                </div>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
          </div>
</template>
<script>
export default {
    data: function() {
        return {
            allBaggedItems: [],
            // baggedItem: [
            // {
            //     title: 'default',
            //     artist: 'default',
            //     price: 0.00,
            //     genre: 'default'
            // }
            // ],
            itemsBagged: [],
        }
    },
    methods: {
        getCartItems() {
            console.log(this.$store.getters.storeItem)
            this.allBaggedItems = this.$store.getters.storeItem
        //console.log(this.allBaggedItems)
        const allBaggedItems = this.allBaggedItems
        //this.allBaggedItems.splice(0, 1)
        if(allBaggedItems[0].artist === "") {
            allBaggedItems.splice(0, 1)
        } else {
            this.itemsBagged = allBaggedItems
        }
        
        //console.log(allBaggedItems.splice(0, 1))
        //const allBaggedItems2 = allBaggedItems
        this.itemsBagged = allBaggedItems
        
        //console.log(this.itemsBagged[1].storeItem.artist)
        }

    },
   created: function() {
       this.getCartItems()
       //console.log(this.itemsBagged)
        // this.baggedItem.title = this.$store.getters.storeItem.storeItem.title
        // this.baggedItem.artist = this.$store.getters.storeItem.storeItem.artist
        // this.baggedItem.price = this.$store.getters.storeItem.storeItem.price
        // this.baggedItem.genre = this.$store.getters.storeItem.storeItem.genre
        // console.log(this.$store.getters.storeItem)
        // this.allBaggedItems = this.baggedItem
        // console.log(this.allBaggedItems)
        // this.itemsBagged = this.$store.getters.storeItem
        // console.log(this.itemsBagged[1].storeItem.title)
        
    //     const itemsBagged = this.itemsBagged
    //    //console.log(allBaggedItems)
    //     const objectsToArray = Object.entries(itemsBagged).map(e =>
    //         Object.assign(e[1], { key: e[0] }))
    //         console.log(objectsToArray[0].storeItem.title)
    //         //console.log(this.itemsBagged2.storeItem)
    //         this.itemsBagged2 = objectsToArray
    //         console.log(this.itemsBagged2)
        //   this.itemsBagged = objectsToArray
        // console.log(this.itemsBagged)

          //console.log(objectsToArray.storeItem)

        // console.log(this.$store.getters.storeItem.storeItem.artist)
    }
}
</script>
<style scoped>
.storeCard {
  width: 92vw; 
  max-width: 800px;
  margin: 0 auto;
}
.cartPage {
  margin: 50px 4% 50px 4%;
}
</style>
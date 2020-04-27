<template>
    <v-form>
      <v-container class="pageWidth">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="newtitle" 
            placeholder="Cassette Title" 
            label="Cassette Title" 
            required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="newartist" 
            placeholder="Cassette Artist" 
            label="Artist"></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" md="12">
            <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="newgenre" 
            placeholder="Cassette Genre" 
            label="Genre"></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
          <v-text-field single-line
            outlined
            clearable
            class="inputClass" 
            v-model="newprice" 
            placeholder="23.98" 
            type="number" 
            label="price"></v-text-field>
          </v-col>
        </v-row>
        <div class="submitBtn">
        <v-btn large outlined @click="createCassette()">create Cassette</v-btn>
        </div>
        <template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
     {{ newtitle }} {{ text }}
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
      </v-container>
    </v-form> 
</template>
<script>
//import { useQuery, useResult, useMutation} from '@vue/apollo-composable'
import gql from 'graphql-tag'
// import { required } from 'vuelidate/lib/validators'

// const MESSAGES = gql`
//   query searchCassettes {
//    searchCassettes {
//     title
//     artist
//     price
//     genre
//     }
//   }
// `
const CREATE_CASSETTE = gql`
mutation createCassette ($artist: String, $genre: String!, $price: Float, $title: String!) {
  createCassette (
    artist: $artist,
    genre: $genre,
    price: $price,
    title: $title,
  ) {
    title
    price
    artist
    genre
  }
}`
export default {
  name: "createcassette",
  data() {
    return {
      newtitle: 'Cassette Title',
      newartist: 'Cassette Artist',
      newprice: 29.98,
      newgenre: 'Cassette Genre',
      snackbar: false,
      text: 'Cassette Created',
    } 
  },
  // validations: {
	// 	newtitle: {
	// 		required,
  //   },
  //   newartist: {
	// 		required,
  //   },
  //   newprice: {
	// 		required,
  //   },
  //   newgenre: {
	// 		required,
	// 	},
	// },
  methods: {
    createCassette () {
      // if (!this.$v.$invalid) {
        // const snackbar = this.snackbar
				const newtitle = this.newtitle
        const newartist = this.newartist
        const newprice = this.newprice
        const newgenre = this.newgenre
				// try {
      this.$apollo.mutate({
        mutation: CREATE_CASSETTE,
        variables: {
          title: newtitle,
          artist: newartist,
          price: newprice,
          genre: newgenre 
        },
      //   update: (cache, { data: { createCassette } }) => {
      //   const data = cache.readQuery({ query: MESSAGES })
      //   data.searchCassettes.push(createCassette)
      //   cache.writeQuery({ query: MESSAGES, data })
      // },
          })
          
    //       .then((data) => {
    //   // Result
    //   console.log(data)
    // }).catch((error) => {
    //   // Error
    //   console.error(error)
          this.newtitle = newtitle
          this.newartist = newartist
          this.newgenre = newgenre
          this.newprice = newprice
          this.snackbar = true

		// 		})
    //   // }
    },
    },
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

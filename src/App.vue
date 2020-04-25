<template>
  <v-app>
        <v-toolbar>
          <v-icon class="musicIcon">mdi-music</v-icon>
          <v-toolbar-title>the audio shop</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>

           <router-link href="/cart-page" class="menu-link" to="cart-page"> <v-icon>mdi-cart</v-icon></router-link>
          </v-btn>
          <template v-slot:extension> 
        <v-tabs
          align-with-title
        >
        <v-tab href="/"><router-link class="menu-link" to="/">Home</router-link></v-tab>
          <v-tab href="/all-cassettes"><router-link class="menu-link" to="all-cassettes">Cassettes</router-link>
          </v-tab>
          <v-tab href="/all-vinyl"><router-link class="menu-link" to="all-vinyl">Vinyl</router-link></v-tab>
          <v-tab href="/sale-items"><router-link class="menu-link" to="sale-items">Sale</router-link></v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
      </template>
        </v-toolbar>

    <v-content>
      <div>
      </div>
      <router-view/>
    </v-content>
      <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/create-cassette" class="menu-link" to="add-cassette">create cassette</router-link>
      </v-btn>
            <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/edit-cassette" class="menu-link" to="edit-cassette">edit cassette</router-link>
      </v-btn>
            <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/delete-cassette" class="menu-link" to="delete-cassette">delete cassette</router-link>
      </v-btn>
            <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/create-vinyl" class="menu-link" to="create-vinyl">create vinyl</router-link>
      </v-btn>
            <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/edit-vinyl" class="menu-link" to="edit-vinyl">edit vinyl</router-link>
      </v-btn>
            <v-btn
        color="white"
        text
        rounded
        class="my-4"
      >
    <router-link href="/delete-vinyl" class="menu-link" to="delete-vinyl">delete vinyl</router-link>
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>

  
</template>
<script>
  export default {
      name: 'App',
    data () {
      return {
        tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content', href:'all-cassettes' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],
      }
    },
  }
</script>
<style scoped>

.musicIcon {
  margin-right: 10px;
}
.menu-link {
  text-decoration: none;
  color: black;
}
</style>

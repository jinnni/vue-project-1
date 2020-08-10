<template>
  <!-- <v-app-bar app color="primary" dark> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span> -->
    <Drawer/>
  <!-- </v-app-bar> -->
  
</template>

<script>

import Drawer from '@/components/Drawer.vue'
export default {
  name: "Home",
  data:() => {
    return {}
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  components: {
    Drawer
  }
};
</script>

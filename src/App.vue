<template>
  <v-app>
    <AppHeader />
    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
export default {
  components: {
    AppHeader
  }
};
</script>

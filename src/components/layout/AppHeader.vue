<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <img class="mr-5" height="50" src="@/assets/logo.svg" />

      <v-btn class="d-none d-md-inline-flex" to="/" text> Formulário </v-btn>

      <v-btn class="d-none d-md-inline-flex" to="/news" text> Novidades </v-btn>

      <v-btn class="d-md-none" to="/" x-small text> Formulário </v-btn>

      <v-btn class="d-md-none" to="/news" x-small text> Novidades </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>

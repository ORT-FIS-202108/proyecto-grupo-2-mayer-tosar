<template>
  <v-footer :absolute="true" app>
    <span
      >&copy; {{ new Date().getFullYear() }} | Joaquín Mayer & Agustin
      Tosar</span
    >
  </v-footer>
</template>

<script>
export default {
    name: "Footer"
};
</script>

<style>
</style>
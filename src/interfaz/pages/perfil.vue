<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="4">
            <strong class="text-uppercase">Perfil</strong>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-row class="pa-4">
          <v-col>
            <p><strong>Nombre:</strong> {{ $auth.user.name }}</p>
            <p><strong>Email:</strong> {{ $auth.user.email }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>
</style>
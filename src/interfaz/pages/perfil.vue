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
            <p><strong>Nombre:</strong> Joaquin</p>
            <p><strong>Email:</strong> joaquinemayer@gmail.com</p>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <div class="mx-4">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on" block>
                Eliminar Perfil
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="text-h5 red"> Eliminar perfil </v-card-title>

              <v-card-text class="mt-5">
                ¿Está seguro que quiere eliminar su perfil?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" @click="dialog = false"> Eliminar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
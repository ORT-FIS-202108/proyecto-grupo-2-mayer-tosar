<template>
  <v-layout wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card elevation="4" tag="section">
        <v-card-title>
          <v-layout align-center justify-space-between>
            <h3 class="headline">Registo</h3>
            <h3 class="headline">Mis Gastos</h3>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form class="mb-3" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              type="password"
              :rules="passwordRules"
              v-model="password"
            ></v-text-field>
            <v-text-field
              label="Confirmar Contraseña"
              type="password"
              :rules="passwordRules"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text to="/iniciar-sesion"> Iniciar Sesion </v-btn>
          <v-spacer></v-spacer>
          <v-btn to="/"> Registrarse </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "base",
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) => (v && v.length >= 8) || "Debe contener al menos 8 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "El e-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail debe ser válido",
    ],
  }),
  head() {
    return {
      title: "Registo",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
</style>
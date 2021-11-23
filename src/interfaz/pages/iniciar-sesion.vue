<template>
  <v-layout wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card elevation="4" tag="section">
        <v-card-title>
          <img src="/mis-gastos.png" alt="logo mis gastos" />
          <v-layout align-center justify-space-between>
            <h3 class="headline">Iniciar Sesion</h3>
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
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text to="/registro"> ¿No tienes usuario? </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="validate"> Iniciar Sesion </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: "guest",
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
      title: "Iniciar Sesion",
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.userLogin();
      }
    },
    async userLogin() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        await this.$auth.setUser(response.data);
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>

<style>
</style>
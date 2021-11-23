<template>
  <v-layout wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card elevation="4" tag="section">
        <v-card-title>
          <v-layout align-center justify-space-between>
            <h3 class="headline">Registo</h3>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form class="mb-3" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>
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
              :rules="confirmPasswordRules"
              v-model="confirmPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text to="/iniciar-sesion"> Iniciar Sesion </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="validate"> Registrarse </v-btn>
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
    name: "",
    nameRules: [(v) => !!v || "El nombre es requerida"],
    password: "",
    passwordRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) => (v && v.length >= 8) || "Debe contener al menos 8 caracteres",
    ],
    confirmPassword: "",
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
  computed: {
    confirmPasswordRules() {
      return [
        () =>
          this.password === this.confirmPassword ||
          "Las contraseñas no coinciden",
      ];
    },
  },
  methods: {
    validate() {
      console.log("click");
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    async register() {
      try {
        const { email, password, name } = this;

        await this.$axios.post("users/register", {
          email,
          password,
          name,
        });

        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
  },
};
</script>

<style>
</style>
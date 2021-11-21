<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.push({ name: 'cuentas' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">Agregar Cuenta</strong>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-form class="mb-3 px-4" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Nombre"
            required
            :rules="[(v) => !!v || 'El nombre es requerido']"
          ></v-text-field>
          <v-select
            v-model="currency"
            :items="currencies"
            :rules="[(v) => !!v || 'La moneda es requerida']"
            label="Moneda"
            required
          ></v-select>
          <v-text-field
            label="Saldo"
            type="number"
            v-model="amount"
          ></v-text-field>
          <v-btn block @click="validate()">Crear Cuenta</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: "",
      currency: "UYU",
      amount: 0,
    };
  },
  computed: {
    ...mapState("accounts", ["currencies"]),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.creacteAccount();
      }
    },
    async creacteAccount() {
      const account = {
        name: this.name,
        currency: this.currency,
        amount: this.amount,
      };
      try {
        await this.$store.dispatch("accounts/CREATE_ACCOUNT", account);
        this.$router.push({ name: "cuentas" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

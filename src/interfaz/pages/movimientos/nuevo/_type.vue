<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.push({ name: 'movimientos' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">{{ typeText }}</strong>
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
          <v-text-field
            label="Monto"
            type="number"
            v-model="amount"
            required
            :rules="[(v) => !!v || 'El monto es requerido']"
          ></v-text-field>
          <v-text-field label="Fecha" type="date" v-model="date"></v-text-field>
          <v-select
            v-if="!isTransferType"
            v-model="category"
            :items="getCategories"
            :rules="[(v) => !!v || 'La categoria es requerida']"
            label="Categoria"
            required
          ></v-select>

          <v-select
            v-model="account"
            :items="getAccounts"
            :rules="[(v) => !!v || 'La cuenta es requerida']"
            :label="isTransferType ? 'Desde la cuenta' : 'Cuenta'"
            required
          ></v-select>
          <v-select
            v-if="isTransferType"
            v-model="accountTo"
            :items="getAccounts"
            :rules="[(v) => !!v || 'La cuenta es requerida']"
            label="A la cuenta"
          ></v-select>
          <v-divider />
          <v-select
            v-if="!isTransferType"
            v-model="goal"
            :items="goals"
            label="Objetivos"
            class="mt-4"
          ></v-select>
          <v-btn block @click="validate()" class="mt-4">{{ typeText }}</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: "",
      amount: 0,
      date: new Date(),
      category: null,
      account: null,
      accountTo: null,
      goal: null,
      goals: [{ text: "Ninguno", value: null }],
    };
  },
  computed: {
    ...mapGetters("accounts", ["getAccounts", "getCurrencyAccountById"]),
    ...mapGetters("goals", ["getGoalsByCurrency"]),
    ...mapGetters("categories", ["getCategories"]),
    typeText() {
      switch (this.$route.params.type) {
        case "income":
          return "Nuevo Ingreso";
        case "expense":
          return "Nuevo Gasto";
        case "transfer":
          return "Nueva Transferencia";
        default:
          return "";
      }
    },
    isTransferType() {
      return this.$route.params.type == "transfer";
    },
  },
  fetch() {
    this.$store.dispatch("categories/GET_CATEGORIES");
    this.$store.dispatch("accounts/GET_ACCOUNTS");
    this.$store.dispatch("goals/GET_GOALS");
  },
  watch: {
    account(newVal) {
      let currency = this.getCurrencyAccountById(newVal);
      this.goals = [
        { text: "Ninguno", value: null },
        ...this.getGoalsByCurrency(currency),
      ];
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.createMovement();
      }
    },
    async createMovement() {
      let data = {
        name: this.name,
        amount: this.amount,
        date: this.date,
        type: this.$route.params.type,
        account: this.account,
      };

      switch (this.$route.params.type) {
        case "income":
          data.category = this.category;
          data.account = this.account;
          data.goal = this.goal;
          break;
        case "expense":
          data.category = this.category;
          data.account = this.account;
          data.goal = this.goal;
          break;
        case "transfer":
          data.accountTo = this.accountTo;
          break;
      }

      try {
        await this.$store.dispatch("movements/CREATE_MOVEMENT", data);
        this.$router.push({ name: "movimientos" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

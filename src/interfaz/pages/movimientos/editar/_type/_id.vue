<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.go(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">Editar {{ typeText }}</strong>
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
            v-model="categoryId"
            :items="getCategories"
            :rules="[(v) => !!v || 'La categoria es requerida']"
            label="Categoria"
            required
          ></v-select>

          <v-select
            v-model="accountId"
            :items="getAccounts"
            :rules="[(v) => !!v || 'La cuenta es requerida']"
            :label="isTransferType ? 'Desde la cuenta' : 'Cuenta'"
            required
          ></v-select>
          <v-select
            v-if="isTransferType"
            v-model="accountToId"
            :items="getAccounts"
            :rules="[(v) => !!v || 'La cuenta es requerida']"
            label="A la cuenta"
          ></v-select>
          <v-divider />
          <v-select
            v-if="!isTransferType"
            v-model="goalId"
            :items="goals"
            label="Objetivos"
            class="mt-4"
          ></v-select>
          <v-btn block @click="validate()" class="mt-4"
            >Editar {{ typeText }}</v-btn
          >
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: "test",
      amount: 0,
      date: new Date(),
      categoryId: null,
      account: null,
      accountId: null,
      accountTo: null,
      accountToId: null,
      goalId: null,
      goals: [{ text: "Ninguno", value: null }],
    };
  },
  mounted() {
    let movement = this.getMovementById(this.$route.params.id);
    this.name = movement.name;
    this.amount = movement.amount;
    this.date = movement.date;
    this.categoryId = movement.categoryId;
    if (movement.type == "transfer") {
      this.account = this.getAccountById(movement.accountFromId);
      this.accountId = this.account._id;
      this.accountTo = this.getAccountById(movement.accountToId);
      this.accountToId = this.accountTo._id;
    } else {
      this.account = this.getAccountById(movement.accountId);
      this.accountId = this.account._id;
      this.goalId = movement.goalId;
    }
    this.goals = [
      ...this.goals,
      ...this.getGoalsByCurrency(this.account.currency),
    ];
  },
  computed: {
    ...mapGetters("movements", ["getMovementById"]),
    ...mapGetters("accounts", [
      "getAccounts",
      "getAccountById",
      "getCurrencyAccountById",
    ]),
    ...mapGetters("goals", ["getGoalsByCurrency"]),
    ...mapGetters("categories", ["getCategories"]),
    typeText() {
      switch (this.$route.params.type) {
        case "income":
          return "Ingreso";
        case "expense":
          return "Gasto";
        case "transfer":
          return "Transferencia";
        default:
          return "";
      }
    },
    isTransferType() {
      return this.$route.params.type == "transfer";
    },
  },
  watch: {
    accountId(newVal) {
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
    },
  },
};
</script>

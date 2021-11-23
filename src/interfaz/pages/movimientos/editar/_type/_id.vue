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
          <v-btn block @click="validate()" class="mt-4"
            >Editar {{ typeText }}</v-btn
          >
        </v-form>
        <v-divider />
        <div class="mx-4 mt-4">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on" block>
                Eliminar {{ typeText }}
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="text-h5 red">
                Eliminar {{ typeText }}
              </v-card-title>

              <v-card-text class="mt-5">
                ¿Está seguro que quiere eliminar?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" @click="deleteMovement">
                  Eliminar Definitivamente
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
      name: null,
      amount: 0,
      date: null,
      category: null,
      account: null,
      accountTo: null,
      goal: null,
      goals: [{ text: "Ninguno", value: null }],
      dialog: false,
    };
  },
  fetch() {
    this.$store.dispatch("categories/GET_CATEGORIES");
    this.$store.dispatch("accounts/GET_ACCOUNTS");
    this.$store.dispatch("goals/GET_GOALS");

    const movement = this.getMovementById(this.$route.params.id);

    this.name = movement.name;
    this.amount = movement.amount;
    this.date = this.convertDate(movement.date);
    this.account = movement.account;

    if (movement.type == "transfer") {
      this.accountTo = movement.accountToId;
    } else {
      this.category = movement.category;

      this.goal = movement.goal;
    }
    this.goals = [
      ...this.goals,
      ...this.getGoalsByCurrency(this.getCurrencyAccountById(this.account)),
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
      if (this.$refs.form.validate()) {
        this.updateMovement();
      }
    },
    async updateMovement() {
      let data = {
        id: this.$route.params.id,
        name: this.name,
        amount: this.amount,
        date: this.date,
        account: this.account,
        type: this.$route.params.type,
      };

      if (this.isTransferType) {
        data.accountTo = this.accountTo;
      } else {
        data.category = this.category;
        data.goal = this.goal;
      }

      try {
        await this.$store.dispatch("movements/UPDATE_MOVEMENT", data);
        this.$router.push({ name: "movimientos" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async deleteMovement() {
      try {
        await this.$store.dispatch("movements/DELETE_MOVEMENT", {
          id: this.$route.params.id,
          type: this.$route.params.type,
        });
        this.$router.push({ name: "movimientos" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    convertDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
  },
};
</script>

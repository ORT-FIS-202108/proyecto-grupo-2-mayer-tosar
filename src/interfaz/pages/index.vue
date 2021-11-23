<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="4">
            <p>Gastos</p>
            <strong>${{ totalExpenses }}</strong>
            <br />
            <small>SOLO EN UYU</small>
          </v-col>
          <v-col cols="4">
            <p>Mes</p>
            <strong class="text-uppercase">{{ getCurrentMonth }}</strong>
          </v-col>
          <v-col cols="4">
            <p>Ingresos</p>
            <strong>${{ totalIncomes }}</strong>
            <br />
            <small>SOLO EN UYU</small>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="px-4" v-if="lastestMovement.length">Últimos Movimientos</p>
        <v-list>
          <v-list-item v-for="(movement, idx) in lastestMovement" :key="idx">
            <v-list-item-avatar>
              <v-icon
                dark
                :color="getColorByMovementType(movement.type)"
                v-text="getIconByMovementType(movement.type)"
              ></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="movement.name"></v-list-item-title>

              <v-list-item-subtitle>
                <v-chip x-small>{{ convertDate(movement.date) }}</v-chip>
                <v-chip x-small>{{
                  getCategoryNameById(movement.category)
                }}</v-chip>
                <v-chip x-small v-if="movement.type == 'transfer'"
                  >{{ getNameAccountById(movement.accountFromId) }}
                  <v-icon x-small>mdi-arrow-right</v-icon>
                  {{ getNameAccountById(movement.accountToId) }}</v-chip
                >
                <v-chip x-small v-else>{{
                  getNameAccountById(movement.account)
                }}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <p>
                {{ getCurrencyAccountById(movement.account._id) }}
                {{ convertAmount(movement.amount) }}
              </p>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <div class="mx-4">
          <v-btn block to="/movimientos">Ver todos los movimientos</v-btn>
        </div>
        <v-divider class="my-4" />
        <div class="mx-4">
          <v-btn class="my-4" to="/cuentas" block>Ver cuentas</v-btn>

          <v-btn class="my-4" to="/objetivos" block>Ver Objetivos</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("movements", ["lastestMovement"]),
    ...mapState("movements", ["totalIncomes", "totalExpenses"]),
    ...mapGetters("accounts", ["getNameAccountById", "getCurrencyAccountById"]),
    ...mapGetters("categories", ["getCategoryNameById"]),
    getCurrentMonth() {
      return new Date().toLocaleString("es", { month: "short" });
    },
  },
  fetch() {
    this.$store.dispatch("movements/GET_MOVEMENTS");
    this.$store.dispatch("accounts/GET_ACCOUNTS");
    this.$store.dispatch("categories/GET_CATEGORIES");
    this.$store.dispatch("goals/GET_GOALS");
  },
  methods: {
    getIconByMovementType(type) {
      switch (type) {
        case "income":
          return "mdi-arrow-up";
        case "expense":
          return "mdi-arrow-down";
        case "transfer":
          return "mdi-swap-vertical";
        default:
          return "";
      }
    },
    getColorByMovementType(type) {
      switch (type) {
        case "income":
          return "green";
        case "expense":
          return "red";
        case "transfer":
          return "blue";
        default:
          return "";
      }
    },
    convertDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
    convertAmount(amount) {
      return amount.toLocaleString("es-UY");
    },
  },
};
</script>

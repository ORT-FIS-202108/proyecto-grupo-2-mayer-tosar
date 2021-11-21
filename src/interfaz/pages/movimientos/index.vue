<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="changeMonth(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase"
              >{{ getMonthText }} {{ getYear }}</strong
            >
            <br />
            <v-btn
              @click="resetDate()"
              v-if="getMonth != currentMonth || getYear != currentYear"
            >
              Ir al mes actual
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn @click="changeMonth(1)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-list>
          <v-list-item v-for="(movement, idx) in movements" :key="idx">
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
                  >{{ getAccountById(movement.accountFromId).name }}
                  <v-icon x-small>mdi-arrow-right</v-icon>
                  {{ getAccountById(movement.accountToId).name }}</v-chip
                >
                <v-chip x-small v-else>{{
                  getNameAccountById(movement.account)
                }}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <div class="d-flex justify-center align-center">
                <p class="ma-0">
                  {{ getCurrencyAccountById(movement.account)
                  }}{{ convertAmount(movement.amount) }}
                </p>
                <v-btn
                  small
                  class="ml-2"
                  :to="{
                    name: 'movimientos-editar-type-id',
                    params: { type: movement.type, id: movement._id },
                  }"
                >
                  <v-icon x-small>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      date: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  fetch() {
    this.fetchMovements();
    this.$store.dispatch("accounts/GET_ACCOUNTS");
    this.$store.dispatch("categories/GET_CATEGORIES");
  },
  computed: {
    ...mapState("movements", ["movements"]),
    ...mapGetters("accounts", ["getNameAccountById", "getCurrencyAccountById"]),
    ...mapGetters("categories", ["getCategoryNameById"]),
    getMonthText() {
      return this.date.toLocaleString("es", {
        month: "long",
      });
    },
    getMonth() {
      return this.date.getMonth();
    },
    getYear() {
      return this.date.getFullYear();
    },
  },
  watch: {
    date() {
      this.fetchMovements();
    },
  },
  methods: {
    fetchMovements() {
      this.$store.dispatch("movements/GET_MOVEMENTS_BY_MONTH_AND_YEAR", {
        month: this.getMonth,
        year: this.getYear,
      });
    },
    resetDate() {
      this.date = new Date();
    },
    changeMonth(value) {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + value));
    },
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

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
            <strong class="text-uppercase">{{ getMonth }} {{ getYear }}</strong>
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
                <v-chip x-small>{{ movement.date }}</v-chip>
                <v-chip x-small>{{
                  getCategoryNameById(movement.categoryId)
                }}</v-chip>
                <v-chip x-small v-if="movement.type == 'transfer'"
                  >{{ getAccountById(movement.accountFromId).name }}
                  <v-icon x-small>mdi-arrow-right</v-icon>
                  {{ getAccountById(movement.accountToId).name }}</v-chip
                >
                <v-chip x-small v-else>{{
                  getAccountById(movement.accountId).name
                }}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <div class="d-flex justify-center align-center">
                <p class="ma-0">${{ movement.amount }}</p>
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
    };
  },
  mounted() {},
  computed: {
    ...mapState("movements", ["movements"]),
    ...mapGetters("accounts", ["getAccountById"]),
    ...mapGetters("categories", ["getCategoryNameById"]),
    getMonth() {
      return this.date.toLocaleString("es", {
        month: "long",
      });
    },
    getYear() {
      return this.date.getFullYear();
    },
  },
  methods: {
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
  },
};
</script>

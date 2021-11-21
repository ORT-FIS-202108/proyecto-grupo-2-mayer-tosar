<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.push({ name: 'objetivos' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">Depositar en {{ name }}</strong>
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
                <v-chip x-small>{{ movement.category }}</v-chip>
                <v-chip x-small>{{
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      movements: [],
    };
  },
  async fetch() {
    const goal = this.getGoalById(this.$route.params.id);
    this.name = goal.name;
    try {
      await this.$store.dispatch("goals/GET_MOVEMENTS_BY_GOAL", goal._id);
    } catch (error) {
      this.$toast.error(error.message);
    }
  },
  computed: {
    ...mapGetters("goals", ["getGoalById"]),
    ...mapGetters("accounts", ["getAccountById"]),
  },
  methods: {
    getIconByMovementType(type) {
      switch (type) {
        case "income":
          return "mdi-arrow-up";
        case "expense":
          return "mdi-arrow-down";
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
        default:
          return "";
      }
    },
  },
};
</script>

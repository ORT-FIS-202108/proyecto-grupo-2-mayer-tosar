<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="4">
            <strong class="text-uppercase">objetivos</strong>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-list>
          <v-list-item v-for="(goal, idx) in goals" :key="idx">
            <v-list-item-content>
              <v-list-item-title>{{ goal.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip x-small>{{ convertDate(goal.date) }}</v-chip>
                <v-chip x-small
                  >{{ goal.currency
                  }}{{ convertAmount(goal.targetAmount) }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <div class="d-flex justify-center align-center">
                <p class="ma-0">
                  {{ goal.currency }}{{ convertAmount(goal.currentAmount) }}
                </p>
                <v-btn
                  small
                  class="ml-2"
                  :to="{
                    name: 'objetivos-depositos-id',
                    params: { id: goal._id },
                  }"
                >
                  <v-icon x-small>mdi-menu</v-icon>
                </v-btn>
                <v-btn
                  small
                  class="ml-2"
                  :to="{
                    name: 'objetivos-editar-id',
                    params: { id: goal._id },
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
import { mapState } from "vuex";
export default {
  fetch() {
    this.$store.dispatch("goals/GET_GOALS");
  },
  computed: {
    ...mapState("goals", ["goals"]),
  },
  methods: {
    convertDate(date) {
      return new Date(date).toISOString().slice(0, 10).toLocaleLowerCase("es");
    },
    convertAmount(amount) {
      return amount.toLocaleString("es-UY");
    },
  },
};
</script>

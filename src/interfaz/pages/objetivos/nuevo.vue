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
            <strong class="text-uppercase">Agregar Objetivo</strong>
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
            label="Monto Objetivo"
            type="number"
            v-model="targetAmount"
            required
            :rules="[(v) => !!v || 'El monto es requerido']"
          ></v-text-field>
          <v-text-field
            label="Fecha Limite"
            type="date"
            v-model="date"
            required
            :rules="[(v) => !!v || 'La fecha limite es requerida']"
          ></v-text-field>
          <v-btn block @click="validate()">Crear Objetivo</v-btn>
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
      name: null,
      currency: "UYU",
      targetAmount: 0,
      date: null,
    };
  },
  computed: {
    ...mapState("accounts", ["currencies"]),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.createGoal();
      }
    },
    async createGoal() {
      const goal = {
        name: this.name,
        currency: this.currency,
        targetAmount: this.targetAmount,
        date: this.date,
      };
      try {
        await this.$store.dispatch("goals/CREATE_GOAL", goal);
        this.$router.push({ name: "objetivos" });
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

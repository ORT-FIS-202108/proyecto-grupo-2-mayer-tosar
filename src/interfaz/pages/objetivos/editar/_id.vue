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
            <strong class="text-uppercase">Editar Objetivo</strong>
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
            :rules="[(v) => !!v || 'El monto es requerido']"
            required
          ></v-text-field>
          <v-text-field
            label="Fecha Limite"
            type="date"
            v-model="date"
            required
            :rules="[(v) => !!v || 'La fecha limite es requerida']"
          ></v-text-field>
          <v-btn block @click="validate()">Editar Objetivo</v-btn>
        </v-form>
        <v-divider />
        <div class="mx-4 mt-4">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on" block>
                Eliminar Objetivo
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="text-h5 red">
                Eliminar objetivo
              </v-card-title>

              <v-card-text class="mt-5">
                ¿Está seguro que quiere eliminar este objetivo?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" @click="deleteGoal">
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
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: null,
      currency: "UYU",
      targetAmount: 0,
      date: null,
      dialog: false,
    };
  },
  computed: {
    ...mapState("accounts", ["currencies"]),
    ...mapGetters("goals", ["getGoalById"]),
  },
  fetch() {
    const goal = this.getGoalById(this.$route.params.id);
    this.name = goal.name;
    this.currency = goal.currency;
    this.targetAmount = goal.targetAmount;
    this.date = this.convertDate(goal.date);
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.updateGoal();
      }
    },
    convertDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
    async updateGoal() {
      const goal = {
        id: this.$route.params.id,
        name: this.name,
        currency: this.currency,
        targetAmount: this.targetAmount,
        date: this.date,
      };

      try {
        await this.$store.dispatch("goals/UPDATE_GOAL", goal);
        this.$router.push({ name: "objetivos" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async deleteGoal() {
      try {
        await this.$store.dispatch("goals/DELETE_GOAL", this.$route.params.id);
        this.$router.push({ name: "objetivos" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

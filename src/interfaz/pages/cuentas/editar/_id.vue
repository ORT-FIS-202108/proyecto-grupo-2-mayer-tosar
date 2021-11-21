<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.push({ name: 'cuentas' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">Editar Cuenta</strong>
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
            label="Saldo"
            type="number"
            v-model="amount"
          ></v-text-field>
          <v-btn block @click="validate()">Actualizar Cuenta</v-btn>
        </v-form>
        <v-divider />
        <div class="mx-4 mt-4">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on" block>
                Eliminar Cuenta
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="text-h5 red"> Eliminar cuenta </v-card-title>

              <v-card-text class="mt-5">
                ¿Está seguro que quiere eliminar esta cuenta?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" @click="deleteAccount">
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
      name: "",
      currency: "",
      amount: 0,
      dialog: false,
    };
  },
  computed: {
    ...mapState("accounts", ["currencies"]),
    ...mapGetters("accounts", ["getAccountById"]),
  },
  fetch() {
    const account = this.getAccountById(this.$route.params.id);
    this.name = account.name;
    this.currency = account.currency;
    this.amount = account.amount;
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.updateAccount();
      }
    },
    async updateAccount() {
      try {
        await this.$store.dispatch("accounts/UPDATE_ACCOUNT", {
          _id: this.$route.params.id,
          name: this.name,
          currency: this.currency,
          amount: this.amount,
        });
        this.$router.push({ name: "cuentas" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async deleteAccount() {
      try {
        await this.$store.dispatch(
          "accounts/DELETE_ACCOUNT",
          this.$route.params.id
        );
        this.$router.push({ name: "cuentas" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="4">
            <strong class="text-uppercase">cuentas</strong>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-list>
          <v-list-item v-for="(account, idx) in accounts" :key="idx">
            <v-list-item-content>
              <v-list-item-title v-text="account.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <div class="d-flex justify-center align-center">
                <p class="ma-0">{{ account.currency }} {{ account.amount }}</p>
                <v-btn
                  small
                  class="ml-2"
                  :to="{
                    name: 'cuentas-editar-id',
                    params: { id: account._id },
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
  data() {
    return {
      date: new Date(),
    };
  },
  mounted() {},
  computed: {
    ...mapState("accounts", ["accounts"]),
  },
};
</script>

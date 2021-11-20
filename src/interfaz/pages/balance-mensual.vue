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
            <p>${{ totalBalance }}</p>
          </v-col>
          <v-col cols="4">
            <v-btn @click="changeMonth(1)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-row>
          <v-col cols="6">
            <v-list>
              <v-list-item v-for="(item, idx) in incomesByCategory" :key="idx">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="getCategoryNameById(item.categoryId)"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <div class="d-flex justify-center align-center">
                    <p class="ma-0">${{ item.totalAmount }}</p>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list>
              <v-list-item v-for="(item, idx) in expensesByCategory" :key="idx">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="getCategoryNameById(item.categoryId)"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <div class="d-flex justify-center align-center">
                    <p class="ma-0">${{ item.totalAmount }}</p>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      date: new Date(),
      incomesByCategory: [],
      expensesByCategory: [],
      totalBalance: 0,
    };
  },
  mounted() {
    this.incomesByCategory =
      this.getMovementsAgruptedByCategoryAndType("income");
    this.expensesByCategory =
      this.getMovementsAgruptedByCategoryAndType("expense");
    this.totalBalance = this.getTotalBalance();
  },
  computed: {
    ...mapGetters("movements", ["getMovementsAgruptedByCategoryAndType"]),
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
    getTotalBalance() {
      let totalBalance = 0;
      this.incomesByCategory.forEach((item) => {
        totalBalance += item.totalAmount;
      });
      this.expensesByCategory.forEach((item) => {
        totalBalance += item.totalAmount;
      });
      return totalBalance;
    },
  },
};
</script>

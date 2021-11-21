<template>
  <v-row justify="center" align="center" class="mb-16">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4">
        <v-row justify="start" align="center" class="text-center">
          <v-col cols="4">
            <v-btn @click="$router.push({ name: 'categorias' })">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <strong class="text-uppercase">Agregar Categoria</strong>
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

          <v-btn block @click="validate()">Crear Categoria</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      name: null,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.createCategory();
      }
    },
    async createCategory() {
      const category = {
        name: this.name,
      };
      try {
        await this.$store.dispatch("categories/CREATE_CATEGORY", category);
        this.$router.push({ name: "categorias" });
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

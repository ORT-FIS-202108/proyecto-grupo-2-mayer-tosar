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
            <strong class="text-uppercase">Editar Categoria</strong>
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

          <v-btn block @click="validate()">Editar Categoria</v-btn>
        </v-form>
        <v-divider />
        <div class="mx-4 mt-4">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on" block>
                Eliminar Categoria
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title class="text-h5 red">
                Eliminar categoria
              </v-card-title>

              <v-card-text class="mt-5">
                ¿Está seguro que quiere eliminar esta categoria?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" @click="deleteCategory">
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,
      name: null,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters("categories", ["getCategoryById"]),
  },
  fetch() {
    const category = this.getCategoryById(this.$route.params.id);
    this.name = category.name;
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.updateCategory();
      }
    },
    async updateCategory() {
      try {
        await this.$store.dispatch("categories/UPDATE_CATEGORY", {
          _id: this.$route.params.id,
          name: this.name,
        });
        this.$router.push({ name: "categorias" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async deleteCategory() {
      try {
        await this.$store.dispatch(
          "categories/DELETE_CATEGORY",
          this.$route.params.id
        );
        this.$router.push({ name: "categorias" });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

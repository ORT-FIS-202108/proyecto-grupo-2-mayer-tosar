<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="false" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon to="/" plain>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title to="/">{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon to="/perfil">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-speed-dial v-model="fab" fixed bottom class="centered">
      <template v-slot:activator>
        <v-btn color="primary" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in itemsMenu" :key="index">
          <v-list-item-title
            ><nuxt-link
              class="white--text text-decoration-none"
              :to="item.to"
              >{{ item.title }}</nuxt-link
            ></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-speed-dial>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fab: false,
      items: [
        {
          icon: "mdi-home",
          title: "Inicio",
          to: "/",
        },
        {
          icon: "mdi-wallet",
          title: "Cuentas",
          to: "/cuentas",
        },
        {
          icon: "mdi-target",
          title: "Objetivos",
          to: "/objetivos",
        },
        {
          icon: "mdi-apps",
          title: "Categorias",
          to: "/categorias",
        },
      ],
      itemsMenuCommon: [
        {
          title: "Crear Gasto",
          to: "/movimientos/nuevo/expense",
        },
        {
          title: "Crear Ingreso",
          to: "/movimientos/nuevo/income",
        },
        {
          title: "Crear Transferencia",
          to: "/movimientos/nuevo/transfer",
        },
      ],
      itemsMenuAccount: [
        {
          title: "Agregar Cuenta",
          to: "/cuentas/nueva",
        },
      ],
      itemsMenuGoal: [
        {
          title: "Agregar Objetivo",
          to: "/objetivos/nuevo",
        },
      ],
      itemsMenuCategory: [
        {
          title: "Agregar Categoria",
          to: "/categorias/nueva",
        },
      ],
      title: "Mis Gastos",
    };
  },
  computed: {
    itemsMenu() {
      if (this.$route.path.includes("/cuentas")) {
        return this.itemsMenuAccount;
      } else if (this.$route.path.includes("/objetivos")) {
        return this.itemsMenuGoal;
      } else if (this.$route.path.includes("/categorias")) {
        return this.itemsMenuCategory;
      } else {
        return this.itemsMenuCommon;
      }
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped>
.centered {
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
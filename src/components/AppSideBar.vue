<template>
  <v-list dense right elevation="1" class="mt-2 pa-md-2 px-md-3 pa-0">
    <v-list-item-group v-model="selectedItem">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        class="mb-3"
        :to="item.route"
        color="blue darken-3"
      >
        <v-list-item-content class="text-center">
          <v-icon v-text="item.icon"></v-icon>
          <v-list-item-title
            v-text="item.title"
            class="text-center list-item-style d-none d-md-block"
          ></v-list-item-title>
        </v-list-item-content>
        <!--      <v-list-item-icon></v-list-item-icon> -->
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<style lang="scss" scopped>
.list-item-style {
  font-size: 11px !important;
  font-weight: light;
}
</style>
<script>
export default {
  name: "AppSideBar",
  data() {
    return {
      drawer: true,
      selectedItem: 0,
      items: [
        { title: "الرئيسية", icon: "mdi-home", route: "main" },
        { title: "الصندوق", icon: "mdi-cash-usd-outline", route: "funds" },
        { title: "الحساب", icon: "mdi-account", route: "info" },

        {
          title: "خروج",
          icon: "mdi-exit-to-app",
          route: "/"
        }
      ],
      mini: false
    };
  }
};
</script>

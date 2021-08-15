<template>
  <div>
    <v-app-bar color="deep-black accent-5" dark dir="rtl">
      <img src="../assets/imgs/cmclogo.png" width="65" height="55" />

      <v-toolbar-title>
        <span
          >نظام الصندوق | <span class="eng-title">Money Fund System</span></span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon class="ml-3">
        <v-icon>mdi-account</v-icon>
      </v-btn>-->

      <!--   <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <span>{{ fullname }}</span>

          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(baroption, i) in baroptions"
              :key="i"
              :to="baroption.route"
            >
              <v-list-item-content>
                <v-list-item-title>{{ baroption.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppBar",
  data: function() {
    return {
      fullname: "",
      baroptions: [
        {
          id: 1,
          name: "معلومات الحساب",
          route: "info"
        },

        {
          id: 3,
          name: "تسجيل الخروج",
          route: "/"
        }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["authenticated"])
  },
  created() {
    this.fullname = this.authenticated.fullname;
    console.log(this.authenticated);
  }
};
</script>

<template>
  <div class="user-dashboard">
    <AppBar />
    <v-container fluid>
      <v-row class="px-2 px-md-6">
        <v-col cols="3" sm="2" md="2">
          <AppSideBar />
        </v-col>
        <v-col cols="9" sm="10" md="10" class="scroll-y pt-4">
          <router-view />
        </v-col>
      </v-row>
      <AppFooter />
    </v-container>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import AppSideBar from "../../components/AppSideBar";
import AppFooter from "../../components/AppFooter";

export default {
  name: "UserDashboard",
  components: {
    AppBar,
    AppSideBar,
    AppFooter
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scopped>
body,
html {
  overflow: hidden;
  height: 100vh;
}
.user-dashboard {
  display: block;
  width: 100%;
  height: 100%;
  float: left;
  background-color: #f8f8f8;
  .scroll-y {
    overflow-y: scroll;
    max-height: 70vh;
    padding-bottom: 3rem;
  }
  .scroll-y::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
    background-color: #cccccc;
  }

  .scroll-y::-webkit-scrollbar {
    width: 3px;
    background-color: #f5f5f5;
  }

  .scroll-y::-webkit-scrollbar-thumb {
    background-color: #fff;
    background-image: -webkit-linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 25%,
      transparent 100%,
      rgba(0, 0, 0, 1) 75%,
      transparent
    );
  }
}
</style>

<template>
  <div>
    <v-container class="userinfo">
      <h2 class="mb-5">معلومات الحساب</h2>
      <form>
        <v-row class="px-6">
          <v-col cols="12" md="6" lg="4">
            <v-col cols="12">
              <v-text-field
                v-model="userInfo.fullname"
                label="الاسم الكامل"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="userInfo.username"
                label="اسم المستخدم"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="userInfo.created_at"
                label="تاريخ الانشاء"
                required
              ></v-text-field>
            </v-col>
          </v-col>
        </v-row>
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    getback: function() {
      history.back();
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
};
</script>

<style scoped lang="scss">
.texttitles {
  font-size: large;
}

h2 {
  text-align: center;
}
</style>

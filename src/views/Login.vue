<template>
  <div class="login">
    <v-container>
      <div class="contentframe mt-5">
        <v-row>
          <v-col cols="12" md="6" lg="6" xl="6">
            <div class="pr-5 mr-5">
              <h4 style="text-align:right">
                <img
                  width="65"
                  height="50"
                  src="../assets/imgs/cmclogo.png"
                  alt
                  style="vertical-align: middle;"
                />
                هيئة الاعلام والاتصالات
              </h4>
            </div>
            <div class="d-md-none" cols="12" lg="6" xl="6">
              <h3 class="mt-5">نظام الصندوق</h3>
            </div>
            <div class="mt-5 px-5 mx-5 pt-5" align="right">
              <h4 class="mb-5">تسجيل الدخول</h4>
              <v-alert class="pt-3" v-if="feedback" dense type="warning">
                {{ feedback }}
              </v-alert>
              <v-form @submit.prevent="login()" class="mt-2">
                إسم المستخدم
                <v-text-field
                  auto
                  label="إسم المستخدم"
                  solo
                  required
                  placeholder="إسم المستخدم"
                  id="user_name"
                  class="mt-2"
                  v-model="cred.username"
                  dense
                ></v-text-field
                >كلمة المرور
                <v-text-field
                  label="كلمة المرور"
                  solo
                  required
                  placeholder="كلمة المرور"
                  id="password"
                  :type="show1 ? 'text' : 'password'"
                  class="mt-2"
                  dense
                  v-model="cred.password"
                ></v-text-field>
                <v-btn
                  color="green"
                  class="mt-5 white--text"
                  depressed
                  @click="login()"
                  >تسجيل الدخول</v-btn
                >
              </v-form>
            </div>
          </v-col>
          <v-col
            class="page-details d-none d-md-block pt-16"
            cols="12"
            md="6"
            lg="6"
            xl="6"
          >
            <div style="background:rgba(0, 0, 0, .25)" class="mb-3">
              <h2 class="mt-15 py-2">
                نظام الصندوق
              </h2>
            </div>
            <div style="background:rgba(3, 0, 0, .2)">
              <p class="py-2">
                تسجيل الدخول الى لوحة التحكم باستخدام اسم المستخدم وكلمة المرور
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Loginpage",
  data: function() {
    return {
      show1: false,
      cred: {
        username: "",
        password: ""
      },
      feedback: "",
      busy: false,
      timeout: null
    };
  },

  methods: {
    onHidden() {
      this.$refs.button.focus();
    },
    ...mapActions(["loginFun"]),

    login() {
      /* console.log(this.cred); */
      if (this.cred.username == "") {
        this.feedback = "يجب إدخال إسم المستخدم";
      } else if (this.cred.password == "") {
        this.feedback = "يجب إدخال كلمة المرور";
      } else if (this.cred.username != "" && this.cred.password != "") {
        this.feedback = "";
        this.busy = true;
        this.loginFun(JSON.stringify(this.cred))
          .then((res) => {
            console.log(res);
            if (res == "success") {
              this.cred.username = "";
              this.cred.password = "";
              this.$router.push("/user/dashboard/");
            } else {
              this.feedback = "إسم المستخدم أو كلمة المرور غير صالحة";
            }
          })
          .catch(() => {
            this.feedback = "! حدث خطاء الرجاء المحاولة لاحقا";
          });
        this.busy = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
$firstGradientcolor: #c2e0eb;
$secondGradientcolor: #a1bacb;
$imgPath: "../assets/imgs/login_background.jpg";
$fontname: "JF Flat";

.login {
  min-height: 100vh;
  background: linear-gradient($firstGradientcolor, $secondGradientcolor);
  text-align: center;
  direction: rtl;
  font-family: $fontname;
}

.contentframe {
  background: #fff;
  min-height: 80vh;
  border: none;
  border-radius: 20px;
  vertical-align: middle;
}

.page-details {
  background: url($imgPath);
  background-position: center;
  background-size: cover;
  color: #fff;
  height: 80vh;
  border-radius: 20px 0px 0px 20px;
}

h2 {
  text-align: center;
}
</style>

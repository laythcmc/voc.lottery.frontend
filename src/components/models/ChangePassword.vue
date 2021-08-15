<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          color="blue-grey"
          class="small-text warning ma-2 white--text"
        >
          <v-icon right dark class="ml-1">
            mdi-book-edit-outline
          </v-icon>
          <span> تعديل كلمة السر</span>
        </v-btn>
      </template>
      <v-form ref="changePasswordForm" v-model="valid" lazy-validation>
        <v-card class="text-right ">
          <v-card-title class="grey lighten-2">
            <h5 class="mt-4 eng-text">CMC Mail System / Change password</h5>
          </v-card-title>
          <v-alert dense text type="success" v-if="successAlert">
            عملية التعديل <strong>تمت بنجاح</strong>
          </v-alert>
          <v-alert dense outlined type="error" v-if="errorAlert1">
            كلمة السر القديمة خاطئة الرجاء التأكد واعادة المحاولة
          </v-alert>

          <v-alert dense outlined type="error" v-if="errorAlert2">
            فشل في العملية الرجاء اعادة المحاولة
          </v-alert>
          <v-alert dense outlined type="error" v-if="errorAlert3">
            كلمة السر الجديدة غير متطابقة الرجاء التاكد من مطابقة كلمة السر
          </v-alert>

          <v-card-text class="mt-3">
            الرجاء مليء معلومات كلمة السر القديمة والجديدة لغرض تغيير كلمة السر
            الخاصة بالحساب
          </v-card-text>

          <v-divider></v-divider>

          <v-container>
            <h6>كلمة السر القديمة</h6>
            <v-text-field
              placeholder="Old password"
              outlined
              dense
              :rules="requiredRule"
              v-model="old_password"
              class="mt-2"
            ></v-text-field>
            <h6>كلمة السر الجديدة</h6>
            <v-text-field
              placeholder="New password"
              outlined
              dense
              :rules="requiredRule"
              v-model="new_password"
              class="mt-2"
            ></v-text-field>
            <h6>تاكيد كلمة السر</h6>
            <v-text-field
              placeholder="Confirm password"
              outlined
              dense
              :rules="requiredRule"
              v-model="confirm_password"
              class="mt-2"
            ></v-text-field>
          </v-container>

          <v-card-actions>
            <v-btn color="primary" text @click="ChangePasswordFunction">
              تعديل كلمة السر
            </v-btn>
            <v-btn color="primary" text @click="dialog = false">
              الغاء
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      requiredRule: [v => !!v || "هذا الحقل مطلوب"],
      old_password: "",
      new_password: "",
      confirm_password: "",
      info: new FormData(),
      successAlert: false,
      errorAlert1: false,
      errorAlert2: false,
      errorAlert3: false,
      valid: false
    };
  },
  methods: {
    ...mapActions(["changePassword"]),
    ChangePasswordFunction() {
      if (!this.$refs.changePasswordForm.validate()) return;
      if (this.confirm_password != this.new_password) {
        this.successAlert = false;
        this.errorAlert1 = false;
        this.errorAlert2 = false;
        this.errorAlert3 = true;
      } else {
        this.info.append("password", this.old_password);
        this.info.append("new_password", this.new_password);
        this.info.append("confirm_password", this.confirm_password);

        this.changePassword(this.info)
          .then(() => {
            this.successAlert = true;
            this.errorAlert1 = false;
            this.errorAlert2 = false;
            this.errorAlert3 = false;
            setTimeout(() => {
              this.dialog = false;
              this.alertText = null;
              this.old_password = "";
              this.new_password = "";
              this.confirm_password = "";
              this.info = new FormData();
              this.$refs.changePasswordForm.reset();
              this.valid = false;
              this.successAlert = false;
            }, 3000);
          })
          .catch(error => {
            if (
              error.response.data.errors.password[0] ==
              "The password is incorrect."
            ) {
              this.successAlert = false;
              this.errorAlert1 = true;
              this.errorAlert2 = false;
              this.errorAlert3 = false;
            } else {
              this.successAlert = false;
              this.errorAlert1 = false;
              this.errorAlert2 = true;
              this.errorAlert3 = false;
            }
          });
      }
    }
  }
};
</script>

<style>
v-text-field {
  direction: rtl !important;
}

.eng-text {
  font-family: sans-serif !important;
  color: gray;
}
</style>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="4" class="ml-auto my-2">
        <v-card elevation="1" class="mx-auto " max-width="374">
          <v-img
            height="150"
            src="../../assets/imgs/choose.svg"
            width="150"
            class="mx-auto"
          ></v-img>
          <v-card-text>
            <v-alert v-if="successAlrt" dense text type="success">
              العملية تمت بنجاح </v-alert
            ><v-alert v-if="errorAlrt" dense text type="error">
              حدث خطاء الرجاء اعادة المحاولة
            </v-alert>
            <v-row class="text-center">
              <v-col cols="12" class="pa-2 mb-2">
                <v-form ref="number_form" lazy-validation>
                  <v-text-field
                    v-model="number"
                    :rules="requiredRule"
                    label="عدد الارقام"
                    required
                    type="number"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="12" class="mb-2">
                <v-btn
                  v-if="btnType == 1"
                  :loading="lottLoading"
                  :disabled="lottLoading"
                  color="red"
                  class="white--text "
                  block
                  @click="makeLottery()"
                >
                  <v-icon left dark>
                    mdi-autorenew
                  </v-icon>
                  عمل قرعة
                </v-btn>
                <download-csv
                  v-if="btnType == 2"
                  :data="allEntities"
                  style="cursor: pointer;
    color: green;"
                >
                  تحميل البيانات
                  <v-icon>
                    mdi-download
                  </v-icon>
                </download-csv>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "mainPage",
  components: {},

  computed: {
    ...mapGetters(["allEntities"]),
  },

  methods: {
    ...mapActions(["newLottery"]),
    makeLottery() {
      if (!this.$refs.number_form.validate()) return;
      this.lottLoading = true;
      this.newLottery(this.number)
        .then(() => {
          this.lottLoading = false;
          this.btnType = 2;
          this.successAlrt = true;
          this.errorAlrt = false;
          this.number = 0;
        })
        .catch(() => {
          console.log("Err");
          this.btnType = 1;
          this.successAlrt = false;
          this.errorAlrt = true;
          this.lottLoading = false;
        });
    },
  },

  data() {
    return {
      number: 0,
      btnType: 1,
      successAlrt: false,
      errorAlrt: false,
      lottLoading: false,
      requiredRule: [(v) => !!v || "هذا الحقل مطلوب"],
    };
  },
};
</script>

<style lang="scss" scoped></style>

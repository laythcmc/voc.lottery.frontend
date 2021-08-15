<template>
  <div>
    <v-row>
      <v-dialog v-model="fundDialog" persistent max-width="900px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="indigo"
            class="small-text  ma-2 white--text"
          >
            <v-icon right dark>
              mdi-plus
            </v-icon>
            قائمة جديدة
          </v-btn>
        </template>
        <v-card dir="rtl">
          <v-card-title>
            <span class="headline">معلومات القائمة</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-alert dense text type="success" v-if="successAlrt">
                  عملية الاضافة <strong>تمت بنجاح</strong>
                </v-alert>
                <v-alert dense outlined type="error" v-if="errorAlrt">
                  فشل في عملية الاضافة الرجاء اعادة المحاولة
                </v-alert>
              </v-row>
              <v-form ref="fund_form" v-model="fund_valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      v-model="Fund.type"
                      :items="fundTypes"
                      item-text="val"
                      item-value="id"
                      label="اختر النوع"
                      placeholder="اختر نوع العملية"
                      required
                      :rules="requiredRule"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="fundDateRef"
                      v-model="fundDateRef"
                      :close-on-content-click="true"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="Fund.date"
                          label="التاريخ"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          autocomplete="off"
                          :rules="requiredRule"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="Fund.date" no-title scrollable>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="Fund.chequeNumber"
                      label="رقم الوصل"
                      :rules="requiredRule"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="Fund.organizationName"
                      label="اسم المؤسسة"
                      required
                      :rules="requiredRule"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-textarea
                      v-model="Fund.details"
                      label="التفاصيل"
                      required
                      rows="1"
                      :rules="requiredRule"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="Fund.amount"
                      label="المبلغ"
                      required
                      :rules="requiredRule"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="Fund.receiverName"
                      label="المستلم"
                      required
                      :rules="requiredRule"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-file-input
                      multiple
                      v-model="Fund.filesName"
                      accept="image/png, image/jpeg,image/jpg, image/svg"
                      placeholder="نسخة الوصل"
                      truncate-length="15"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="Fund.notes"
                      label="الملاحظات"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green darken-2" text @click="addFund">
              حفظ
            </v-btn>
            <v-btn color="black " text @click="fundDialog = false">
              اغلاق
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NewFund",

  data() {
    return {
      fundDateRef: false,
      fundTypes: [
        { id: 1, val: "ايداع" },
        { id: 2, val: "سحب" },
      ],
      date: new Date().toISOString().substr(0, 10),
      fundDialog: false,
      fund_valid: false,
      newFund: new FormData(),
      requiredRule: [(v) => !!v || "هذا الحقل مطلوب"],
      Fund: {
        type: null,
        date: "",
        chequeNumber: "",
        organizationName: "",
        details: "",
        amount: 0,
        receiverName: "هيئة الاعلام والاتصالات",
        filesName: [],
        notes: "",
      },
      successAlrt: false,
      errorAlrt: false,
    };
  },
  methods: {
    ...mapActions(["addNewFund"]),

    addFund() {
      if (!this.$refs.fund_form.validate()) return;

      this.newFund.append("type", this.Fund.type);
      this.newFund.append("date", this.Fund.date);
      this.newFund.append("cheque_number", this.Fund.chequeNumber);
      this.newFund.append("organization_name", this.Fund.organizationName);
      this.newFund.append("details", this.Fund.details);
      this.newFund.append("amount", this.Fund.amount);
      this.newFund.append("receiver_name", this.Fund.receiverName);
      for (let i = 0; i < this.Fund.filesName.length; i++) {
        this.newFund.append("files_name[]", this.Fund.filesName[i]);
      }
      this.newFund.append("notes", this.Fund.notes);

      this.addNewFund(this.newFund)
        .then(() => {
          this.successAlrt = true;

          setTimeout(() => {
            //this.fundDialog = false;
            this.fund_valid = false;
            this.successAlrt = false;
            this.$refs.fund_form.reset();
          }, 3500);
        })
        .catch(() => {
          this.errorAlrt = true;
        });
    },
  },
};
</script>

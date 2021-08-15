<template>
  <div class="funds">
    <h4 class="justify-center mb-5">السجل</h4>
    <v-card class="pb-1">
      <v-card-title>
        <v-row dense>
          <v-col>
            <newFundModal />
          </v-col>
          <v-col>
            <v-text-field
              dense
              justify-center
              v-model="search"
              append-icon="mdi-magnify"
              label="بحث"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        align-center
        :headers="headers"
        :items="allFunds"
        :search="search"
        hide-default-footer
        fixed-header
        dir="rtl"
      >
        <!--    <template v-slot:item.subject="{ item }">
          <div :class="item.seen===1?'style-1':'style-2'">
            <span >
              {{ item.subject }}
            </span>
          </div>
        </template> -->

        <!--  <template v-slot:item.directory="{ item }">
          <h4>
            {{ item.emailsender.name }} / {{ item.emailsender.directory.name }}
          </h4>
        </template> -->

        <template v-slot:item.showdata="{ item }">
          <v-btn icon color="indigo" @click="showdata(item.files_name)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <!-- pagination -->
      <v-pagination
        v-model="currentGet"
        :length="lastGet"
        total-visible="6"
        circle
      ></v-pagination>
      <!-- pagination -->
    </v-card>
  </div>
</template>

<script>
import newFundModal from "../../components/models/funds/NewFund";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "FundPage",
  components: {
    newFundModal,
  },
  watch: {
    currentGet(newVal, oldVal) {
      if (newVal != oldVal) this.fetchFunds(newVal);
    },
  },
  created() {
    this.fetchFunds(1);
  },
  computed: {
    ...mapGetters(["allFunds"]),

    currentGet: {
      get() {
        return this.$store.getters.getFundCurrentPage;
      },
      set(value) {
        this.$store.dispatch("setFundCurrentPage", value);
      },
    },
    lastGet: {
      get() {
        return this.$store.getters.getFundLastPage;
      },
    },
  },

  data() {
    return {
      search: "",
      headers: [
        { text: "النوع", value: "type" },
        { text: "التاريخ", value: "date" },
        { text: "رقم الوصل", value: "cheque_number" },
        { text: "اسم المؤسسة", value: "organization_name" },
        { text: "التفاصيل", value: "details" },
        { text: "المبلغ", value: "amount" },
        { text: "المستلم", value: "receiver_name" },
        { text: "الملاحظات", value: "notes" },
        { text: "عرض", value: "showdata" },
      ],
      perPage: [10, 50, 100, 200, 300, 600, 1200],
      selectedPage: 1,
    };
  },

  methods: {
    ...mapActions(["fetchFunds"]),

    showdata(files) {
      console.log("files");
      console.log(files);
      files.forEach((file) => {
        window.open(file);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

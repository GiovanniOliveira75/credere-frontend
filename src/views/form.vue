<template>
  <v-sheet class="pa-5 pa-md-16" rounded="lg">
    <h2 class="secondary--text">Formulário de Cliente</h2>

    <v-sheet class="my-5">
      <CustomerForm />

      <h2 class="secondary--text mt-16 mb-2">Listagem de Clientes</h2>
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="(customer, index) in getCustomer"
          :key="index"
        >
          <CustomerCard :customer="customer" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
import CustomerForm from "@/components/app/CustomerForm";
import CustomerCard from "@/components/app/CustomerCard";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormView",
  components: {
    CustomerForm,
    CustomerCard
  },
  mounted() {
    this.$nextTick(() => {
      this.show();
    });
  },
  computed: {
    ...mapGetters(["getCustomer"])
  },
  methods: {
    ...mapActions({
      show: "showCustomer"
    })
  }
};
</script>

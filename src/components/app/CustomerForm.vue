<template>
  <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
    <v-form
      ref="form"
      id="form-login"
      @submit.prevent=""
      @keypress.enter="passes(login)"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        mode="lazy"
        persist
        name="Nome"
      >
        <v-text-field
          v-model="customer.name"
          :error-messages="errors"
          label="Nome"
          placeholder="Seu Nome"
          filled
          required
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        rules="required|birthDateIsValid"
        mode="lazy"
        persist
        name="Data de Nascimento"
      >
        <v-text-field
          v-model="customer.birthday"
          :error-messages="errors"
          type="date"
          label="Data de Nascimento"
          min="1900-01-01"
          max="2200-01-01"
          filled
          required
        ></v-text-field>
      </ValidationProvider>

      <div v-if="customer.birthday && isOfAge(customer.birthday)">
        <b>Carteira de Motorista</b>
        <v-row>
          <v-col>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              mode="lazy"
              name="Número da CNH"
            >
              <v-text-field
                v-model="customer.driver_license.number"
                label="Número da CNH"
                :error-messages="errors"
                placeholder="Ex.: 999999999-99"
                v-mask="['##########-##']"
                filled
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              mode="lazy"
              name="Data de Expedição"
            >
              <v-text-field
                v-model="customer.driver_license.issued_at"
                type="date"
                label="Data de Expedição"
                :error-messages="errors"
                min="1900-01-01"
                max="2200-01-01"
                filled
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="3">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            mode="lazy"
            name="Estado"
          >
            <v-autocomplete
              v-model="customer.state"
              :loading="loading"
              :items="itemsStates"
              :search-input.sync="searchStates"
              :error-messages="errors"
              class="mb-8"
              cache-items
              hide-no-data
              hide-details
              label="Estado"
              placeholder="Escolha um Estado"
              filled
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="9">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            mode="lazy"
            persist
            name="Cidade"
          >
            <v-autocomplete
              v-model="customer.city"
              :loading="loading"
              :items="itemsCities"
              :search-input.sync="searchCities"
              :error-messages="errors"
              class="mb-8"
              hide-no-data
              hide-details
              label="Cidade"
              placeholder="Escolha uma Cidade"
              filled
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
      </v-row>

      <b class="mb-5">Telefones</b>
      <v-alert v-if="limitPhones >= 4" class="mt-3" type="warning">
        Você atingiu o limite de endereços de telefones.
      </v-alert>
      <v-row v-for="(phone, index) in customer.phones" :key="`phone-${index}`">
        <v-col cols="4">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            mode="lazy"
            name="DDD"
          >
            <v-text-field
              v-model="phone.code"
              type="tel"
              label="DDD"
              placeholder="Ex.: 099"
              :error-messages="errors"
              v-mask="['##', '###']"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col :cols="customer.phones.length > 1 ? '6' : '8'">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            mode="lazy"
            name="Telefone"
          >
            <v-text-field
              v-model="phone.number"
              type="tel"
              label="Telefone"
              placeholder="Ex.: 99999-9999"
              :error-messages="errors"
              :append-icon="index > 0 ? 'mdi-minus-circle' : 'mdi-plus-box'"
              @click:append="handlePhoneList(index)"
              v-mask="['#####-####', '####-####']"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col v-if="customer.phones.length > 1" cols="2">
          <v-checkbox
            v-model="customer.phones.main"
            label="Principal"
          ></v-checkbox>
        </v-col>
      </v-row>

      <div></div>

      <b class="mb-5">E-mails</b>
      <v-alert v-if="limitEmails >= 3" class="mt-3" type="warning">
        Você atingiu o limite de endereços de e-mails.
      </v-alert>
      <v-row v-for="(email, index) in customer.emails" :key="`email-${index}`">
        <v-col cols="12">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            mode="lazy"
            persist
            name="E-mail"
          >
            <v-text-field
              v-model="email.address"
              label="E-mail"
              :error-messages="errors"
              :append-icon="index > 0 ? 'mdi-minus-circle' : 'mdi-plus-box'"
              @click:append="handleEmailList(index)"
              filled
              required
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>

      <div v-if="customer.birthday && !isOfAge(customer.birthday)">
        <b>Responsável</b>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="customer.parent.name"
              :rules="[(v) => !!v || 'O campo Nome é obrigatório']"
              label="Nome"
              placeholder="Nome do responsável"
              filled
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" md="2">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              mode="lazy"
              name="DDD"
            >
              <v-text-field
                v-model="customer.parent.phone.code"
                type="tel"
                label="DDD"
                placeholder="Ex.: 099"
                :error-messages="errors"
                v-mask="['##', '###']"
                filled
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="8" md="4">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              mode="lazy"
              name="Telefone"
            >
              <v-text-field
                v-model="customer.parent.phone.number"
                type="tel"
                label="Telefone"
                placeholder="Ex.: 99999-9999"
                :error-messages="errors"
                v-mask="['#####-####', '####-####']"
                filled
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </div>

      <v-btn :disabled="invalid" color="success" class="mr-4" @click="submit">
        Salvar cliente
      </v-btn>
    </v-form>
  </ValidationObserver>
</template>

<script>
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
//import { format } from "date-fns";

export default {
  name: "CustomerForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    customer: {
      name: "",
      birthday: "",
      driver_license: {
        number: "",
        issued_at: "",
      },
      state: "",
      city: "",
      phones: [
        {
          code: "",
          number: "",
          main: true,
        },
      ],
      emails: [
        {
          address: "",
        },
      ],
      parent: {
        name: "",
        phone: {
          code: "",
          number: "",
        },
      },
    },

    loading: false,
    itemsStates: [],
    itemsCities: [],
    searchStates: null,
    searchCities: null,
    states: [],
    cities: [],
    limitPhones: 1,
    limitEmails: 1,
  }),

  mounted() {
    this.$nextTick(() => {
      this.getStates();
      this.show();
    });
  },

  watch: {
    searchStates(val) {
      val && val !== this.select && this.querySelectionStates(val);
    },
    searchCities(val) {
      val && val !== this.select && this.querySelectionCities(val);
    },
    "customer.state"(state) {
      if (!state) this.cities = [];
      else this.getCities(state);
    },
    getCustomer(value) {
      //const objKey = Object.keys(value)
      Array.from(value).forEach((customer) => {
        console.log(customer);
        if (customer.birthday) {
          this.customer.birthday = customer.birthday;
        }
      });
    },
  },

  computed: {
    ...mapGetters(["getCustomer"]),
  },

  methods: {
    ...mapActions({
      show: "showCustomer",
      update: "updateCustomer",
      create: "createCustomer",
    }),

    submit() {
      this.create(this.customer);
    },

    async getStates() {
      this.customer.state = "";
      this.states = [];
      this.cities = [];

      const { data } = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      if (data.length > 0) {
        data.sort((a, b) => {
          if (a.sigla > b.sigla) return 1;
          if (a.sigla < b.sigla) return -1;

          return 0;
        });

        this.states = data.map((state) => state.sigla);
      }
    },
    async getCities(stateId) {
      this.customer.city = "";
      this.cities = [];

      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
      );

      if (data.length > 0) {
        data.sort((a, b) => {
          if (a.sigla > b.sigla) return 1;
          if (a.sigla < b.sigla) return -1;

          return 0;
        });

        this.cities = data.map((city) => city.nome);
      }
    },
    querySelectionStates() {
      this.loading = true;
      setTimeout(() => {
        this.itemsStates = this.states;
        this.loading = false;
      }, 500);
    },
    querySelectionCities() {
      this.loading = true;
      setTimeout(() => {
        this.itemsCities = this.cities;
        this.loading = false;
      }, 500);
    },
    pushNewPhoneLine() {
      const totalLines = this.customer.phones.length;

      if (totalLines < 4) {
        this.customer.phones.push({
          code: "",
          number: "",
          main: false,
        });
      }

      this.limitPhones = totalLines + 1;
    },
    pushNewEmailLine() {
      const totalLines = this.customer.emails.length;

      if (totalLines < 3) {
        this.customer.emails.push({
          address: "",
        });
      }
      this.limitEmails = totalLines + 1;
    },
    removePhoneLine(index) {
      this.customer.phones.splice(index, 1);
      this.limitPhones--;
    },
    removeEmailLine(index) {
      this.customer.emails.splice(index, 1);
      this.limitEmails--;
    },
    handlePhoneList(index) {
      return index > 0 ? this.removePhoneLine(index) : this.pushNewPhoneLine();
    },
    handleEmailList(index) {
      return index > 0 ? this.removeEmailLine(index) : this.pushNewEmailLine();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  background-color: #fff;
  border: none;
  border-radius: 3px;
  color: #333;
  padding: 10px;
  background-color: #4dc498 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px rgba(0, 0, 0, 0.4);
  padding-bottom: 12px;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s, padding 0.1s, opacity 0.1s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 -3px rgba(0, 0, 0, 0.4);
  }

  &[disabled],
  &:active {
    box-shadow: none;
    padding-bottom: 10px;
    padding-top: 12px;
  }
}
</style>

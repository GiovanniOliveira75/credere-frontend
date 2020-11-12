<template>
  <v-card max-height="400">
    <v-sheet color="secondary">
      <v-row class="fill-height">
        <v-card-title class="white--text flex-column align-start px-6">
          <div class="text-h5">
            {{ customer.name }}
          </div>
          <div class="subtitle-2">
            {{ customer.birthday }}
          </div>
        </v-card-title>
        <v-btn class="btn-edit" small fab color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>

    <v-list two-line class="overflow-y-auto" max-height="300">
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo"> mdi-phone </v-icon>
        </v-list-item-icon>

        <div>
          <v-list-item-content
            v-for="(phone, index) in customer.phones"
            :key="index"
          >
            <v-list-item-title
              >({{ phone.code }}) {{ phone.number }}</v-list-item-title
            >
            <v-list-item-subtitle v-if="phone.main"
              >Principal</v-list-item-subtitle
            >
          </v-list-item-content>
        </div>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo"> mdi-email </v-icon>
        </v-list-item-icon>

        <div>
          <v-list-item-content
            v-for="(email, index) in customer.emails"
            :key="index"
          >
            <v-list-item-title>{{ email.address }}</v-list-item-title>
          </v-list-item-content>
        </div>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo"> mdi-map-marker </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            >{{ customer.city }}, {{ customer.state }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider
        v-if="customer.driver_license.number.length !== 0"
        inset
      ></v-divider>

      <v-list-item v-if="customer.driver_license.number.length !== 0">
        <v-list-item-icon>
          <v-icon color="indigo"> mdi-card-account-details </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            >{{ customer.driver_license.number }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            customer.driver_license.issued_at
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset v-if="customer.parent.name.length !== 0"></v-divider>

      <v-list-item v-if="customer.parent.name.length !== 0">
        <v-list-item-icon>
          <v-icon color="indigo"> mdi-account-child </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ customer.parent.name }} </v-list-item-title>
          <v-list-item-subtitle
            >({{ customer.parent.phone.code }})
            {{ customer.parent.phone.number }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    customer: Object
  }
};
</script>

<style lang="scss" scoped>
.btn-edit {
  position: absolute;
  top: -15px;
  right: -15px;
}
</style>

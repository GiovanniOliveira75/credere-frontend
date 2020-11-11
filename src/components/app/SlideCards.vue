<template>
  <v-carousel
    v-model="carouselControl"
    hide-delimiters
    :show-arrows="false"
    height="300px"
  >
    <v-carousel-item v-for="(card, i) in getSlide" :key="i" elevation="1">
      <v-card v-if="card.layoutType == 1">
        <v-img
          :src="card.image"
          class="white--text px-5 align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
        >
          <v-card-title
            class="text-h5 font-weight-bold text-uppercase"
            v-text="card.title"
          ></v-card-title>
          <v-card-subtitle
            class="white--text subtitle-1 mb-n8"
            v-text="card.subtitle"
          >
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              class="text-lowercase"
              :ripple="false"
              @click="carouselControl++"
            >
              Próximo
            </v-btn>
          </v-card-actions>
        </v-img>
      </v-card>

      <v-card v-if="card.layoutType == 2">
        <v-img
          :src="card.image"
          class="white--text px-5 align-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
        >
          <v-card-title
            class="text-h5 font-weight-bold text-uppercase justify-end"
            v-text="card.title"
          ></v-card-title>
          <v-card-subtitle
            class="white--text subtitle-1 text-end"
            v-text="card.subtitle"
          >
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              class="btn-2 text-lowercase"
              :ripple="false"
              @click="carouselControl++"
            >
              Próximo
            </v-btn>
          </v-card-actions>
        </v-img>
      </v-card>

      <v-card v-if="card.layoutType == 3" light>
        <v-img
          :src="card.image"
          class="white--text px-5 align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
        >
          <v-card-title
            class="text-h5 font-weight-bold text-uppercase"
            v-text="card.title"
          ></v-card-title>
          <v-card-subtitle
            class="white--text subtitle-1"
            v-text="card.subtitle"
          >
          </v-card-subtitle>
        </v-img>
        <div style="height: 150px">
          <v-card-text class="px-8" v-text="card.text"> </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              class="btn-2 text-lowercase"
              :ripple="false"
              @click="carouselControl++"
            >
              Próximo
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>

      <v-card v-if="card.layoutType == 4" class="d-flex" light>
        <v-img
          :src="card.image"
          height="300px"
          min-width="180px"
          max-width="180px"
        ></v-img>

        <div>
          <v-card-title
            class="text-h5 font-weight-bold text-uppercase"
            v-text="card.title"
          ></v-card-title>
          <v-card-subtitle class="gray--text subtitle-1" v-text="card.subtitle">
          </v-card-subtitle>

          <v-card-text class="text-break" v-text="card.text"> </v-card-text>

          <v-card-actions>
            <v-btn
              class="btn-2 text-lowercase"
              :ripple="false"
              @click="carouselControl++"
            >
              Próximo
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    carouselControl: 0
  }),
  mounted() {
    this.$nextTick(() => {
      this.show();
    });
  },
  computed: {
    ...mapGetters(["getSlide"])
  },
  methods: {
    ...mapActions({
      show: "showSlide"
    })
  }
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
  background-color: #f53202 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px rgba(0, 0, 0, 0.4);
  padding-bottom: 12px;
  color: #fff;
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

.btn-2 {
  position: absolute;
  right: 30px;
  bottom: 10px;
}

.v-window {
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
}
</style>

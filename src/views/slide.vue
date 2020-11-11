<template>
  <v-sheet class="pa-5 pa-md-16" rounded="lg">
    <h2>Banners de Novidades</h2>
    <v-row>
      <v-col cols="12" md="5">
        <v-sheet>
          <v-form>
            <v-select
              v-model="model.layoutType"
              :items="items"
              dense
              outlined
              label="Tipo do Layout"
            ></v-select>
            <v-row class="my-n2">
              <v-col>
                <v-text-field
                  v-model="model.title"
                  label="Título"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="model.subtitle"
                  label="Subtítulo"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="model.image"
              label="Imagem"
              hint="Cole aqui a URL da imagem"
              dense
              outlined
            ></v-text-field>
            <v-textarea
              v-if="handleLayoutType"
              v-model="model.text"
              dense
              outlined
              label="Texto"
              no-resize
              rows="3"
              row-height="25"
            ></v-textarea>
            <v-btn @click="submit" color="success">
              Criar Slide
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="7">
        <SlideCards />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import SlideCards from "@/components/app/SlideCards";
import { mapActions } from "vuex";

export default {
  components: {
    SlideCards
  },
  data: () => ({
    model: {
      title: "",
      subtitle: "",
      text: "",
      image: "",
      layoutType: 0
    },
    items: ["1", "2", "3", "4"]
  }),
  computed: {
    handleLayoutType() {
      if (this.model.layoutType == 3 || this.model.layoutType == 4) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      create: "createSlide"
    }),
    submit() {
      this.create(this.model);
    }
  }
};
</script>

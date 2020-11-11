import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  defaultAssets: {
    font: true,
    icons: "mdi"
  },
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#F53202",
        secondary: "#1387A8",
        accent: "#0FC2F5",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: "#F53202",
        secondary: "#1387A8",
        accent: "#0FC2F5",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFB44C"
      }
    }
  }
});

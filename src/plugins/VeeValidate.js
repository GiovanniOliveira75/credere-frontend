import Vue from "vue";
import {
  extend,
  configure,
  localize,
  ValidationObserver,
  ValidationProvider
} from "vee-validate";

import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/pt_BR.json";
import { isValid, differenceInYears, parse } from "date-fns";

for (const rule in rules) {
  extend(rule, rules[rule]);
}

localize({ en });

configure({
  classes: {
    valid: "is-valid",
    invalid: ["is-invalid"]
  }
});

extend("birthDateIsValid", {
  validate: value => {
    const compare = parse(value, "yyyy-MM-dd", new Date());
    return isValid(compare);
  },
  message: `Data inválida`
});

extend("isOfAge", {
  validate: value => {
    const today = new Date();
    const compare = parse(value, "yyyy-MM-dd", new Date());
    return differenceInYears(today, compare) >= 18;
  },
  message: `Você precisa ser maior de idade`
});

extend("phoneIsValid", {
  validate: value => String(value).match(/\d/g).length >= 10,
  message: `Telefone inválido`
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

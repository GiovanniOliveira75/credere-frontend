import Vue from "vue";
import { differenceInYears, parse } from "date-fns";

Vue.prototype.isOfAge = birthday => {
  const today = new Date();
  const compare = parse(birthday, "yyyy-MM-dd", new Date());
  return differenceInYears(today, compare) >= 18;
};

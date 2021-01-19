import moment from "moment";
import _ from "lodash";

const generateHours = (start = 8, end = 18, interval = 30, truncate = true) => {
  let hours = [];
  for (let hour = start; hour < end; hour++) {
    hours.push(moment({ hour }).format("h:mm A"));
    hours.push(
      moment({
        hour,
        minute: interval,
      }).format("h:mm A")
    );
  }
  if (truncate) {
    hours = _.initial(hours);
  }
  return hours;
};

export { generateHours };

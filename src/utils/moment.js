import moment from "moment";
export const formatDate = (dataString, dateFormat = "DD/MM/YYYY HH:mm") => {
  return moment(dataString).format(dateFormat);
};
export const addDays = (date, days, dateFormat = "DD/MM/YYYY") => {
  return moment(date, dateFormat).add(1, "days").toDate();
};

import httpRequestHelper from "@/utils/httpRequestHelper";

const URL = "http://api.openweathermap.org/data/2.5/forecast";
const APPID = "75fc1b581125740042aa7af1975fb2db";

export default {
  getInstantForecast
};

function getInstantForecast(q, lang = "fr", units = "metric") {
  const requestOptions = {
    url: URL,
    params: {
      q: q,
      lang: lang,
      units: units,
      appid: APPID
    }
  };
  return httpRequestHelper.get(requestOptions);
}

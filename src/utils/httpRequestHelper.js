import axios from "axios";

/**
 * Surcouche pour l'appel axios
 **/
export default {
  get,
  post,
  put
  // getQueryVariable
};

const config = {};

/**
 * https://flaviocopes.com/how-to-merge-objects-javascript/
 * */
function get(opts) {
  // On merge la conf de base avec les options en paramètre
  const options = { ...config, method: "GET", ...opts };
  return axios(options);
}

function post(opts) {
  // On merge la conf de base avec les options en paramètre
  const options = { ...config, method: "POST", ...opts };
  return axios(options);
}

function put(opts) {
  // On merge la conf de base avec les options en paramètre
  const options = { ...config, method: "PUT", ...opts };
  return axios(options);
}

// function getQueryVariable (variable) {
//     let query = window.location.hash.substring(3)
//     let vars = query.split('&')
//     for (let i = 0; i < vars.length; i++) {
//         let pair = vars[i].split('=')
//         if (pair[0] === variable) {
//             return pair[1]
//         }
//     }
//     return false
// }

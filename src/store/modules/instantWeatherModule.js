export default {
  state: {
    cities: ["cergy", "paris", "lyon", "marseille", "bordeaux", "lille"]
  },
  getters: {
    getCities: state => state.cities
  },
  mutations: {
    deleteCity(state, index) {
      state.cities.splice(index, 1);
    },
    addCity(state, city) {
      state.cities.push(city);
    }
  },
  actions: {
    //FETCH_USER_DATA: ({ commit, state }) => {}
  }
};

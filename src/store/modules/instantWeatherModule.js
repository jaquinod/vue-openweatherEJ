export default {
  state: {
    cities: new Map()
  },
  getters: {
    getCities: state => state.cities
  },
  mutations: {
    setCities(state, cities) {
      state.cities = cities;
    }
  },
  actions: {
    //FETCH_USER_DATA: ({ commit, state }) => {}
  }
};
